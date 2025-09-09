"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { FC, use, useState } from "react";
import { LucideEye, LucideEyeOff, LucideLoader } from "lucide-react";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import axios, { all } from "axios";
import { useRouter } from "next/navigation";
import InstituteVerificationOtpEmailTemplate from "@/components/emails/newUserVerification";
import { SendNewInstituteVerificationEmail } from "@/models/SendingEmails";
import { Label } from "@/components/ui/label";
import OTP_Component from "@/components/custom/opt-input";
// import { InputOTPForm } from "@/components/custom/opt-input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  Email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email({
      message: "Invalid email address.",
    })
    .regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"), {
      message: "Invalid email format.",
    })
    .lowercase({
      message: "Email must be in lowercase.",
    }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  institute_name: z.string().min(2, {
    message: "Institute name must be at least 2 characters.",
  }),
});
const myPromise = new Promise<{ name: string }>((resolve) => {
  // setTimeout(() => {
  resolve({ name: "My toast" });
  // }, 5000);
});
// PromiseRejectionEvent(myPromise)

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [OTP_Code, setOTP_Code] = React.useState("");
  const [OTP_Expiry, setOTP_Expiry] = React.useState(
    "2025-09-09T06:02:09.783Z"
  );
  const [allInputDisabled, setAllInputDisabled] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [checkingEmail, setCheckingEmail] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const route = useRouter();
  // =====================================================
  const debounced = useDebounceCallback(setValue, 700);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      Email: "",
      password: "",
      institute_name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setAllInputDisabled(true);
    const myPromise = new Promise<void>((resolve) => {
      // Create institute account using backend AP  I
      try {
        axios
          .post(
            "/api/create-institute-account",
            {
              email: values.Email,
              username: values.name,
              password: values.password,
              institute_name: values.institute_name,
            },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(async (response) => {
            // Handle success
            const user = response.data.user;
            console.log(user);
            if (response.data.success) {
              setUserId(user?._id);
              await SendNewInstituteVerificationEmail({
                email: user.email,
              })
                .then(() => {
                  setAllInputDisabled(true);
                  setOTP_Code(user.verifyCode.toString());
                  setOTP_Expiry(user.verifyExpiry);
                  console.log(OTP_Code);
                  // TODO::
                  // if (OTP_Code) {
                  setOpen(true);
                  // } else {
                  //   toast.error("Somthing wrong please try again!");
                  // }
                })
                .catch((error) => {
                  console.log(error);
                });
              console.log(user);
              console.log(user.verifyCode);
            } else {
              toast.warning("Somthing wrong please try again", {
                duration: 2000,
                dismissible: true,
                action: {
                  label: "Retry",
                  onClick: () => {
                    setAllInputDisabled(false);
                    form.reset();
                  },
                },
              });
            }

            // sending verification email
            try {
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            // Handle error
            toast.error(error.response?.data?.message || "An error occurred", {
              description: "Login to your account",
              action: (
                <Button
                  variant="destructive"
                  className=" px-2 text-xs ml-auto"
                  onClick={() => route.push("/institute-login")}
                >
                  Login
                </Button>
              ),
              duration: 2000,
              dismissible: true,
            });
          })
          .finally(() => {
            setAllInputDisabled(false);
            resolve();
          });
        // Handel Error Part
      } catch (error) {
        console.log(error);
      }
    });
    toast.promise(myPromise, {
      loading: "Loading....",
      success: (data) => {
        return `Account has been create please verify`;
      },
      error: "Error",
    });
  }

  // =====================================================
  React.useEffect(() => {
    if (form.getValues("Email") !== "") {
      if (value.length > 0) {
        setCheckingEmail(true);
      }
      form
        .trigger("Email")
        .then(async (isValid) => {
          if (isValid) {
            setCheckingEmail(true);
            const checkEmail = await axios.get(
              "/api/auth/check-register-email",
              {
                params: { email: value },
              }
            );
            // console.log(checkEmail.data);
            if (checkEmail.data.registered) {
              form.setError("Email", {
                type: "manual",
                message: "Email already registered",
              });
              setSubmitDisabled(true);
              return;
            }
            setSubmitDisabled(false);
          }
        })
        .finally(() => {
          setCheckingEmail(false);
        });
    }
  }, [value]);
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="w-[400px] h-[50%] overflow-hidden">
        <Card className="">
          <CardHeader className="text-center ">
            <CardTitle>Create Institute Account</CardTitle>
            <CardDescription className="text-xs">
              Create an account for your institute
            </CardDescription>
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 "
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          placeholder="Enter Owner Name"
                          {...field}
                          disabled={allInputDisabled}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter Institute owner name
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* =============================Email Input========================== */}
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          type="text"
                          placeholder="you@example.com"
                          disabled={allInputDisabled}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            debounced(e.target.value);
                          }}
                          // value={value}
                        />
                      </FormControl>
                      {checkingEmail && (
                        <LucideLoader
                          size={18}
                          className="animate-spin absolute right-3 top-3/5 transform -translate-y-1/5"
                        />
                      )}
                      {/* <FormDescription>
                        Enter Institute owner email
                      </FormDescription> */}
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* =============================Institute Name Input========================== */}
                <FormField
                  control={form.control}
                  name="institute_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Name</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          placeholder="Institute Name"
                          {...field}
                          disabled={allInputDisabled}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        Enter the name of your institute
                      </FormDescription> */}
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* =============================password Input========================== */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          disabled={allInputDisabled}
                        />
                      </FormControl>
                      {!showPassword ? (
                        <LucideEyeOff
                          className="absolute right-3 top-2/5 transform -translate-y-1/5 cursor-pointer"
                          size={17}
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        />
                      ) : (
                        <LucideEye
                          className="absolute right-3 top-2/5 transform -translate-y-1/5 cursor-pointer"
                          size={17}
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        />
                      )}

                      <FormDescription>
                        {" "}
                        <Link
                          href="/forgot-password"
                          className="text-muted-foreground w-full text-xs hover:underline"
                        >
                          Forgot Password?
                        </Link>{" "}
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full p-5 cursor-pointer"
                  disabled={submitDisabled || checkingEmail || allInputDisabled}
                >
                  Submit
                </Button>
                <Link href="/institute-login">
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={allInputDisabled}
                  >
                    Institute Login
                  </Button>
                </Link>
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="grid gap-3">
            <div></div>
          </CardFooter> */}
        </Card>
      </div>
      <OTP_Component
        open={open}
        setOpen={setOpen}
        userId={userId}
        userEmail={userEmail}
      />
    </div>
  );
}
/*
TODO::::
1. add disabled state to all inputs when form is being submitted
2. const myPromise = new Promise<{ name: string }>((resolve) => {
    setTimeout(() => {
      resolve({ name: "My toast" });
    }, 3000);
  });
  toast.promise(myPromise, {
    loading: "Loading...",
    success: (data: { name: string }) => {
      return `${data.name} toast has been added`;
    },
    error: "Error",
  });
*/

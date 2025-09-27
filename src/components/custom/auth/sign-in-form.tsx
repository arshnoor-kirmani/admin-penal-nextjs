"use client";
import {
  Card,
  CardContent,
  CardDescription,
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
import React, { useEffect, useState } from "react";
import { LucideEye, LucideEyeOff, LucideLoader } from "lucide-react";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
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
});
// PromiseRejectionEvent(myPromise)

export default function SignInForm({
  SignInType,
}: {
  SignInType: "institute-login" | "student-login" | "teacher-login";
}) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const route = useRouter();
  // =====================================================
  const debounced = useDebounceCallback(setValue, 700);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFormDisabled(true);
    // SignIntype ===== Next Auth credetials id
    const result = await signIn(SignInType, {
      redirect: false,
      email: values.Email,
      password: values.password,
    })
      .then((res) => {
        console.log("res", res);
        if (res?.error === "Invalid password.") {
          toast.error("Incorrect password. Please try again.");
          form.setError("password", {
            type: "manual",
            message: "Incorrect password. Please try again.",
          });
        } else {
          toast.success("Login Sucessfully !");
          route.push("/admin/dashboard");
        }
      })
      .finally(() => setFormDisabled(false));
    console.log(result);
  }

  // =====================================================
  useEffect(() => {
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
            console.log(checkEmail.data);
            if (checkEmail.data.registered === false) {
              form.setError("Email", {
                type: "manual",
                message: `Email is registered but not verified`,
              });
            } else if (checkEmail.data.registered === undefined) {
              form.setError("Email", {
                type: "manual",
                message: "No account found with this email address",
              });
            }
            setSubmitDisabled(false);
            return;
          }
        })
        .finally(() => {
          setCheckingEmail(false);
        });
    }
  }, [value]);
  // =====================================================
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="w-[400px] h-[50%] overflow-hidden">
        <Card className="">
          <CardHeader className="text-center ">
            <CardTitle>
              Login{" "}
              {SignInType === "institute-login"
                ? "Institute Account"
                : SignInType === "student-login"
                ? "Student Account"
                : ""}
            </CardTitle>
            <CardDescription className="text-xs">
              Sign in to your{" "}
              {SignInType === "institute-login"
                ? "Institute Account"
                : SignInType === "student-login"
                ? "Student Account"
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 "
              >
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
                          disabled={formDisabled}
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
                          disabled={formDisabled}
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
                          href="institute-forgot-password"
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
                  disabled={submitDisabled || checkingEmail || formDisabled}
                >
                  Submit
                </Button>
                {SignInType === "institute-login" ? (
                  <Link href="create-institute-account">
                    <Button
                      variant="secondary"
                      type="button"
                      className="w-full cursor-pointer"
                      disabled={formDisabled}
                    >
                      Create new Institute Account
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="grid gap-3">
            <div></div>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

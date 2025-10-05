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
  institute_code: z
    .string({ message: "Institute Code is required." })
    .min(2, {
      message: "Institute Code must be at least 2 characters.",
    })
    .optional(),
  teacher_id: z.string().min(8, {
    message: "Student ID must be at least 8 characters.",
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
  const [GetInstituteName, setGetInstituteName] = useState("");
  const [GetInstituteId, setGetInstituteId] = useState("");
  const [institute_code, setInstituteId] = useState("");
  const [checkingTeacherId, setCheckingTeacherId] = useState(false);
  const [checkingInstituteCode, setCheckingInstituteCode] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const route = useRouter();
  // =====================================================
  const debouncedTeacherId = useDebounceCallback(setValue, 700);
  const debouncedInstituteCode = useDebounceCallback(setInstituteId, 700);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institute_code: "",
      teacher_id: "",
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
      teacher_id: values.teacher_id,
      password: values.password,
      institute_id: GetInstituteId,
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
          route.push("/teacher/dashboard");
        }
      })
      .finally(() => setFormDisabled(false));
    console.log(result);
  }

  // =====================================================
  useEffect(() => {
    if (form.getValues("teacher_id") !== "") {
      if (value.length > 0) {
        setCheckingTeacherId(true);
      }
      form
        .trigger("teacher_id")
        .then(async (isValid) => {
          if (isValid) {
            setCheckingTeacherId(true);
            const checkStudentId = await axios
              .get("/api/auth/check-register-email/teacher", {
                params: {
                  teacher_id: value,
                  institute_id: GetInstituteId,
                },
              })
              .catch((error) => {
                if (error.response) {
                  form.setError("teacher_id", {
                    type: "manual",
                    message:
                      "Teacher ID and Institute Code is not correct. Please try again.",
                  });
                }
              });
            console.log(checkStudentId?.data);
            if (!checkStudentId?.data.registered) {
              form.setError("teacher_id", {
                type: "manual",
                message: checkStudentId?.data.message,
              });
            }
            setSubmitDisabled(false);
            return;
          }
        })
        .finally(() => {
          setCheckingTeacherId(false);
        });
    }
  }, [value, GetInstituteId, form]);
  useEffect(() => {
    if (form.getValues("institute_code") !== "") {
      if (institute_code.length > 0) {
        setCheckingInstituteCode(true);
      }
      form
        .trigger("institute_code")
        .then(async (isValid) => {
          if (isValid) {
            setCheckingInstituteCode(true);
            const checkInstituteCode = await axios.post(
              "/api/auth/get-institute-info",
              {
                identifier: institute_code,
              }
            );
            if (checkInstituteCode.data.success === false) {
              form.setError("institute_code", {
                type: "manual",
                message: "No Institute found with this Institute Code",
              });
            } else {
              setGetInstituteName(checkInstituteCode.data?.user.institute_name);
              setGetInstituteId(checkInstituteCode.data?.user._id);
            }
            setSubmitDisabled(false);
            return;
          }
        })
        .finally(() => {
          setCheckingInstituteCode(false);
        });
    }
  }, [institute_code, form]);
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
                : SignInType === "teacher-login"
                ? "Teacher Account"
                : ""}
            </CardTitle>
            <CardDescription className="text-xs">
              Sign in to your{" "}
              {SignInType === "institute-login"
                ? "Institute Account"
                : SignInType === "student-login"
                ? "Student Account"
                : SignInType === "teacher-login"
                ? "Teacher Account"
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 "
              >
                {/* =============================Institute Code Input========================== */}
                <FormField
                  control={form.control}
                  name="institute_code"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Institute Code</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          type="text"
                          placeholder="ABC0000"
                          disabled={formDisabled}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            debouncedInstituteCode(e.target.value);
                            setGetInstituteName("");
                          }}
                          // value={value}
                        />
                      </FormControl>
                      {checkingInstituteCode && (
                        <LucideLoader
                          size={18}
                          className="animate-spin absolute right-3 top-3/6 transform -translate-y-1/5"
                        />
                      )}
                      <FormDescription className="text-xs text-muted-foreground">
                        {!!GetInstituteName && (
                          <span>
                            Institute Name:{" "}
                            <span className="font-semibold text-primary">
                              {GetInstituteName}
                            </span>
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* =============================Email Input========================== */}
                <FormField
                  control={form.control}
                  name="teacher_id"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Teacher ID</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-xs"
                          type="text"
                          placeholder="XXXXXXXX"
                          disabled={
                            formDisabled ? true : GetInstituteId ? false : true
                          }
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            debouncedTeacherId(e.target.value);
                          }}
                          // value={value}
                        />
                      </FormControl>
                      {checkingTeacherId && (
                        <LucideLoader
                          size={18}
                          className="animate-spin absolute right-3 top-3/5 transform -translate-y-1/5"
                        />
                      )}

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
                          className="absolute right-3 top-3/5 transform -translate-y-1/5 cursor-pointer"
                          size={17}
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        />
                      ) : (
                        <LucideEye
                          className="absolute right-3 top-3/5 transform -translate-y-1/5 cursor-pointer"
                          size={17}
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        />
                      )}

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full p-5 cursor-pointer"
                  disabled={submitDisabled || checkingTeacherId || formDisabled}
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

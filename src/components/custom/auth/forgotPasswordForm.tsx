"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetInstiutePassword } from "@/models/Email/SendingEmails";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Database, LucideLoader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import z, { email } from "zod";
import OTP_Component from "../opt-input";
import ChangePasswordForm from "./changepassword";
import { toast } from "sonner";

export default function forgotPage({
  forgetUserType,
}: {
  forgetUserType: "institutes" | "student";
}) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [value, setValue] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const route = useRouter();
  // =====================================================
  const debounced = useDebounceCallback(setValue, 700);
  // ====================================
  const forgetSchema = z.object({
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
  });
  // ==================================================
  const form = useForm<z.infer<typeof forgetSchema>>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      Email: "",
    },
  });
  // ==================================================
  async function onSubmit(value: z.infer<typeof forgetSchema>) {
    console.log(value);
    setFormDisabled(true);
    setUserEmail(value.Email);
    const Promis = new Promise(async (resolve, reject) => {
      const result = await axios
        .post("/api/auth/forgot-password", {
          email: value.Email,
          Database_name: forgetUserType,
        })
        .then(async (e) => {
          const res = await forgetInstiutePassword({ email: value.Email }).then(
            (res) => {
              setUserId(res.userId);
              setOpen(true);
            }
          );
          console.log(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          setFormDisabled(false);
          resolve(true);
        });
    });
    toast.promise(Promis, {
      loading: "Sending OTP to email...",
      success: "OTP sent to email",
      error: (error) => error.error,
    });
  }
  // =================================================

  useEffect(() => {
    if (form.getValues("Email") !== "") {
      if (value.length > 0) {
        setCheckingEmail(true);
      }
      const Promis = new Promise((resolve, reject) => {
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
                reject({ error: "Email is registered but not verified" });
                form.setError("Email", {
                  type: "manual",
                  message: `Email is registered but not verified`,
                });
              } else if (checkEmail.data.registered === undefined) {
                reject({ error: "No account found with this email address" });
                form.setError("Email", {
                  type: "manual",
                  message: "No account found with this email address",
                });
              }
              setSubmitDisabled(false);
              resolve(true);
              return;
            }
          })
          .finally(() => {
            setCheckingEmail(false);
            resolve(true);
          })
          .catch((error) => {
            setCheckingEmail(false);
            reject(error);
          });
      });
      toast.promise(Promis, {
        loading: "Checking email...",
        success: "Email found",
        error: (error) => error.error,
      });
    }
  }, [value]);
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="w-[400px] h-[50%] overflow-hidden">
        <Card className="">
          <CardHeader className="text-center ">
            <CardTitle>
              forget{" "}
              {forgetUserType === "institutes"
                ? "Institute Account"
                : forgetUserType === "student"
                ? "Student Account"
                : ""}{" "}
              password
            </CardTitle>
            <CardDescription className="text-xs">
              Change your{" "}
              {forgetUserType === "institutes"
                ? "Institute Account"
                : forgetUserType === "student"
                ? "Student Account"
                : ""}{" "}
              Password
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
                          disabled={formDisabled || inputDisabled}
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

                <Button
                  type="submit"
                  className="w-full p-5 cursor-pointer"
                  disabled={submitDisabled || checkingEmail || formDisabled}
                >
                  Find Account
                </Button>
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="grid gap-3">
            <div></div>
          </CardFooter> */}
        </Card>
      </div>
      <OTP_Component
        VerificationType="forget-password"
        open={open}
        setOpen={setOpen}
        userId={userId}
        userEmail={userEmail}
        setSuccess={setVerifySuccess}
        redirectTo={false}
      />
      <ChangePasswordForm
        identifier={userEmail}
        userType={forgetUserType}
        open={verifySuccess}
        setOpen={setVerifySuccess}
      />
    </div>
  );
}

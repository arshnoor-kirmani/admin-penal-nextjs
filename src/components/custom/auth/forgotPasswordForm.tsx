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
import React from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import z, { email } from "zod";
import OTP_Component from "../opt-input";

export default function forgotPage({
  forgetUserType,
  setVerifySuccess,
}: {
  forgetUserType: "institute" | "student";
  setVerifySuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formDisabled, setFormDisabled] = React.useState(false);
  // const [verifySuccess, setVerifySuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userEmail, setUserEmail] = React.useState<string>("");

  const [value, setValue] = React.useState("");
  const [checkingEmail, setCheckingEmail] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
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
    setUserEmail(value.Email);
    const result = await axios
      .post("/api/auth/forgot-password", {
        email: value.Email,
        Database_name: "institutes",
      })
      .then(async (e) => {
        const res = await forgetInstiutePassword({ email: value.Email }).then(
          (res) => {
            setUserId(res.userId);
            setOpen(true);
          }
        );
        console.log(res);
      });
    console.log(result);
  }
  // =================================================

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
            console.log(checkEmail.data);
            if (checkEmail.data.registered === false) {
              form.setError("Email", {
                type: "manual",
                message: `Email is registered but not verified                   `,
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
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="w-[400px] h-[50%] overflow-hidden">
        <Card className="">
          <CardHeader className="text-center ">
            <CardTitle>
              forget{" "}
              {forgetUserType === "institute"
                ? "Institute Account"
                : forgetUserType === "student"
                ? "Student Account"
                : ""}{" "}
              password
            </CardTitle>
            <CardDescription className="text-xs">
              Change your{" "}
              {forgetUserType === "institute"
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
      />
    </div>
  );
}

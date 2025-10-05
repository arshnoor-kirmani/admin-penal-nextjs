"use client";

import { useEffect, useState } from "react";
import { CircleAlertIcon, SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm({
  identifier,
  userType,
  open,
  setOpen,
}: {
  identifier: string;
  userType: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const formSchema = z.object({
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    confirm_password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirmPassword] = useState("");
  // =================================================
  async function onSubmit(value: z.infer<typeof formSchema>) {
    console.log("identifier", identifier);
    console.log("userType", userType);
    console.log("passwod chenaged", value);
    const Promis = new Promise(async (resolve, reject) => {
      await axios
        .post("/api/auth/reset-password", {
          identifier: identifier,
          userType: userType,
          password: value.password,
        })
        .catch((error) => {
          reject({ error: error.message });
        })
        .then((res) => {
          resolve(res?.data?.message || "Password changed successfully");
          setOpen(false);
          router.push("institute-login");
        })
        .finally(() => {
          resolve(true);
        });
    });
    toast.promise(Promis, {
      loading: "Changing password...",
      success: "Password changed successfully",
      error: (error) => error.error || "Internal server error",
    });
  }
  useEffect(() => {
    if (!confirm_password) return;
    form.trigger("confirm_password").then((e) =>
      e
        ? confirm_password !== password
          ? form.setError("confirm_password", {
              type: "manual",
              message: "confirm password did not match..",
            })
          : ""
        : form.clearErrors("confirm_password")
    );
  }, [confirm_password, password, form]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Change Password
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the new
              password.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* <div className="*:not-first:mt-2"> */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="capitalize">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="placeholder:text-xs"
                      type="text"
                      placeholder="Enter password"
                      // value={inputValue}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setPassword(e.target.value);
                      }}
                    />
                  </FormControl>

                  {/* <FormDescription>
                        Enter Institute owner email
                      </FormDescription> */}
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="capitalize">confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="placeholder:text-xs"
                      type="text"
                      placeholder="Enter confirm password"
                      // value={inputValue}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setconfirmPassword(e.target.value);
                      }}
                    />
                  </FormControl>

                  {/* <FormDescription>
                        Enter Institute owner email
                      </FormDescription> */}
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            {/* </div> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={!password ? true : password !== confirm_password}
              >
                <SaveIcon /> Save Password
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { userSchema, UserFormValues } from "@/lib/validations/user";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  avatar: z.string().optional(), // we’ll store the uploaded file URL here
});

export type UserFormValues = z.infer<typeof userSchema>;

export default function UserForm() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  //   async function handleFileUpload(file: File) {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();

  //     form.setValue("avatar", data.url); // ✅ save uploaded file URL in form
  //     setPreviewUrl(data.url);
  //   }

  async function onSubmit(values: UserFormValues) {
    console.log("Final Form Values:", values);
    // here you save values to your DB (MongoDB, Prisma, etc.)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar Upload */}
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer border p-2 rounded-lg">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        // if (file) handleFileUpload(file);
                      }}
                    />
                    Upload
                  </label>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={48}
                      height={48}
                      className="rounded-full border"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

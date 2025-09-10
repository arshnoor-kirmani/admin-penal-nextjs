"use client";

import { useEffect, useRef, useState } from "react";
import { OTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Institute } from "@/models/InstituteSchema";
import { SendNewInstituteVerificationEmail } from "@/models/SendingEmails";
import axios from "axios";

// const CORRECT_CODE = "6548";

export default function OTP_Component({
  open,
  setOpen,
  userId,
  userEmail,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  userEmail: string | undefined;
}) {
  const [value, setValue] = useState("");
  const [user_id, setUserId] = useState(userId || "");
  const [user_email, setuserEmail] = useState(userEmail || "");
  const [resendDisabled, setResendDisabled] = useState<undefined | boolean>(
    undefined
  );
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inCorrectMsg, setInCorrectMsg] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
  }, [hasGuessed]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();
    inputRef.current?.select();
    await new Promise((r) => setTimeout(r, 1_00));
    console.log("Input OTP", e);
    setInputDisabled(true);
    try {
      const res = await axios
        .post("/api/verify-otp", {
          otp: e,
          userId,
          verifyType: "institute",
        })
        .then((res) => {
          console.log("Input OTP", res);
          if (res.data.success) {
            setHasGuessed(true);
          } else {
            console.log("Input OTP", res.data.message);
            setHasGuessed(false);
            if (!res.data.success && res.data.message === "Invalid OTP") {
              setInCorrectMsg("Invalid OTP. Please try again.");
            } else if (
              !res.data.success &&
              res.data.message === "OTP has expired"
            ) {
              setInCorrectMsg("OTP has expired. Please request a new code.");
            }
          }
        })
        .finally(() => {
          setInputDisabled(false);
        });
    } catch (error) {
      console.error("Input OTP", error);
    }
    setTimeout(() => {
      inputRef.current?.blur();
    }, 20);
  }
  async function ResendEmail({
    user_Email,
    user_Id,
  }: {
    user_Email: string;
    user_Id: string;
  }) {
    setResendDisabled(true);
    console.log("ResendEmail");
    console.log("Resend Email -UserId", userId, userEmail);
    if (!userId || !userEmail) return;
    console.log("ResendEmail", userEmail, userId);

    const res = await SendNewInstituteVerificationEmail({ email: userEmail });
    if (!res.data.success) setResendDisabled(false);

    console.log(res);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center ">
              {hasGuessed ? "Code verified!" : "Enter Verification  code"}
            </DialogTitle>
            <DialogDescription
              className={cn("sm:text-center text-xs ", {
                "text-green-400": hasGuessed,
              })}
            >
              {hasGuessed
                ? "Your email has been successfully verified."
                : `Check your email and enter the OTP code we sent to you.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className="text-center">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-chart-2/80 cursor-pointer hover:bg-chart-2/60"
                variant="secondary"
                ref={closeButtonRef}
              >
                Close
              </Button>
            </DialogClose>
            {/* <Button type="button" onClick={() => setHasGuessed(undefined)}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <OTPInput
                id="cofirmation-code"
                ref={inputRef}
                value={value}
                onChange={setValue}
                disabled={inputDisabled}
                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                maxLength={6}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot
                        key={idx}
                        {...slot}
                        correct={hasGuessed === undefined ? false : !hasGuessed}
                      />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
            </div>
            {hasGuessed === false && (
              <p
                className=" text-center text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {inCorrectMsg}
              </p>
            )}
            <p className="text-center text-sm">
              <Button
                variant={"link"}
                disabled={resendDisabled}
                className="cursor-pointer"
                onClick={() =>
                  ResendEmail({ user_Email: user_email, user_Id: user_id })
                }
              >
                Resend OTP
              </Button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        `border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]`,
        {
          "border-destructive ring-destructive/50 z-10 ring-[3px]":
            props.correct,
        },
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">Institute Mangement System </h1>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/auth/institute-login">
            <Button variant="default">Institute Login</Button>
          </Link>
          <Link href="/auth/create-institute-account">
            <Button variant="default">Create Institute </Button>
          </Link>
          <Link href="/auth/student-login">
            <Button variant="default">Student Login</Button>
          </Link>
          <Link href="/auth/teacher-login">
            <Button variant="default">Teacher Login</Button>
          </Link>
          <Link href="/auth/user-login">
            <Button variant="default">User Login</Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}

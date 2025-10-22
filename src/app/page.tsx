import Header from "@/components/custom/Header";
import Link from "next/link";
import Section from "@/components/custom/Section";
export default function Home() {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      {/* <div> */}
      <Header />
      {/* </div> */}
      <main>
        <Section />
      </main>
      <footer className="text-sm border-t w-full h-20 p-4 flex flex-col md:flex-row gap-2 justify-between items-center text-muted-foreground">
        <div>
          {" "}
          © 2023{" "}
          <Link href="/" className="hover:underline">
            EduNexus
          </Link>
          . All rights reserved.
        </div>
        <div className="space-x-4 mr-3">
          <Link className="hover:underline" href="#">
            Support
          </Link>
          <Link className="hover:underline" href="#">
            Privacy
          </Link>
          <Link className="hover:underline" href="#">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}

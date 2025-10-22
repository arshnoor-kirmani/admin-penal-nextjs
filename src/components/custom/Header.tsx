import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Docs" },
  { href: "#", label: "Features" },
  // { href: "#", label: "Pricing" },
  { href: "#", label: "Contact" },
];

export default function Component() {
  return (
    <header className="backdrop-blur-sm sticky top-0 z-40 border-b border-2 ">
      <div className="max-w-7xl mx-auto px-2 md:px-6 flex  h-16 items-center ">
        {/* Left side */}
        <div className=" float-left">
          <LogoLink />
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4 w-fit ml-auto">
          {/* Desktop nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-4">
              {navigationLinks.map((link, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink
                    href={link.href}
                    className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA - hidden on very small screens since it's in mobile popover */}

          {/* Theme toggle always visible */}
          <ThemeToggle variant="ghost" />
          <Button className="inline-flex text-sm">Get Started</Button>
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label="Open menu"
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20"
                    className="origin-center -translate-y-[6px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[6px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-56 p-2 m-2 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, i) => (
                    <NavigationMenuItem key={i} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-2 w-full"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
export function LogoLink() {
  return (
    <Link href="/" className="flex items-center md:gap-3">
      {/* Logo */}
      <Avatar className="w-10 h-10 bg-foreground dark:bg-transparent p-2 rounded">
        <AvatarImage
          src="./logo.svg"
          className="w-full h-full object-contain"
        />
        <AvatarFallback className="text-sm">EN</AvatarFallback>
      </Avatar>
      {/* Brand */}
      <h1 className="font-semibold text-primary text-base leading-none hidden md:inline-block">
        EduNexus
      </h1>
    </Link>
  );
}

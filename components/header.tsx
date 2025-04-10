"use client";

import { useState, useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { siteConfig, paths } from "@/lib/constants";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/80 backdrop-blur-lg backdrop-saturate-150"
          : "border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href={paths.home} className="flex items-center gap-3 group">
            <div
              className={`relative h-9 w-9 overflow-hidden rounded-md bg-gradient-to-br from-${siteConfig.colors.gradient.from} via-${siteConfig.colors.gradient.via} to-${siteConfig.colors.gradient.to} flex items-center justify-center shadow-[0_0_15px_${siteConfig.colors.shadow}]`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <defs>
                  <linearGradient
                    id="bgGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#9333ea" /> {/* purple-600 */}
                    <stop offset="100%" stopColor="#d946ef" />{" "}
                    {/* fuchsia-500 */}
                  </linearGradient>
                </defs>

                {/* Circular background */}
                <circle cx="12" cy="12" r="12" fill="url(#bgGradient)" />

                {/* Icon in white */}
                <path
                  d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                  fill="white"
                  transform="scale(0.7) translate(5, 5)"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-tight flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-fuchsia-500 to-fuchsia-400 [text-shadow:0_2px_12px_rgba(147,51,234,0.15)] font-extrabold transition-all duration-300 group-hover:[text-shadow:0_2px_16px_rgba(147,51,234,0.3)]">
                  {siteConfig.logo.text.main}
                </span>
                <span className="ml-[0.2em] text-foreground font-medium">
                  {siteConfig.logo.text.accent}
                </span>
              </span>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 -mt-1">
                {siteConfig.logo.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.mainNav.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {!item.children ? (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                          {item.children.map((child, childIndex) =>
                            child.featured ? (
                              <li key={childIndex} className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <a
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-600/20 to-cyan-500/20 p-6 no-underline outline-none focus:shadow-md hover:bg-blue-600/10"
                                    href={child.href}
                                  >
                                    <div className="mb-2 text-lg font-medium">
                                      {child.title}
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      {child.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ) : (
                              <li key={childIndex}>
                                <NavigationMenuLink asChild>
                                  <a
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href={child.href}
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {child.title}
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {child.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            )
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth & Theme */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className={`bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to} hover:opacity-90 text-white border-0`}
                >
                  Start Creating
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href={paths.managePlan} passHref>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to} hover:opacity-90 text-white border-0`}
                >
                  Manage Plan
                </Button>
              </Link>
              <UserButton afterSignOutUrl={paths.home} />
            </div>
          </SignedIn>

          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 bg-gradient-to-br from-${siteConfig.colors.gradient.from} via-${siteConfig.colors.gradient.via} to-${siteConfig.colors.gradient.to} rounded-md flex items-center justify-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-4 h-4"
                      >
                        <path d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                      </svg>
                    </div>
                    <span className="font-bold">{siteConfig.name}</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col mt-6">
                {siteConfig.mobileNav.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex w-full items-center rounded-md py-2.5 px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-gray-200 dark:border-gray-700 my-6 pt-6">
                <SignedOut>
                  <div className="flex flex-col gap-3">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        Sign in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        className={`w-full justify-center bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to}`}
                      >
                        Start Creating
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex flex-col items-center gap-4 py-4">
                    <UserButton afterSignOutUrl={paths.home} />
                    <div className="flex flex-col gap-2 w-full">
                      <Link href="/dashboard">
                        <Button
                          variant="outline"
                          className="w-full justify-center text-gray-700 dark:text-gray-300"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link href={paths.managePlan}>
                        <Button
                          className={`w-full justify-center bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to} hover:opacity-90 text-white`}
                        >
                          Manage Plan
                        </Button>
                      </Link>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your account
                    </span>
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

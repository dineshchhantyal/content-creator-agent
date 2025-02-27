import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`relative h-7 w-7 overflow-hidden rounded-md bg-gradient-to-br from-${siteConfig.colors.gradient.from} via-${siteConfig.colors.gradient.via} to-${siteConfig.colors.gradient.to} flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
            </div>
            <span
              className={`font-medium bg-clip-text text-transparent bg-gradient-to-r from-${siteConfig.colors.gradient.from} to-${siteConfig.colors.gradient.to}`}
            >
              {siteConfig.logo.text.main}
              <span className="text-foreground">
                {siteConfig.logo.text.accent}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span>Designed by</span>
              <Link
                href="https://www.dineshchhantyal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Dinesh Chhantyal
              </Link>
            </div>

            <div className="hidden md:flex h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

            <div className="flex items-center gap-4">
              {/* <Link
                href="/privacy"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms
              </Link> */}
              <Link
                href="https://www.universityofcode.com/"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                #PapaReact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { paths, siteConfig } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href={paths.home} className="flex items-center gap-3 group">
            {/* Your logo SVG */}
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

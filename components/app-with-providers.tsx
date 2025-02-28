"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
import { ClerkProvider } from "@clerk/nextjs";

export function AppWithProviders({ children }: { children: React.ReactNode }) {
  const schematicPublishableKey =
    process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;

  if (!schematicPublishableKey) {
    throw new Error(
      "Please provide your Schematic Publishable Key in the NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY environment variable."
    );
  }
  return (
    <ClerkProvider>
      <SchematicProvider publishableKey={schematicPublishableKey}>
        <SchematicWrapped>
          <ThemeProvider defaultTheme="system">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </SchematicWrapped>
      </SchematicProvider>
    </ClerkProvider>
  );
}

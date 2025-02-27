"use client";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-40"></div>
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-fuchsia-400 blur-3xl opacity-30"></div>
            <div className="absolute -left-24 -bottom-24 w-64 h-64 rounded-full bg-purple-400 blur-3xl opacity-30"></div>
          </div>
          <div className="relative px-6 py-16 md:py-20 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
              Ready to Supercharge Your Content Creation?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl">
              Join thousands of creators who are saving time and creating better
              content with CreatorAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                variant="secondary"
              >
                Start For Free
              </Button>
              <Button
                size="lg"
                className="bg-transparent border border-white text-white hover:bg-white/10"
                variant="outline"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

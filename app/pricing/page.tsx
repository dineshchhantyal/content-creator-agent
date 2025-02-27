"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Calculate yearly savings percentages
  const savingsPercentage = (plan: (typeof siteConfig.pricingPlans)[0]) => {
    const monthlyAnnual = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    return Math.round(((monthlyAnnual - yearlyCost) / monthlyAnnual) * 100);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple,{" "}
            <span className="text-purple-600 dark:text-purple-400">
              transparent
            </span>{" "}
            pricing
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to create amazing content with AI assistance. No
            hidden fees or surprises.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                billingCycle === "yearly"
                  ? "bg-purple-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              role="switch"
              aria-checked={billingCycle === "yearly"}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingCycle === "yearly" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-1 ${
                billingCycle === "yearly"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Yearly
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <TooltipProvider>
            {siteConfig.pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border ${
                  plan.popular
                    ? "border-purple-200 dark:border-purple-900 shadow-xl shadow-purple-100 dark:shadow-none"
                    : "border-gray-200 dark:border-gray-800"
                } bg-white dark:bg-gray-900 p-6 md:p-8`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold">
                      $
                      {billingCycle === "monthly"
                        ? plan.price.monthly
                        : (plan.price.yearly / 12).toFixed(2)}
                    </span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>

                  {billingCycle === "yearly" && (
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ${plan.price.yearly}
                      </span>{" "}
                      billed yearly
                      <span className="ml-1 text-xs text-green-600 dark:text-green-400">
                        (Save {savingsPercentage(plan)}%)
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90"
                      : "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>

        {/* FAQs */}
        <div className="mt-24 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-medium mb-2">
                Can I switch between plans?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. When
                upgrading, you&lsquo;ll be prorated for the remainder of your
                billing cycle. When downgrading, the new rate will apply at the
                start of your next billing cycle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a 14-day money-back guarantee for all new
                subscriptions. If you&lsquo;re not satisfied with CreatorAI,
                contact our support team within 14 days of your initial purchase
                for a full refund.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-medium mb-2">
                What happens if I exceed my plan limits?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you reach your plan&lsquo;s limits, you can continue using
                the platform until the end of your billing cycle, but certain
                features may be limited. You&lsquo;ll receive notifications as
                you approach your limits, giving you the option to upgrade or
                manage your usage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-medium mb-2">
                Do you offer custom enterprise solutions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our Enterprise plan can be customized to meet your specific
                needs. Contact our sales team to discuss your requirements and
                get a tailored solution for your business.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your content creation?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who are already using CreatorAI
              to create better content, faster.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90 text-lg"
            >
              Start Your Free Trial
            </Button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

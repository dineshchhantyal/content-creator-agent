import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  CreditCard,
  Receipt,
  Settings,
  AlertCircle,
} from "lucide-react";
import AnimatedHeader from "./AnimatedHeader";
import SchematicComponent from "@/components/schematic/SchematicComponent";

const ManagePlan = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedHeader />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-10 pb-24 max-w-5xl">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
          <Tabs defaultValue="subscription" className="w-full">
            <div className="border-b border-gray-100 dark:border-gray-800">
              <div className="px-6 pt-6 pb-2">
                <TabsList className="bg-gray-100 dark:bg-gray-800/50 p-1">
                  <TabsTrigger
                    value="subscription"
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Subscription</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing-history"
                    className="flex items-center gap-2"
                  >
                    <Receipt className="h-4 w-4" />
                    <span className="hidden sm:inline">Billing History</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment-methods"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Payment Methods</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <CardContent className="pt-6">
              <TabsContent value="subscription" className="space-y-6 mt-0">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-lg border border-purple-100 dark:border-purple-900/30 p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300">
                        Manage your CreatorAI subscription
                      </h3>
                      <p className="text-sm text-purple-700 dark:text-purple-400 mt-0.5">
                        Use the interface below to upgrade, change, or cancel
                        your plan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schematic Billing Component */}
                <div className="min-h-[500px]">
                  <SchematicComponent componentId="cmpn_C4xrNVEPyoK" />
                </div>
              </TabsContent>

              <TabsContent value="billing-history" className="mt-0">
                <div className="min-h-[500px] flex flex-col items-center justify-center">
                  <div className="text-center p-8 max-w-md">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <Receipt className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Billing History
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Your complete billing history and past invoices will
                      appear here once the integration is complete.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment-methods" className="mt-0">
                <div className="min-h-[500px] flex flex-col items-center justify-center">
                  <div className="text-center p-8 max-w-md">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Payment Methods
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Manage your payment methods and update your billing
                      details here once the integration is complete.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Help Section */}
        <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-shrink-0 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-full">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium mb-1">
                Need help with billing?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                If you have any questions about your subscription or need
                assistance, our support team is here to help.
              </p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <a
                href="mailto:support@creatorai.dineshchhantyal.com"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagePlan;

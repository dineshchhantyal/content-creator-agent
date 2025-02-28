import { client } from "./schematic";

export async function checkFeatureUsageLimit(
  userId: string,
  eventSubtype: string
): Promise<{
  success: boolean;
  error?: string;
  message?: string;
  remaining?: number;
}> {
  try {
    const entitlements = await client.entitlements.getFeatureUsageByCompany({
      keys: {
        id: userId,
      },
    });

    console.log({ f: entitlements.data.features[2].feature });
    const feature = entitlements.data.features.find(
      (feature) => feature.feature?.eventSubtype === eventSubtype
    );

    console.log({
      feature,
      eventSubtype,
    });

    if (!feature) {
      return {
        success: false,
        error: "Feature not available on your current plan",
        message:
          "This feature isn't available with your current subscription. Please upgrade your plan to access this functionality.",
      };
    }

    const { usage, allocation } = feature;

    if (usage === undefined || allocation === undefined) {
      return {
        success: false,
        error: "Usage information unavailable",
        message:
          "We couldn't retrieve your usage information. Please try again later or contact support if this persists.",
      };
    }

    const remaining = allocation - usage;

    if (usage >= allocation) {
      const featureName = feature.feature?.name || eventSubtype;
      return {
        success: false,
        error: "Usage limit reached",
        message: `You've reached your limit for ${featureName}. To continue using this feature, please upgrade your plan by clicking on 'Manage Plan' in the header.`,
        remaining: 0,
      };
    }

    // Success case with remaining usage info
    return {
      success: true,
      remaining,
      message:
        remaining <= 3
          ? `You have ${remaining} usage${
              remaining === 1 ? "" : "s"
            } remaining for this feature.`
          : undefined,
    };
  } catch (error) {
    console.error("Error checking feature usage limit:", error);
    return {
      success: false,
      error: "Service temporarily unavailable",
      message:
        "We're having trouble checking your usage limits. Please try again in a few moments.",
    };
  }
}

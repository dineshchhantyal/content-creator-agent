const CLERK_ISSUE_URL = process.env.CLERK_ISSUE_URL;

if (!CLERK_ISSUE_URL) {
  throw new Error("CLERK_ISSUE_URL is required");
}

export default {
  providers: [
    {
      domain: CLERK_ISSUE_URL,
      applicationID: "convex",
    },
  ],
};

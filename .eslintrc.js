module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Disable warnings about using <img> instead of next/image
    "@next/next/no-img-element": "off",

    // Allow explicit any types
    "@typescript-eslint/no-explicit-any": "off",

    // Allow TS directive comments but prefer @ts-expect-error over @ts-ignore
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-ignore": "allow-with-description",
        "ts-expect-error": "allow-with-description",
        minimumDescriptionLength: 3,
      },
    ],

    // Suppress exhaustive-deps warning
    "react-hooks/exhaustive-deps": "warn",
  },
};

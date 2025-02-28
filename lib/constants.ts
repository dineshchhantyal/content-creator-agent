export const siteConfig = {
  name: "CreatorAI",
  description: "Your AI-powered content creation assistant",
  url: "https://creatorai.app",
  ogImage: "https://creatorai.app/og.jpg",

  // Branding
  logo: {
    text: {
      main: "Creator",
      accent: "AI",
    },
    tagline: "CREATE SMARTER",
  },

  // Colors (to reference in custom components)
  colors: {
    gradient: {
      from: "purple-600",
      via: "violet-500",
      to: "fuchsia-500",
    },
    shadow: "rgba(147,51,234,0.5)", // Purple shadow
  },

  // Navigation
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "#",
      children: [
        {
          title: "Studio Pro",
          href: "/studio",
          description: "Advanced editing capabilities with AI assistance",
          featured: true,
        },
        {
          title: "Templates",
          href: "/templates",
          description: "Ready-to-use video templates",
        },
        {
          title: "AI Tools",
          href: "/ai-tools",
          description: "Smart editing and enhancement tools",
        },
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],

  // Mobile navigation
  mobileNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Studio Pro",
      href: "/studio",
    },
    {
      title: "Templates",
      href: "/templates",
    },
    {
      title: "AI Tools",
      href: "/ai-tools",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],

  // Pricing tiers
  pricingPlans: [
    {
      name: "Free",
      description:
        "Perfect for getting started with AI-powered content creation.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "3 Image Generations per month",
        "Basic Script Generation",
        "5 Title Generations per month",
        "3 Transcriptions per month",
        "5 Video Analysis per month",
        "Community Support",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Starter",
      description: "For creators who need more capabilities.",
      price: {
        monthly: 9.99,
        yearly: 99.99,
      },
      features: [
        "10 Image Generations per month",
        "Script Generation",
        "10 Title Generations per month",
        "25 Transcriptions per month",
        "45 Video Analysis per month",
        "Email Support",
      ],
      cta: "Start Creating",
      popular: false,
    },
    {
      name: "Pro",
      description: "For serious content creators who need more power.",
      price: {
        monthly: 19.99,
        yearly: 199.99,
      },
      features: [
        "50 Image Generations per month",
        "Advanced Script Generation",
        "Unlimited Title Generations",
        "100 Transcriptions per month",
        "Unlimited Video Analysis",
        "Priority Support",
        "Access to Beta Features",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and businesses.",
      price: {
        monthly: 49.99,
        yearly: 499.99,
      },
      features: [
        "Unlimited Image Generations",
        "Advanced Script Generation with custom training",
        "Unlimited Title Generations",
        "Unlimited Transcriptions",
        "Unlimited Video Analysis",
        "Dedicated Support",
        "Custom Integrations",
        "Team Management",
      ],
      cta: "Contact Sales",
      popular: false,
      contactEmail: "sales@creatorai.dineshchhantyal.com",
    },
  ],

  // Footer links
  footerLinks: [
    {
      title: "Product",
      links: [
        { title: "Features", href: "/features" },
        { title: "Pricing", href: "/pricing" },
        { title: "Roadmap", href: "/roadmap" },
        { title: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "Tutorials", href: "/tutorials" },
        { title: "Support", href: "/support" },
        { title: "API", href: "/api" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Contact", href: "/contact" },
        { title: "Privacy", href: "/privacy" },
      ],
    },
  ],

  // Social links
  socialLinks: [
    {
      name: "Twitter",
      href: "https://twitter.com/creatorai",
      icon: "twitter",
    },
    {
      name: "GitHub",
      href: "https://github.com/creatorai",
      icon: "github",
    },
    {
      name: "Discord",
      href: "https://discord.gg/creatorai",
      icon: "discord",
    },
  ],
};

// App paths for routing and navigation
export const paths = {
  home: "/",
  dashboard: "/dashboard",
  studio: "/studio",
  templates: "/templates",
  aiTools: "/ai-tools",
  pricing: "/pricing",
  signIn: "/sign-in",
  signUp: "/sign-up",
  managePlan: "/manage-plan",
};

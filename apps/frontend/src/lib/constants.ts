export const landingPageContent = {
  // Site metadata
  site: {
    name: "SpeedAI",
    description:
      "Research-native writing copilot for teams that publish with confidence.",
    url: "https://speedai.com",
  },

  // Navigation links
  navigation: [
    { name: "Product", href: "#product" },
    { name: "Workflow", href: "#workflow" },
    { name: "Live Preview", href: "#live-preview" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ],

  // Hero section
  hero: {
    badge: "Research-aware writing copilot",
    title: "Draft, verify, and refine in one sleek workspace",
    description:
      "SpeedAI pairs live research with adaptive writing suggestions so your team can go from messy notes to publication-ready content in record time.",
    primaryCta: {
      text: "Start writing for free",
      href: "/auth/signup",
    },
    secondaryCta: {
      text: "Watch product tour",
      href: "#live-preview",
    },
    stats: [
      { value: "94%", label: "Drafts published faster" },
      { value: "120K+", label: "Teams collaborating" },
      { value: "4.9/5", label: "Average quality rating" },
    ],
    highlights: [
      "Cites every claim automatically",
      "Real-time tone and style guidance",
      "Research briefs that stay in sync",
    ],
  },

  // Features section (Bento Grid)
  features: [
    {
      title: "Inline research briefs",
      description:
        "Ask a question and get verifiable summaries, citations, and pull quotes that update as new sources appear.",
      icon: "rocket",
      gradient: "from-sky-400/60 via-cyan-500/50 to-emerald-400/60",
      size: "large",
    },
    {
      title: "Real-time suggestion engine",
      description:
        "Context-aware prompts surface better phrasing, structure, and SEO ideas without breaking your flow.",
      icon: "users",
      gradient: "from-indigo-400/70 via-sky-500/60 to-purple-500/70",
      size: "medium",
    },
    {
      title: "Tone orchestration",
      description:
        "Switch between brand voices, formality levels, and reading grades instantly across an entire draft.",
      icon: "zap",
      gradient: "from-rose-400/70 via-orange-400/60 to-amber-400/60",
      size: "medium",
    },
    {
      title: "Source control for content",
      description:
        "Track every edit with version timelines, reviewer comments, and smart merge suggestions for long-form pieces.",
      icon: "chart",
      gradient: "from-slate-300/70 via-slate-500/60 to-slate-700/60",
      size: "large",
    },
    {
      title: "Knowledge-safe by default",
      description:
        "SOC2-ready storage, private fine-tuning, and policy controls keep proprietary research locked down.",
      icon: "shield",
      gradient: "from-violet-400/70 via-purple-500/60 to-blue-500/60",
      size: "medium",
    },
    {
      title: "Multimodal briefing",
      description:
        "Upload PDFs, videos, or interview transcripts and let SpeedAI return clean sections with citations.",
      icon: "code",
      gradient: "from-teal-300/70 via-cyan-400/60 to-blue-400/70",
      size: "medium",
    },
  ],

  workflow: {
    title: "From research to ready-to-send in four moves",
    description:
      "Give your writers a workspace that keeps research, drafting, and approvals perfectly in lockstep.",
    steps: [
      {
        title: "Collect",
        subtitle: "Ingest every source",
        description:
          "Drop in links, PDFs, or interview notes. SpeedAI extracts key facts, verifies credibility, and stores citations automatically.",
      },
      {
        title: "Synthesize",
        subtitle: "Build structured outlines",
        description:
          "Generate briefs, outlines, and thesis statements tailored to your audience and goals in seconds.",
      },
      {
        title: "Draft",
        subtitle: "Write with live guidance",
        description:
          "Real-time suggestions and tone controls keep every paragraph on brand while surfacing gaps to fill.",
      },
      {
        title: "Review",
        subtitle: "Approve with context",
        description:
          "Share reviewer views with inline evidence, tracked decisions, and export-ready citations.",
      },
    ],
  },

  livePreview: {
    badge: "Live demo",
    title: "See the SpeedAI writing canvas in action",
    description:
      "Our Smart Canvas blends collaborative editing, side-by-side research, and AI co-writing so you never lose the thread.",
    bullets: [
      {
        title: "Citation sidekick",
        description:
          "Hover any sentence to reveal its sources and regenerate summaries with one click.",
      },
      {
        title: "Realtime comparison",
        description:
          "Playwright-powered previews show how revisions impact SEO, readability, and sentiment instantly.",
      },
      {
        title: "Focus modes",
        description:
          "Switch between drafting, fact-checking, and presentation views without leaving the canvas.",
      },
    ],
  },

  integrations: {
    title: "Works with the tools your team already loves",
    description:
      "Sync drafts, sources, and approvals across your stack with secure automations and open APIs.",
    logos: [
      "Notion",
      "Google Docs",
      "Slack",
      "Asana",
      "Confluence",
      "Webflow",
      "Drive",
      "Zapier",
    ],
  },

  testimonials: [
    {
      quote:
        "SpeedAI is the only assistant we've found that keeps research citations perfectly in sync while we edit. Our review cycles dropped by 60%.",
      author: "Priya Desai",
      role: "Head of Content, Lumen Labs",
    },
    {
      quote:
        "Between tone controls and the real-time suggestion stream, our writers finish thought leadership pieces twice as fast without sacrificing rigor.",
      author: "Jordan Wright",
      role: "Managing Editor, Storyboard",
    },
  ],

  pricing: {
    title: "Flexible plans for teams of every size",
    tiers: [
      {
        name: "Starter",
        price: "$0",
        cadence: "per seat / month",
        description: "Perfect for individuals validating ideas and workflows.",
        features: [
          "Unlimited drafts",
          "5 live research briefs per day",
          "Export to Google Docs",
        ],
        cta: "Start free",
      },
      {
        name: "Studio",
        price: "$49",
        cadence: "per seat / month",
        description:
          "Collaborative tools and Playwright visual previews for growing teams.",
        features: [
          "Realtime suggestion threads",
          "Unlimited Playwright performance previews",
          "Brand voice libraries",
          "Priority support",
        ],
        cta: "Start trial",
        highlight: true,
      },
      {
        name: "Enterprise",
        price: "Let’s chat",
        cadence: "Custom deployment",
        description:
          "Granular controls, private hosting, and compliance at scale.",
        features: [
          "On-prem or VPC deployment",
          "Custom AI guardrails",
          "Dedicated success manager",
          "SOC2 Type II and ISO 27001",
        ],
        cta: "Talk to sales",
      },
    ],
  },

  // FAQ section
  faq: [
    {
      question: "What makes SpeedAI different from other writing tools?",
      answer:
        "SpeedAI is built for research-heavy teams. Every suggestion is backed by verifiable sources, while Playwright-powered previews show impact across tone, SEO, and engagement before you publish.",
    },
    {
      question: "How does SpeedAI handle research and citations?",
      answer:
        "Drop in links, documents, or transcripts and SpeedAI extracts facts, tags credibility, and keeps inline citations synced as your draft evolves.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. Deploy in our managed cloud or your own VPC, with audit trails, granular access policies, and true data isolation. Your drafts and sources are never used to train shared models.",
    },
    {
      question: "Can I bring my own brand voice and style guide?",
      answer:
        "Yes. Upload your style guides and example content to build reusable voice profiles that power every suggestion.",
    },
    {
      question: "How does pricing work?",
      answer:
        "Start with our free tier, then upgrade to Studio for unlimited collaborative features or Enterprise for custom security and deployment options.",
    },
    {
      question: "How do I get started?",
      answer:
        "Create a free account, choose a voice profile, and spin up your first research brief. You can be drafting with SpeedAI in under five minutes.",
    },
  ],

  // Footer content
  footer: {
    description:
      "Research-native writing assistant for modern teams. Publish faster without losing rigor.",
    columns: [
      {
        title: "Product",
        links: [
          { name: "Features", href: "#features" },
          { name: "Workflow", href: "#workflow" },
          { name: "Live Preview", href: "#live-preview" },
          { name: "Security", href: "/security" },
        ],
      },
      {
        title: "Company",
        links: [
          { name: "About", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Careers", href: "/careers" },
          { name: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "Documentation", href: "/docs" },
          { name: "Tutorials", href: "/tutorials" },
          { name: "Community", href: "/community" },
          { name: "Support", href: "/support" },
        ],
      },
      {
        title: "Trust",
        links: [
          { name: "Privacy", href: "/privacy" },
          { name: "Terms", href: "/terms" },
          { name: "Compliance", href: "/compliance" },
          { name: "Security", href: "/security" },
          { name: "Cookies", href: "/cookies" },
        ],
      },
    ],
    social: [
      {
        name: "Twitter",
        href: "https://twitter.com/speedai",
        icon: "twitter",
      },
      {
        name: "GitHub",
        href: "https://github.com/speedai",
        icon: "github",
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/company/speedai",
        icon: "linkedin",
      },
      {
        name: "Discord",
        href: "https://discord.gg/speedai",
        icon: "discord",
      },
    ],
    copyright: `© ${new Date().getFullYear()} SpeedAI. All rights reserved.`,
  },
};

/**
 * Single place to edit everything on the page.
 * Update the numbers here each month after pulling Instagram Insights.
 */
export const site = {
  url: "https://esc8pe.media",
  handle: "@esc8pe.reality",
  email: "hello@esc8pe.media",
  instagram: "https://instagram.com/esc8pe.reality",
  mediaKit: "/escape-reality-media-kit.pdf",
  description:
    "A media brand for young people who live in gaming, technology, nostalgia and internet culture. 60 million views a month.",
  window: "Jul 27 to Aug 25, 2026",

  /** Headline stats in the hero strip. Refresh monthly from Insights. */
  stats: [
    { value: "60.1M", label: "Views · 30 days" },
    { value: "23.3M", label: "Accounts reached" },
    { value: "1.07M", label: "Avg views per post" },
    { value: "17.6%", label: "Interaction rate" },
  ],

  /** Secondary proof points inside the Work with us block. */
  proof: [
    { value: "113,000", label: "Followers" },
    { value: "97.5%", label: "Views from non-followers" },
    { value: "67,800", label: "New followers · 30 days" },
    { value: "5 days", label: "Concept to live" },
  ],

  /** Partnership formats. Deliberately no public pricing. */
  formats: [
    { name: "Sponsored Reel", detail: "One in-feed reel, fully produced, pinned 72 hours" },
    { name: "Reel + Stories", detail: "One reel plus three story frames with link sticker" },
    { name: "Two-Reel Campaign", detail: "Two reels over two weeks, sequenced as one story" },
    { name: "Monthly Partnership", detail: "Four reels, six story frames, link in bio all month" },
    { name: "Carousel Feature", detail: "Multi-slide carousel, highest engagement per view" },
    { name: "Story Package", detail: "Three story frames with link sticker" },
  ],

  /** How a campaign runs, start to finish. */
  process: [
    { step: "01", name: "Brief", detail: "Product, goal and any must-say points" },
    { step: "02", name: "Concept", detail: "Hook and script back within 48 hours" },
    { step: "03", name: "Approval", detail: "One revision round, then locked" },
    { step: "04", name: "Live", detail: "Posted within five business days" },
    { step: "05", name: "Report", detail: "Full numbers at 72 hours and 7 days" },
  ],
} as const;

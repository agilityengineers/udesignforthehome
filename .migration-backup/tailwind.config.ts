import type { Config } from "tailwindcss";

/**
 * Design tokens for U Design For The Home.
 * Flat, editorial aesthetic: NO border radius, NO shadows anywhere.
 * The accent is exposed as the CSS custom property `--accent` (default sage),
 * so it can be re-themed at runtime (sage / terracotta / brass).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F1", // page background, light cards, light text on dark
        sand: "#F2EDE3", // testimonials section, admin background
        ink: "#2A261F", // body text, dark sections, hero base
        "footer-ink": "#221F19", // footer background
        sage: "#7D8471", // accent option
        terracotta: "#B26E4B", // accent option / "Scheduled" status
        brass: "#A8894C", // accent option / "Contacted" status
        muted: "#6B6357", // secondary text on light
        "body-ink": "#4A443B", // long-form paragraph text (legal)
        "muted-gray": "#9A9182", // "Completed" status, hints
        danger: "#A0522D", // login error, delete hover
        // The live, re-themeable accent. Consumed as bg-accent / text-accent / etc.
        accent: "var(--accent)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "Hanken Grotesk", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Flat aesthetic — override every radius token to 0.
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      boxShadow: {
        // Flat aesthetic — no shadows.
        none: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
      },
      maxWidth: {
        content: "1200px",
        "content-narrow": "1100px",
        prose: "760px",
      },
      letterSpacing: {
        eyebrow: "0.28em",
        wide: "0.14em",
        widest: "0.3em",
      },
      keyframes: {
        scrollCue: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(8px)", opacity: "0.4" },
        },
      },
      animation: {
        scrollCue: "scrollCue 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

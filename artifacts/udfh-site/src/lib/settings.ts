import type { Testimonial } from "./content";

export type HeroStyle = "image" | "video";

export type ResolvedSettings = {
  phone: string;
  email: string;
  phoneHref: string;
  mailtoHref: string;
  heroHeadline: string;
  heroSubhead: string;
  heroStyle: HeroStyle;
  heroVideoUrl: string;
  testimonials: Testimonial[];
};

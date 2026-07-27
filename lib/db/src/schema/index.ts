import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ---------------------------------------------------------------------------
// Leads — consultation requests from the public booking form
// ---------------------------------------------------------------------------

export const leadsTable = pgTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  zip: text("zip").notNull().default(""),
  projectType: text("project_type").notNull().default(""),
  message: text("message").notNull().default(""),
  /** One of: New | Contacted | Scheduled | Completed */
  status: text("status").notNull().default("New"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ createdAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

// ---------------------------------------------------------------------------
// SiteSettings — single-row CMS store (id always = 1)
// ---------------------------------------------------------------------------

export const siteSettingsTable = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  heroHeadline: text("hero_headline").notNull().default(""),
  heroSubhead: text("hero_subhead").notNull().default(""),
  /** "image" | "video" */
  heroStyle: text("hero_style").notNull().default("image"),
  heroVideoUrl: text("hero_video_url").notNull().default(""),
  /** JSON-encoded Testimonial[] */
  testimonials: text("testimonials").notNull().default("[]"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({ updatedAt: true });
export type SiteSettings = typeof siteSettingsTable.$inferSelect;

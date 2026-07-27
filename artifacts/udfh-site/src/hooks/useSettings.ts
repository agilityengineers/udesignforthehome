import { useState, useEffect } from "react";
import type { ResolvedSettings } from "@/lib/settings";
import {
  DEFAULT_HERO_HEADLINE,
  DEFAULT_HERO_SUBHEAD,
  DEFAULT_TESTIMONIALS,
  BUSINESS,
} from "@/lib/content";

const DEFAULT_SETTINGS: ResolvedSettings = {
  phone: BUSINESS.defaultPhone,
  email: BUSINESS.defaultEmail,
  phoneHref: `tel:${BUSINESS.defaultPhone.replace(/\D/g, "")}`,
  mailtoHref: `mailto:${BUSINESS.defaultEmail}`,
  heroHeadline: DEFAULT_HERO_HEADLINE,
  heroSubhead: DEFAULT_HERO_SUBHEAD,
  heroStyle: "image",
  heroVideoUrl: "",
  testimonials: DEFAULT_TESTIMONIALS,
};

export function useSettings() {
  const [settings, setSettings] = useState<ResolvedSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data as ResolvedSettings);
      })
      .catch(() => {
        /* keep defaults on network failure */
      })
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}

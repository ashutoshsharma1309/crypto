import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = `https://${site.domain}`;
  return [
    {
      url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

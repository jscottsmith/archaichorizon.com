import { MetadataRoute } from "next";
import { getAllCatNos } from "./constants/releaseMap";
import { SITE } from "./constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic release pages
  const releasePages = getAllCatNos().map((catNo) => ({
    url: `${baseUrl}/release/${catNo}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...releasePages];
}

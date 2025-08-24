import { MetadataRoute } from "next";
import { getAllCatNos } from "./constants/releaseMap";
import { SITE } from "./constants/site";
import { ROUTES } from "./constants/routes";
import { buildReleaseRoute } from "./utils/url";

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
      url: `${baseUrl}${ROUTES.COLLECTION}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.CONTACT}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic release pages
  const releasePages = getAllCatNos().map((catNo) => ({
    url: `${baseUrl}${buildReleaseRoute(catNo)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...releasePages];
}

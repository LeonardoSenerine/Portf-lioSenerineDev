import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Sites e aplicações`,
    short_name: site.brand,
    description: "Sites e aplicações sob medida para negócios de qualquer área.",
    start_url: "/pt",
    display: "standalone",
    background_color: "#f2efea",
    theme_color: "#0a63b2",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

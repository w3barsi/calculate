import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DG Calculate Prices",
    short_name: "Calculate",
    description: "Price Calculator for Darcy Graphix Advertising",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

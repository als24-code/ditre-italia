import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/syne";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ditre Italia — Quiet Forms, Loud in Meaning",
  description:
    "Italian furniture that merges craftsmanship with contemporary sensibility — pieces defined by clarity, comfort, and care.",
};

export const viewport: Viewport = {
  themeColor: "#fdfaf3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

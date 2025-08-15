import type { Metadata } from "next";
import "@/styles/index.css";
import Header from "@/layouts/headers";
import Footer from "@/layouts/footers";
import ScrollToTop from "@/components/common/ScrollToTop";
import ScrollTop from "@/components/common/ScrollTop";

export const metadata: Metadata = {
  title: "Netflow Academy - Education Platform",
  description:
    "Netflow Academy provides skill-based education to help you succeed in your global career. Our courses teach real-world skills and come with lifetime support and career guidance.",
  icons: {
    icon: "/vite.svg",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <ScrollTop />
      </body>
    </html>
  );
}

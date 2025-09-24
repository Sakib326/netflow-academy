import type { Metadata } from "next";
import "@/styles/index.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import ScrollTop from "@/components/common/ScrollTop";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/redux/StoreProvider";

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
    <html
      lang="en"
      className="tw:overflow-x-hidden tw:m-0 tw:p-0"
      style={{ padding: 0, margin: 0, overflowX: "hidden" }}
    >
      <body
        className="tw:overflow-x-hidden tw:m-0 tw:p-0"
        style={{ overflowX: "hidden" }}
      >
        <StoreProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
          <Footer />
          {/* <ScrollToTop /> */}
          <ScrollTop />
        </StoreProvider>
      </body>
    </html>
  );
}

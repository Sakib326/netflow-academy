import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Netflow Academy - Education Platform",
  description:
    "Netflow Academy provides skill-based education to help you succeed in your global career. Our courses teach real-world skills and come with lifetime support and career guidance.",
  icons: {
    icon: "/vite.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/boxicons.min.css" />
        <link rel="stylesheet" href="/assets/css/slicknav.css" />
        <link rel="stylesheet" href="/assets/css/flexslider.css" />
        <link rel="stylesheet" href="/assets/css/gijgo.min.css" />
        <link rel="stylesheet" href="/assets/css/line-awesome.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/niceselect.css" />
        <link rel="stylesheet" href="/assets/css/preloader.css" />
        <link rel="stylesheet" href="/assets/css/YouTubePopUp.css" />
        <link rel="stylesheet" href="/assets/css/YTPlayer.css" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/slick-theme.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="/assets/css/jquery-simple-mobilemenu.css"
        />
        <link rel="stylesheet" href="/assets/fonts/themify-icons.css" />
        <link
          rel="stylesheet"
          href="/assets/fonts/fontawesome/fontawesome.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

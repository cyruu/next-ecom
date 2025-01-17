"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../css/sidebar.css";
import "../css/landingpage.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/helper/theme";
import { Header, SideMenu } from "@/index";
import { Provider } from "react-redux";
import { store } from "@/slices/store";
import Footer from "@/components/Footer";

import i18n from "../../i18n";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <head>
            <title>Ecom</title>
            <link
              rel="icon"
              type="image/png"
              href="/favicon-96x96.png"
              sizes="96x96"
            />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
          </head>
          <body className="flex flex-col  min-h-screen ">
            <Header />
            <SideMenu />
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </body>
        </html>
      </ThemeProvider>
    </Provider>
    // </I18nextProvider>
  );
}

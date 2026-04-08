import { cookies } from "next/headers";
import Script from "next/script";
import type { Metadata } from "next";
import { UserContextProvider } from "@/context/user";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CodePill",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("codePillTheme")?.value ?? "dark";

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');`,
          }}
        />
        <UserContextProvider themeProp={theme}>
          <Layout>{children}</Layout>
        </UserContextProvider>
      </body>
    </html>
  );
}

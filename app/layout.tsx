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
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_ID}');`,
          }}
        />
        <UserContextProvider themeProp={theme}>
          <Layout>{children}</Layout>
        </UserContextProvider>
      </body>
    </html>
  );
}

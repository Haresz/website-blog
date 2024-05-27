import type { Metadata } from "next";
import { Providers } from "./providers";
import "../app/globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "The Blog",
  description: "Website Block",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Providers>{children}</Providers>
        </StoreProvider>
      </body>
    </html>
  );
}

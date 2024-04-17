// app/layout.tsx
import { Providers } from "./providers";
import "../app/globals.css";
import Nav from "@/components/Nav";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StoreProvider>
            <Nav />
            {children}
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}

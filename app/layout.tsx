import type { Metadata } from "next";
import "./globals.css";
import NavigationLoader from "./component/NavigationLoader/NavigationLoader";
import LayoutWrapper from "./LayoutWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Imaigal Trust",
  description:
    "Imaigal Trust is a Tamil Nadu-based NGO dedicated to empowering communities through education, health, women’s welfare, rural development, and skill training initiatives across Erode, Salem, and nearby districts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Navigation Loader */}
        <NavigationLoader />

        {/* Main Layout */}
        <LayoutWrapper>{children}</LayoutWrapper>

      
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#1a4d2e",
              color: "#fff",
              zIndex: 9999999,
            },
          }}
        />
        
      </body>
    </html>
  );
}
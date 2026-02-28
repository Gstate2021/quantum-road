import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ProgressProvider } from "@/hooks/use-progress";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthGate } from "@/components/auth-gate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantum Road - 量子コンピューティング学習プラットフォーム",
  description:
    "量子コンピューティング・最適化・PQCを体系的に学ぶ個人学習プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <AuthGate>
              <ProgressProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>{children}</SidebarInset>
                </SidebarProvider>
              </ProgressProvider>
            </AuthGate>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

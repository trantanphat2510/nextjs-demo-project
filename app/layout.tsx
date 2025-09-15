import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ConfigProvider } from "antd"
import { Suspense } from "react"
import { StoreProvider } from "../src/presentation/providers/store-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Shop Demo",
  description: "Shop Demo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <StoreProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#059669",
                  colorSuccess: "#10b981",
                  colorWarning: "#f59e0b",
                  colorError: "#dc2626",
                  borderRadius: 8,
                  fontFamily: "var(--font-geist-sans)",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </StoreProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

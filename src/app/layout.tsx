import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import './globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/utils'

// Load font with subset for performance
const inter = Inter({ subsets: ['latin'], display: 'swap' })

// Dynamic metadata
export const generateMetadata = (): Metadata => {
  return {
    title: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    openGraph: {
      title: `${siteConfig.name} - Portfolio`,
      description: siteConfig.description,
      url: siteConfig.url,
      images: [siteConfig.ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} - Portfolio`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    keywords: ['full stack developer', 'next.js portfolio', 'web developer'],
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header role="banner">
              <Navbar />
            </header>
            <main className="flex-grow" role="main">
              {children}
            </main>
            <footer role="contentinfo">
              <Footer />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
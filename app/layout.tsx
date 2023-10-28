import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/utils/classnames'
import { GeistSans } from 'geist/font'
import { RootLayoutProps } from '@/models/root-layout'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Small app to experiment next.js 14, shadcn and prisma',
}
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍🎓</text></svg>" />
      </ head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.className,
          GeistSans.variable

        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}

 

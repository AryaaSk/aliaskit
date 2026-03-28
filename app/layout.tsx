import type { Metadata } from 'next'
import { Syncopate, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AliasKit — Identity Layer for Autonomous Agents',
  description:
    'Provision complete, verifiable identities for autonomous AI agents. Email, virtual cards, cryptographic keys, and reputation — through a unified zero-trust control plane.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syncopate.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  )
}

import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import FeatureCards from '@/components/FeatureCards'
import PricingSection from '@/components/PricingSection'
import OpenClawSection from '@/components/OpenClawSection'
import WaitlistSection from '@/components/WaitlistSection'

export default function Home() {
  return (
    <>
      {/* Fixed background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 10 L 40 10 M 10 0 L 10 40' fill='none' stroke='rgba(100,116,139,0.04)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navigation />

      <main className="flex-grow pt-[100px] flex flex-col items-center">
        <HeroSection />
        <FeatureCards />
        <PricingSection />
        <OpenClawSection />
        <WaitlistSection />
      </main>

      {/* Minimal footer */}
      <footer
        className="w-full py-8 px-6 text-center"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
      >
        <span
          className="text-xs"
          style={{ color: '#334155', fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          © 2026 AliasKit
        </span>
      </footer>
    </>
  )
}

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Workflow } from "@/components/landing/Workflow";
import { LivePreview } from "@/components/landing/LivePreview";
import { Integrations } from "@/components/landing/Integrations";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <LivePreview />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

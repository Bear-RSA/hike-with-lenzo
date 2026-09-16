import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrailsSection } from "@/components/TrailsSection";
import { EnquiryForm } from "@/components/EnquiryForm";
import { TrustBar, HowItWorks, AboutLenzo, Safety, Testimonials, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <TrailsSection />
        <HowItWorks />
        <AboutLenzo />
        <Safety />
        <Testimonials />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}

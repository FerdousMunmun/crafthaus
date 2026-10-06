

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Service from "@/components/home/Service";
import Projects from "@/components/home/Projects";
import FeedbackSection from "@/components/home/FeedbackSection";
import GrowthChart from "@/components/home/GrowthChart";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      
      <Hero />
      <About/>
      <Service/>
      <Projects/>
      <FeedbackSection/>
      <GrowthChart/>
    </main>
  );
}
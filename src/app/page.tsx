
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Service from "@/components/home/Service";
import Projects from "@/components/home/Projects";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <Navbar />
      <Hero />
      <About/>
      <Service/>
      <Projects/>
    </main>
  );
}
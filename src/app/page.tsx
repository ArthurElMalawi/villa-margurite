import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import House from "@/components/sections/House";
import Rooms from "@/components/sections/Rooms";
import Spaces from "@/components/sections/Spaces";
import Neighbourhood from "@/components/sections/Neighbourhood";
import Tour from "@/components/sections/Tour";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <House />
        <Rooms />
        <Spaces />
        <Neighbourhood />
        <Tour />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

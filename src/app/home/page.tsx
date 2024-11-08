"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";

import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ConservationForum } from "@/components/ConservationPlatform";
import Forum from "@/components/forum";

const ConservationPlatform = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PlatformSection />
        <ConservationForum />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default ConservationPlatform;

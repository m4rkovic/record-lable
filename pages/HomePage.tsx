// Naziv komponente: HomePage
import React from 'react';
import HeroSection from '../sections/HeroSection';
import ReleasesSection from '../sections/ReleasesSection';
import ArticlesSection from '../sections/ArticlesSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';

// Početna stranica koja agregira sve sekcije u jedan Landing Page
const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ReleasesSection />
      <ArticlesSection />
      <AboutSection />
      <ContactSection />
    </>
  );  
};

export default HomePage;
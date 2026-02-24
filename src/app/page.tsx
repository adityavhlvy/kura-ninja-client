import HomeView from "@/view/home/Home";
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Aditya Vahlevy Nugraha - Fullstack Developer",
  description: "Aditya Vahlevy Nugraha is a Fullstack Developer, Software Engineer, and Data Science Enthusiast based in Indonesia. Explore his projects and learn more about his work.",
  keywords: "Aditya Vahlevy Nugraha, Fullstack Developer, Software Engineer, Data Science, Project Manager, Project Management, Beasiswa APERTI BUMN 2021, Jakarta, Dumai, Riau, Indonesia, SMAN PLUS Provinsi Riau, Golang, Go Fiber, Fiber, React, Next.js, Python, Portfolio",
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aditya Vahlevy Nugraha',
    alternateName: 'Kura Ninja',
    url: 'https://kuraninja.vercel.app',
    image: 'https://kuraninja.vercel.app/assets/profile.png',
    sameAs: [
      'https://www.linkedin.com/in/adityavahlevynugraha/',
      'https://github.com/adityavhlvy',
      'https://www.instagram.com/adityavhlvy/'
    ],
    jobTitle: 'Fullstack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'PT Pupuk Indonesia (Persero)'
    }
  };

  return (
    <>
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeView />
    </>
  );
}

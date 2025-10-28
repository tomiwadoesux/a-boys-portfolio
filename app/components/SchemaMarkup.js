export default function SchemaMarkup() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wale-Durojaye Ayotomiwa",
    jobTitle: "Design Engineer",
    url: "https://ayotomcs.me",
    sameAs: [
      "https://x.com/ayotomcs",
      "https://www.instagram.com/ayotomcs",
      "https://medium.com/@ayotomcs",
      "https://github.com/ayotomcs"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "Nigeria"
    },
    email: "hello@ayotomcs.me",
    knowsAbout: [
      "Design Engineering",
      "Frontend Development",
      "UI/UX Design",
      "Next.js",
      "React",
      "GSAP Animations",
      "Web Development",
      "Software Engineering"
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Design Engineering"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ayotomcs Portfolio",
    url: "https://ayotomcs.me",
    description: "Design Engineer and Frontend Developer portfolio showcasing high-performance web experiences",
    author: {
      "@type": "Person",
      name: "Wale-Durojaye Ayotomiwa"
    },
    inLanguage: "en-US"
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ayotomcs - Design Engineering Services",
    image: "https://ayotomcs.me/opengraph.png",
    "@id": "https://ayotomcs.me",
    url: "https://ayotomcs.me",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "Nigeria"
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "18:00"
    },
    sameAs: [
      "https://x.com/ayotomcs",
      "https://www.instagram.com/ayotomcs",
      "https://medium.com/@ayotomcs"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}

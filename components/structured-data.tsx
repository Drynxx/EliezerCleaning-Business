export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Eliezer Cleaning",
    image: "https://eliezercleaning.ro/logo.png",
    url: "https://eliezercleaning.ro",
    telephone: "+40755322752",
    email: "eliezer.cleaning.sm@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Satu Mare",
      addressRegion: "SM",
      addressCountry: "RO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.7892",
      longitude: "22.8585",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    description:
      "Servicii premium de curățenie pentru case, apartamente și spații comerciale în Satu Mare. Curățenie cu aburi, detailing auto și soluții personalizate.",
    sameAs: ["https://www.facebook.com/profile.php?id=61565136025145", "https://www.instagram.com/eliezer.cleaning/"],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Servicii de Curățenie",
    provider: {
      "@type": "LocalBusiness",
      name: "Eliezer Cleaning",
    },
    areaServed: {
      "@type": "City",
      name: "Satu Mare",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii de Curățenie",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Curățenie Rezidențială",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Curățenie cu Aburi",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Detailing Auto",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Curățenie Comercială",
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}

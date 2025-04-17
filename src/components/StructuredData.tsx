/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface StructuredDataProps {
  type: "Restaurant" | "LocalBusiness";
  lang: string;
  dict: any;
}

export default function StructuredData({
  type,
  lang,
}: StructuredDataProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nara-hamburg.de";

  // Restaurant schema
  if (type === "Restaurant") {
    const restaurantSchema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": `${baseUrl}/${lang}#restaurant`,
      name: "NARA Restaurant",
      image: [
        `${baseUrl}/images/barNara.jpg`,
        `${baseUrl}/images/restaurant-interior.jpg`,
      ],
      url: `${baseUrl}/${lang}`,
      telephone: "+49 40 181 283 811",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nobistor 8",
        addressLocality: "Hamburg",
        postalCode: "22767",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.5502,
        longitude: 9.9701,
      },
      servesCuisine: ["Japanese", "Sushi", "Asian Fusion"],
      priceRange: "€€€",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "17:00",
          closes: "23:00",
        },
      ],
      menu: `${baseUrl}/${lang}/menu`,
      acceptsReservations: "True",
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.opentable.com/r/nara-restaurant-hamburg",
          inLanguage: lang === "en" ? "en-US" : "de-DE",
        },
        result: {
          "@type": "Reservation",
          name: "Reserve a table",
        },
      },
    };

    return (
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
    );
  }

  // LocalBusiness schema
  if (type === "LocalBusiness") {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/${lang}#localbusiness`,
      name: "Hotel am Beatles-Platz",
      image: `${baseUrl}/images/hotel-exterior.jpg`,
      url: `${baseUrl}/${lang}`,
      telephone: "+49 40 181 283 811",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nobistor 8",
        addressLocality: "Hamburg",
        postalCode: "22767",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.5502,
        longitude: 9.9701,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      sameAs: [
        "https://www.facebook.com/hotelambeatlesplatz",
        "https://www.instagram.com/hotelambeatlesplatz",
      ],
    };

    return (
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    );
  }

  return null;
}

import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/config/i18n.config";
import type { Metadata } from "next";
import RestaurantClient from "@/components/Restaurent/RestaurantClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.restaurant.title,
    description: dict.restaurant.description,
    openGraph: {
      title: dict.restaurant.title,
      description: dict.restaurant.description,
      images: [
        {
          url: "/images/barNara.jpg",
          width: 1200,
          height: 630,
          alt: "NARA Restaurant",
        },
      ],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const restaurantDict = {
    ...dict.restaurant,
    restaurantIntro: dict.restaurantIntro,
    menu: dict.menu,
  };

  return <RestaurantClient dict={restaurantDict} />;
}

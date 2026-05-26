import type { Metadata } from 'next';

import { MarketPageShell } from '@/components/layout/MarketPageShell';
import { HomeHeroSection } from '@/components/sections/home/HomeHeroSection';
import { KuwaitGamesSection } from '@/components/sections/home/KuwaitGamesSection';
import { KuwaitOffersSection } from '@/components/sections/home/KuwaitOffersSection';
import { KuwaitSportsSection } from '@/components/sections/home/KuwaitSportsSection';
import { FinalCtaSection } from '@/components/sections/shared/FinalCtaSection';
import { getKuwaitContent } from '@/content/markets/kuwait';

export function generateMetadata(): Metadata {
  const { home } = getKuwaitContent('en');

  return {
    title: home.seo.title,
    description: home.seo.description,
  };
}

export default function EnglishHomePage() {
  const content = getKuwaitContent('en');
  const { home } = content;

  return (
    <MarketPageShell content={content} page="home">
      <HomeHeroSection hero={home.hero} />
      <KuwaitGamesSection section={home.games} />
      <KuwaitSportsSection section={home.sports} />
      <KuwaitOffersSection section={home.offers} />
      <FinalCtaSection content={home.finalCta} tone="player" />
    </MarketPageShell>
  );
}

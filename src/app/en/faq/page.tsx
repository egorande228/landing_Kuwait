import type { Metadata } from 'next';

import { MarketPageShell } from '@/components/layout/MarketPageShell';
import { KuwaitFaqSections } from '@/components/sections/faq/KuwaitFaqSections';
import { getKuwaitContent } from '@/content/markets/kuwait';

export function generateMetadata(): Metadata {
  const { faq } = getKuwaitContent('en');

  return {
    title: faq.seo.title,
    description: faq.seo.description,
  };
}

export default function EnglishFaqPage() {
  const content = getKuwaitContent('en');

  return (
    <MarketPageShell content={content} page="faq">
      <KuwaitFaqSections content={content.faq} />
    </MarketPageShell>
  );
}

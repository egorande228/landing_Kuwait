import type { Metadata } from 'next';

import { MarketPageShell } from '@/components/layout/MarketPageShell';
import { PartnershipContactCtaSection } from '@/components/sections/partnership/PartnershipContactCtaSection';
import { PartnershipHeroSection } from '@/components/sections/partnership/PartnershipHeroSection';
import { KuwaitBenefitsSection } from '@/components/sections/partnership/KuwaitBenefitsSection';
import { KuwaitPathsSection } from '@/components/sections/partnership/KuwaitPathsSection';
import { StepsSection } from '@/components/sections/shared/StepsSection';
import { getKuwaitContent } from '@/content/markets/kuwait';

export function generateMetadata(): Metadata {
  const { partnership } = getKuwaitContent('en');

  return {
    title: partnership.seo.title,
    description: partnership.seo.description,
  };
}

export default function EnglishPartnershipPage() {
  const content = getKuwaitContent('en');
  const { partnership } = content;

  return (
    <MarketPageShell content={content} page="partnership">
      <PartnershipHeroSection hero={partnership.hero} />
      <KuwaitBenefitsSection section={partnership.benefits} />
      <StepsSection section={partnership.steps} />
      <KuwaitPathsSection section={partnership.paths} />
      <PartnershipContactCtaSection content={partnership.finalCta} />
    </MarketPageShell>
  );
}

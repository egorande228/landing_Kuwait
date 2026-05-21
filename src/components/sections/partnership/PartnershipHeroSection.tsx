import type { PartnershipHeroContent } from '@/content/markets/types';

import { RevealGroup } from '@/components/motion/RevealGroup';
import { MediaSlot } from '@/components/media/MediaSlot';
import { Button } from '@/components/ui/Button';
import { SurfaceCard } from '@/components/ui/SurfaceCard';

type PartnershipHeroSectionProps = {
  hero: PartnershipHeroContent;
};

export function PartnershipHeroSection({ hero }: PartnershipHeroSectionProps) {
  return (
    <section className="section-shell section-shell--hero" id={hero.id}>
      <div className="shell-container">
        <RevealGroup>
          <SurfaceCard className="partner-hero-shell" data-reveal="scale" padding="lg" variant="stage">
            <div className="partner-hero-grid">
              <div className="partner-hero-copy">
                <p className="eyebrow text-[var(--color-primary-strong)]" data-reveal>
                  {hero.eyebrow}
                </p>
                <h1 className="hero-title" data-reveal>
                  {hero.title}
                </h1>
                <p className="hero-description" data-reveal>
                  {hero.description}
                </p>

                <div className="hero-pill-row" data-reveal>
                  {hero.highlights.map((item) => (
                    <span className="hero-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="hero-actions" data-reveal>
                  <Button href={hero.primaryCta.href} size="lg">
                    {hero.primaryCta.label}
                  </Button>
                  {hero.secondaryCta ? (
                    <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
                      {hero.secondaryCta.label}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="partner-hero-stage">
                <div className="partner-hero-stage__visual" data-reveal="scale">
                  <MediaSlot className="partner-hero-stage__media" media={hero.media} priority />
                </div>
              </div>
            </div>
          </SurfaceCard>
        </RevealGroup>
      </div>
    </section>
  );
}

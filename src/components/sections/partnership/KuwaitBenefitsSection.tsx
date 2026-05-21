import type { SectionContent } from '@/content/markets/types';

import { SectionShell } from '@/components/layout/SectionShell';
import { RevealGroup } from '@/components/motion/RevealGroup';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SurfaceCard } from '@/components/ui/SurfaceCard';

type KuwaitBenefitsSectionProps = {
  section: SectionContent;
};

export function KuwaitBenefitsSection({ section }: KuwaitBenefitsSectionProps) {
  return (
    <RevealGroup>
      <SectionShell
        className="benefits-section"
        description={section.description}
        eyebrow={section.eyebrow}
        id={section.id}
        title={section.title}
        tone="default"
      >
        <div className="section-card-grid section-card-grid--three benefits-grid">
          {section.cards.map((card, index) => (
            <SurfaceCard
              className="content-card content-card--benefit h-full"
              data-hover={index === 1 ? 'tilt' : 'lift'}
              data-reveal="scale"
              key={card.title}
              variant={index === 1 ? 'stage' : 'accent'}
            >
              {card.media ? (
                <MediaSlot className="content-card__media content-card__media--benefit" media={card.media} showFallbackLabel={false}>
                  <div className="benefits-card__overlay">
                    <div className="benefits-card__meta">
                      {card.eyebrow ? (
                        <span className="content-card__eyebrow">{card.eyebrow}</span>
                      ) : (
                        <span aria-hidden className="benefits-card__spacer" />
                      )}
                      {card.metric ? <span className="content-card__metric">{card.metric}</span> : null}
                    </div>

                    <div className="benefits-card__copy">
                      <h3 className="content-card__title">{card.title}</h3>
                      {card.tags?.length ? (
                        <div className="content-card__tags">
                          {card.tags.map((tag) => (
                            <span className="content-card__tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </MediaSlot>
              ) : null}
            </SurfaceCard>
          ))}
        </div>
      </SectionShell>
    </RevealGroup>
  );
}

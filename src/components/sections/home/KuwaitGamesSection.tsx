import type { SectionContent } from '@/content/markets/types';

import { SectionShell } from '@/components/layout/SectionShell';
import { RevealGroup } from '@/components/motion/RevealGroup';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SurfaceCard } from '@/components/ui/SurfaceCard';

type KuwaitGamesSectionProps = {
  section: SectionContent;
};

export function KuwaitGamesSection({ section }: KuwaitGamesSectionProps) {
  return (
    <RevealGroup>
      <SectionShell
        description={section.description}
        eyebrow={section.eyebrow}
        id={section.id}
        title={section.title}
        tone="default"
      >
        <div className="section-card-grid section-card-grid--three games-discovery-grid">
          {section.cards.map((card) => (
            <SurfaceCard
              className="content-card content-card--game h-full"
              data-hover="lift"
              data-reveal="scale"
              key={card.title}
              variant="media"
            >
              {card.media ? (
                <MediaSlot
                  className="content-card__media content-card__media--game"
                  media={card.media}
                  showFallbackLabel={false}
                >
                  <div className="games-discovery-card__overlay">
                    <div className="games-discovery-card__meta">
                      {card.eyebrow ? (
                        <span className="content-card__eyebrow">{card.eyebrow}</span>
                      ) : (
                        <span aria-hidden className="games-discovery-card__spacer" />
                      )}
                      {card.metric ? <span className="content-card__metric">{card.metric}</span> : null}
                    </div>

                    <div className="games-discovery-card__copy">
                      <h3 className="content-card__title">{card.title}</h3>
                      <p className="content-card__description">{card.description}</p>
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

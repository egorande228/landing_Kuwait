import type { SportsSectionContent } from '@/content/markets/types';

import { SectionShell } from '@/components/layout/SectionShell';
import { RevealGroup } from '@/components/motion/RevealGroup';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SurfaceCard } from '@/components/ui/SurfaceCard';

type KuwaitSportsSectionProps = {
  section: SportsSectionContent;
};

export function KuwaitSportsSection({ section }: KuwaitSportsSectionProps) {
  return (
    <RevealGroup>
      <SectionShell
        description={section.description}
        eyebrow={section.eyebrow}
        id={section.id}
        title={section.title}
        tone="emphasis"
      >
        <div className="sports-pill-row" data-reveal>
          {section.pills.map((pill) => (
            <span className="sports-pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>

        <div className="sports-grid">
          <SurfaceCard className="sports-football-card" data-hover="tilt" data-reveal="scale" variant="media">
            {section.lead.media ? (
              <MediaSlot
                className="sports-football-card__media"
                media={{ ...section.lead.media, fit: 'contain', objectPosition: 'center' }}
                showFallbackLabel={false}
              />
            ) : (
              <div aria-hidden className="sports-football-card__media sports-football-card__media--empty" />
            )}
            <div className="sports-football-card__body">
              {section.lead.eyebrow ? <span className="content-card__eyebrow">{section.lead.eyebrow}</span> : null}
              <h3 className="content-card__title">{section.lead.title}</h3>
              <p className="content-card__description">{section.lead.description}</p>
            </div>
          </SurfaceCard>

          <div className="sports-detail-grid">
            {section.cards.map((card) => (
              <SurfaceCard className="sports-detail-card" data-hover="lift" data-reveal="scale" key={card.title} variant="media">
                <div className="sports-detail-card__layout">
                  <div className="sports-detail-card__thumb">
                    {card.media ? (
                      <MediaSlot
                        className="sports-detail-card__thumb-media"
                        media={{ ...card.media, fit: 'contain', objectPosition: 'center' }}
                        showFallbackLabel={false}
                      />
                    ) : (
                      <div aria-hidden className="sports-detail-card__thumb-placeholder" />
                    )}
                  </div>

                  <div className="sports-detail-card__content">
                    {card.eyebrow ? <span className="content-card__eyebrow">{card.eyebrow}</span> : null}
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
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SectionShell>
    </RevealGroup>
  );
}

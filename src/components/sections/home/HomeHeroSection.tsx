import type { HomeHeroContent } from '@/content/markets/types';

import { RevealGroup } from '@/components/motion/RevealGroup';
import { MediaSlot } from '@/components/media/MediaSlot';
import { Button } from '@/components/ui/Button';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { kuwaitLinks } from '@/content/markets/kuwait';

type HomeHeroSectionProps = {
  hero: HomeHeroContent;
};

export function HomeHeroSection({ hero }: HomeHeroSectionProps) {
  return (
    <section className="section-shell section-shell--hero" id={hero.id}>
      <div className="shell-container">
        <RevealGroup>
          <SurfaceCard className="hero-shell" data-reveal="scale" padding="lg" variant="stage">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-copy__lead">
                  <p className="eyebrow text-[var(--color-primary-strong)]" data-reveal>
                    {hero.eyebrow}
                  </p>
                  <h1 className="hero-title" data-reveal>
                    {hero.title}
                  </h1>
                  <p className="hero-description" data-reveal>
                    {hero.description}
                  </p>
                </div>

                <div className="hero-pill-row" data-reveal>
                  {hero.highlights.slice(0, 4).map((item) => (
                    <span className="hero-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="hero-actions" data-reveal>
                  <Button href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                  </Button>
                  {hero.secondaryCta ? (
                    <Button href={hero.secondaryCta.href} variant="secondary">
                      {hero.secondaryCta.label}
                    </Button>
                  ) : null}
                </div>

                <div
                  className="w-full max-w-[360px] rounded-[18px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur"
                  data-reveal
                >
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                    For partnership contact
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={kuwaitLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] px-4 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                    >
                      Telegram
                    </a>
                    <a
                      href={kuwaitLinks.mail}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] px-4 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                    >
                      Mail
                    </a>
                  </div>
                </div>

                <div className="hero-stat-grid" data-reveal="scale">
                  {hero.stats.map((stat) => (
                    <div className="hero-stat-card" key={stat.label}>
                      <span className="hero-stat-card__value" dir="ltr">
                        {stat.value}
                      </span>
                      <span className="hero-stat-card__label">{stat.label}</span>
                      {stat.note ? <span className="hero-stat-card__note">{stat.note}</span> : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-stage-stack">
                <div className="hero-stage-card" data-reveal="scale">
                  <MediaSlot className="hero-stage-card__media" media={hero.media} priority>
                    <div className="hero-stage-card__content">
                      <div className="hero-stage-card__body">
                        <h2 className="hero-stage-card__title">{hero.stage.title}</h2>
                        <p className="hero-stage-card__description">{hero.stage.description}</p>
                      </div>

                      <div className="hero-stage-card__pills">
                        {hero.stage.pills.map((pill) => (
                          <span className="hero-stage-card__pill" key={pill}>
                            {pill}
                          </span>
                        ))}
                      </div>

                      <div className="hero-stage-card__quick-grid">
                        {hero.stage.quickStats.map((item) => (
                          <div className="hero-stage-card__quick-card" key={item.label}>
                            <span dir="ltr">{item.value}</span>
                            <small>{item.label}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MediaSlot>
                </div>

                {hero.quickCards.length ? (
                  <div className="hero-feature-panel" data-reveal="scale">
                    <div className="hero-feature-grid">
                      {hero.quickCards.map((card) => (
                        <div className="hero-feature-card" key={card.title}>
                          <p className="hero-feature-card__eyebrow">{card.eyebrow}</p>
                          <div className="hero-feature-card__row">
                            <h3>{card.title}</h3>
                            <span>{card.metric}</span>
                          </div>
                          <p>{card.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </SurfaceCard>
        </RevealGroup>
      </div>
    </section>
  );
}

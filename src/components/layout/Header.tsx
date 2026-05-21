'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { LinkAction, NavLink } from '@/content/markets/types';
import type { Locale } from '@/lib/i18n';

import { KuwaitLogo } from '@/components/brand/KuwaitLogo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { joinClasses } from '@/lib/classes';

type HeaderMenuRoute = '/' | '/partnership' | '/faq';

type HeaderNavItem = NavLink & {
  children: NavLink[];
};

type HeaderProps = {
  brand: {
    name: string;
    tag: string;
  };
  globalLinks: NavLink[];
  sectionMenus: Record<HeaderMenuRoute, NavLink[]>;
  locale: Locale;
  pathname: string;
  ui: {
    languageLabel: string;
  };
  cta: LinkAction;
};

const globalNavOrder: Record<string, number> = {
  '/': 0,
  '/partnership': 1,
  '/faq': 2,
};

function normalizePath(href: string) {
  const [withoutHash] = href.split('#');
  const [withoutQuery] = withoutHash.split('?');

  return withoutQuery || '/';
}

function isRouteActive(pathname: string, href: string) {
  const route = normalizePath(href);

  if (route === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(route);
}

function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:');
}

function getHeaderMenuRoute(href: string): HeaderMenuRoute | null {
  const route = normalizePath(href);

  if (route === '/' || route === '/partnership' || route === '/faq') {
    return route;
  }

  return null;
}

function hasActiveChild(children: NavLink[], pathname: string) {
  return children.some((child) => isRouteActive(pathname, child.href));
}

export function Header({ brand, globalLinks, sectionMenus, locale, pathname, ui, cta }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const orderedGlobalLinks = [...globalLinks].sort(
    (left, right) => (globalNavOrder[left.href] ?? Number.MAX_SAFE_INTEGER) - (globalNavOrder[right.href] ?? Number.MAX_SAFE_INTEGER),
  );
  const menuItems: HeaderNavItem[] = orderedGlobalLinks.map((link) => {
    const route = getHeaderMenuRoute(link.href);

    return {
      ...link,
      children: route ? sectionMenus[route] : [],
    };
  });

  useEffect(() => {
    setMenuOpen(false);
    setMobileSubmenu(null);
  }, [locale, pathname]);

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
      setMobileSubmenu(null);
    };

    window.addEventListener('hashchange', closeMenu);
    window.addEventListener('resize', closeMenu);

    return () => {
      window.removeEventListener('hashchange', closeMenu);
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <header className="header-shell" dir={direction}>
      <div className="shell-container">
        <div className="header-stack">
          <div className="header-panel">
            <div className="header-main">
              <Link aria-label={brand.name} className="header-brand" href="/">
                <KuwaitLogo decorative size="nav" />
              </Link>

              <nav aria-label="Primary navigation" className="header-nav header-nav--desktop">
                {menuItems.map((item) => {
                  const active = isRouteActive(pathname, item.href) || hasActiveChild(item.children, pathname);

                  if (!item.children.length) {
                    return (
                      <Link
                        className="nav-pill nav-pill--primary"
                        data-active={active ? 'true' : 'false'}
                        href={item.href}
                        key={item.href}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <div className="header-nav-group" key={item.href}>
                      <Link
                        className="nav-pill nav-pill--primary"
                        data-active={active ? 'true' : 'false'}
                        href={item.href}
                      >
                        <span className="header-nav__content">
                          <span>{item.label}</span>
                          <span aria-hidden="true" className="header-nav__caret" />
                        </span>
                      </Link>

                      <div className="header-dropdown">
                        <div className="header-dropdown__panel">
                          {item.children.map((child) => (
                            <Link className="header-dropdown__link" href={child.href} key={child.href}>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="header-actions">
                <LanguageSwitcher label={ui.languageLabel} locale={locale} />
                <a
                  className="btn-base btn-primary btn-md header-cta"
                  href={cta.href}
                  rel={cta.external || isExternalLink(cta.href) ? 'noreferrer' : undefined}
                  target={cta.external || isExternalLink(cta.href) ? '_blank' : undefined}
                >
                  <span className="btn-base__label">{cta.label}</span>
                </a>
              </div>

              <button
                aria-expanded={menuOpen}
                aria-label={locale === 'ar' ? 'فتح القائمة' : 'Open menu'}
                className={joinClasses('header-toggle', menuOpen && 'header-toggle--open')}
                onClick={() => {
                  setMenuOpen((current) => !current);
                }}
                type="button"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="header-mobile">
              <div className="header-mobile__panel">
                <nav className="header-mobile__group">
                  {menuItems.map((item) => {
                    const active = isRouteActive(pathname, item.href) || hasActiveChild(item.children, pathname);
                    const itemOpen = mobileSubmenu === item.href;

                    if (!item.children.length) {
                      return (
                        <Link
                          className="header-mobile__link"
                          data-active={active ? 'true' : 'false'}
                          href={item.href}
                          key={item.href}
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      );
                    }

                    return (
                      <div className="header-mobile__item" key={item.href}>
                        <div className="header-mobile__row">
                          <Link
                            className="header-mobile__link"
                            data-active={active ? 'true' : 'false'}
                            href={item.href}
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                          <button
                            aria-expanded={itemOpen}
                            aria-label={locale === 'ar' ? `افتح أقسام ${item.label}` : `Open ${item.label} sections`}
                            className={joinClasses('header-mobile__toggle', itemOpen && 'header-mobile__toggle--open')}
                            onClick={() => {
                              setMobileSubmenu((current) => (current === item.href ? null : item.href));
                            }}
                            type="button"
                          >
                            <span aria-hidden="true" className="header-nav__caret" />
                          </button>
                        </div>

                        {itemOpen ? (
                          <div className="header-mobile__submenu">
                            {item.children.map((child) => (
                              <Link
                                className="header-mobile__sublink"
                                href={child.href}
                                key={child.href}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileSubmenu(null);
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </nav>

                <div className="header-mobile__meta">
                  <LanguageSwitcher label={ui.languageLabel} locale={locale} variant="menu" />
                  <a
                    className="btn-base btn-primary btn-md"
                    href={cta.href}
                    rel={cta.external || isExternalLink(cta.href) ? 'noreferrer' : undefined}
                    target={cta.external || isExternalLink(cta.href) ? '_blank' : undefined}
                  >
                    <span className="btn-base__label">{cta.label}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

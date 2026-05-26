import type { Locale } from '@/lib/i18n';

export function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function localizeHref(href: string, locale: Locale) {
  if (isExternalHref(href) || !href.startsWith('/')) {
    return href;
  }

  const normalizedHref = href.startsWith('/en') ? href.slice(3) || '/' : href;

  if (locale === 'en') {
    return normalizedHref === '/' ? '/en' : `/en${normalizedHref}`;
  }

  return normalizedHref;
}

export function getLocaleSwitchHref(pathname: string, locale: Locale) {
  const normalizedPathname = pathname.startsWith('/en') ? pathname.slice(3) || '/' : pathname || '/';

  if (locale === 'en') {
    return normalizedPathname === '/' ? '/en' : `/en${normalizedPathname}`;
  }

  return normalizedPathname;
}

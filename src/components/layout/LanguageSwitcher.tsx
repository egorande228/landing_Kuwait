'use client';

import { usePathname } from 'next/navigation';

import { joinClasses } from '@/lib/classes';
import { type Locale } from '@/lib/i18n';
import { getLocaleSwitchHref } from '@/lib/localized-href';

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  variant?: 'default' | 'menu';
};

const languageOptions: Array<{ code: Locale; shortLabel: string }> = [
  { code: 'ar', shortLabel: 'AR' },
  { code: 'en', shortLabel: 'EN' },
];

export function LanguageSwitcher({ locale, label, variant = 'default' }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div
      aria-label={label}
      className={joinClasses('locale-switcher', variant === 'menu' && 'locale-switcher--menu')}
      role="group"
    >
      {languageOptions.map((option) => (
        <a
          aria-current={locale === option.code ? 'page' : undefined}
          className={joinClasses('locale-switcher__button', locale === option.code && 'is-active')}
          href={getLocaleSwitchHref(pathname, option.code)}
          key={option.code}
        >
          {option.shortLabel}
        </a>
      ))}
    </div>
  );
}

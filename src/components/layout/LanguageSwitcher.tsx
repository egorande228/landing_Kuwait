'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { joinClasses } from '@/lib/classes';
import { type Locale } from '@/lib/i18n';

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      aria-label={label}
      className={joinClasses('locale-switcher', variant === 'menu' && 'locale-switcher--menu')}
      role="group"
    >
      {languageOptions.map((option) => (
        <button
          className={joinClasses('locale-switcher__button', locale === option.code && 'is-active')}
          disabled={isPending || locale === option.code}
          key={option.code}
          onClick={() => {
            handleSelect(option.code);
          }}
          type="button"
        >
          {option.shortLabel}
        </button>
      ))}
    </div>
  );
}

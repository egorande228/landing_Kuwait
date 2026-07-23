'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { joinClasses } from '@/lib/classes';
import { localizeHref } from '@/lib/localized-href';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
}: ButtonProps) {
  const isReferralLink = href.startsWith('/api/go/');
  const isExternal = external || /^(https?:|mailto:|tel:)/.test(href) || isReferralLink;
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ar';
  const resolvedHref = localizeHref(href, locale);

  return (
    <a
      className={joinClasses(
        'btn-base',
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'ghost' && 'btn-ghost',
        size === 'md' && 'btn-md',
        size === 'lg' && 'btn-lg',
        className,
      )}
      href={resolvedHref}
      rel={isReferralLink ? 'sponsored nofollow noopener' : isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      <span className="btn-base__label">{children}</span>
    </a>
  );
}

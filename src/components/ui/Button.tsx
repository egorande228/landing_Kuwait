import type { ReactNode } from 'react';

import { joinClasses } from '@/lib/classes';

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
  const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);

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
      href={href}
      rel={isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      <span className="btn-base__label">{children}</span>
    </a>
  );
}

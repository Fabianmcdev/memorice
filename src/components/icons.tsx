import { ReactNode } from 'react';

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

// Decorative stroke icon; color follows `currentColor`, so set it via a text-* class.
const Icon = ({ size = 18, strokeWidth = 2.2, className, children }: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {children}
  </svg>
);

export const RestartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Icon>
);

export const LogoutIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);

export const TurnsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V10a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </Icon>
);

export const MissIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </Icon>
);

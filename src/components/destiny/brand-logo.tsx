import type { SVGProps } from "react";

export function D2Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 64 64" {...props}>
      <path
        d="M32 5 46 13 55 29 50 48 32 59 14 48 9 29 18 13 32 5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20 20 32 12 44 20 40 42 32 50 24 42 20 20Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M24 27 32 22 40 27 37 35H27l-3-8Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M25 35h14M28 42h8M32 22v28M17 31h10M37 31h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M28 31h8"
        stroke="var(--d2-logo-visor, #63d7ff)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function D2BrandLockup() {
  return (
    <div className="d2-brand-lockup">
      <D2Mark className="d2-brand-mark" />
      <div>
        <strong>D2 Build Planner</strong>
        <small>Build. Optimize. Conquer.</small>
      </div>
    </div>
  );
}

import Image from "next/image";

export function D2Mark({ className }: { className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={className}
      height={101}
      priority
      src="/brand/d2-logo-c.png"
      width={96}
    />
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

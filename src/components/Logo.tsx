export function Logo({ size = 56 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2" aria-label="Quali Move">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="var(--ink)" />
        <path d="M20 44 L32 18 L44 44 Z" fill="var(--brand-green)" />
        <circle cx="32" cy="28" r="3.5" fill="var(--cream)" />
        <path d="M28 32 h8 v9 a4 4 0 0 1 -8 0 z" fill="var(--cream)" />
      </svg>
      <span className="font-bold text-xl tracking-tight">
        QUALI<span className="text-brand-green">MOVE</span>
      </span>
    </div>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="Quali Move">
      <circle cx="32" cy="32" r="30" fill="var(--ink)" />
      <path d="M20 44 L32 18 L44 44 Z" fill="var(--brand-green)" />
    </svg>
  );
}

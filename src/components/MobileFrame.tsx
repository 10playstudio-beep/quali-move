import type { ReactNode } from "react";

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-secondary flex justify-center">
      <div className="relative w-full max-w-[440px] min-h-screen bg-background shadow-xl flex flex-col">
        {children}
      </div>
    </div>
  );
}

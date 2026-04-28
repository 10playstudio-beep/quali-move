import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/loading")({
  head: () => ({
    meta: [{ title: "Chargement — Quali Move" }],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [p, setP] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setP((v) => {
        if (v >= 100) {
          clearInterval(i);
          navigate({ to: "/" });
          return 100;
        }
        return v + 4;
      });
    }, 60);
    return () => clearInterval(i);
  }, [navigate]);

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <Logo size={80} />
        <p className="mt-6 text-base font-medium text-foreground/80 text-center">
          La ville est votre salle de sport.
        </p>
        <div className="mt-12 w-48 h-[2px] bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-green transition-[width] duration-150 ease-out"
            style={{ width: `${p}%` }}
          />
        </div>
      </div>
    </MobileFrame>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Paramètres — Quali Move" },
      { name: "description", content: "Réglages du compte Quali Move." },
    ],
  }),
  component: Page,
});

const items = [
  { label: "Modifier le pseudo" },
  { label: "Niveau par défaut" },
  { label: "Données personnelles", accent: true },
  { label: "Langue" },
  { label: "À propos" },
];

function Page() {
  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-10">
        <header className="px-5 pt-6 pb-2 flex items-center gap-3">
          <Link
            to="/account"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-bold">Paramètres</h1>
        </header>

        <ul className="px-5 pt-4 space-y-2">
          {items.map((it) => (
            <li key={it.label}>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-2xl bg-card border border-border px-4 py-4"
              >
                <span
                  className={`text-sm font-medium ${
                    it.accent ? "text-brand-blue" : "text-foreground"
                  }`}
                >
                  {it.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>

        <div className="px-5 pt-10">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-full bg-brand-red text-white font-medium py-3.5 text-sm"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

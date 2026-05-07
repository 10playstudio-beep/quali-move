import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Lock, UserRound, LogIn, Sparkles } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Mon compte — Quali Move" },
      {
        name: "description",
        content: "Connectez-vous pour suivre votre progression et débloquer vos badges.",
      },
    ],
  }),
  component: Page,
});

const teaserSessions = [
  { date: "Aujourd'hui", name: "Chaise Romaine — Sportif", points: 30 },
  { date: "Hier", name: "Barres de traction — Actif", points: 25 },
  { date: "23 avril", name: "Anneaux — Cool", points: 20 },
];

function Page() {
  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <header className="px-5 pt-6 pb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Mon profil
          </p>
          <button
            type="button"
            disabled
            aria-label="Paramètres (indisponible)"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground/60 cursor-not-allowed"
          >
            <Settings className="h-4 w-4" />
          </button>
        </header>

        {/* Hero — Guest identity (220px) */}
        <section className="px-5 pt-4 flex flex-col items-center text-center min-h-[220px]">
          <div
            className="h-28 w-28 rounded-full flex items-center justify-center border-4 border-card shadow-lg"
            style={{ backgroundColor: "color-mix(in oklab, var(--brand-green-soft) 25%, var(--secondary))" }}
          >
            <UserRound className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
          </div>

          <Link
            to="/loading"
            className="mt-4 text-2xl font-bold text-brand-blue underline-offset-4 hover:underline"
          >
            Se connecter / S'inscrire
          </Link>

          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 border border-border">
            <span className="h-4 w-4 rounded-full bg-muted text-[10px] font-bold flex items-center justify-center text-muted-foreground">
              ?
            </span>
            <span className="text-xs font-medium text-muted-foreground">Utilisateur invité</span>
          </div>
        </section>

        {/* Conversion CTA Card */}
        <section className="px-5 pt-6">
          <div className="rounded-3xl bg-brand-blue text-white p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold leading-tight">
                  Débloquez votre potentiel
                </h2>
                <p className="text-xs font-medium text-white/85 mt-1 leading-snug">
                  Suivez vos séances, gagnez des points et grimpez au classement.
                </p>
              </div>
            </div>
            <Link
              to="/loading"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-blue font-bold text-sm py-3"
            >
              <LogIn className="h-4 w-4" />
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* Locked: Progression */}
        <section className="px-5 pt-8">
          <h2 className="text-base font-medium mb-3">Votre progression</h2>
          <div className="relative">
            <ul className="space-y-2 opacity-40 pointer-events-none select-none blur-[1.5px]">
              {teaserSessions.map((s, i) => (
                <li
                  key={i}
                  className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">{s.date}</p>
                    <p className="text-sm font-bold">{s.name}</p>
                  </div>
                  <span className="rounded-full bg-brand-green-soft/60 px-3 py-1 text-xs font-bold">
                    +{s.points}
                  </span>
                </li>
              ))}
            </ul>

            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to="/loading"
                className="rounded-full bg-card border border-border shadow-md px-4 py-2 text-xs font-medium flex items-center gap-2"
              >
                <Lock className="h-3.5 w-3.5 text-brand-yellow" />
                Connectez-vous pour enregistrer vos séances
              </Link>
            </div>
          </div>
        </section>

        {/* Locked: Badges */}
        <section className="px-5 pt-8">
          <h2 className="text-base font-medium mb-3">Vos succès</h2>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center bg-transparent"
              >
                <Lock className="h-6 w-6 text-brand-yellow" />
                <p className="text-[10px] font-medium text-muted-foreground mt-1.5">Verrouillé</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Réalisez vos premières séances pour débloquer vos badges.
          </p>
        </section>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

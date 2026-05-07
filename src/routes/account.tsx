import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Trophy, Calendar } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Mon compte — Quali Move" },
      { name: "description", content: "Profil, progression, badges et historique des séances." },
    ],
  }),
  component: Page,
});

const sessions = [
  { date: "Aujourd'hui", name: "Chaise Romaine — Sportif", points: 30 },
  { date: "Hier", name: "Barres de traction — Actif", points: 25 },
  { date: "23 avril", name: "Anneaux — Cool", points: 20 },
];

const badges = [
  { id: 1, label: "1ère séance", emoji: "🏁" },
  { id: 2, label: "7 jours", emoji: "🔥" },
  { id: 3, label: "5 agrès", emoji: "🎯" },
  { id: 4, label: "Niv.10", emoji: "⭐" },
  { id: 5, label: "?", emoji: "🔒" },
  { id: 6, label: "?", emoji: "🔒" },
];

function Page() {
  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-24">
        <header className="px-5 pt-6 pb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Mon profil
          </p>
          <Link
            to="/settings"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center"
            aria-label="Paramètres"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </header>

        <section className="px-5 pt-4 flex flex-col items-center text-center">
          <div className="h-28 w-28 rounded-full bg-brand-blue text-white flex items-center justify-center text-4xl font-bold border-4 border-card shadow-lg">
            L
          </div>
          <h1 className="mt-4 text-2xl font-bold">@lucas_qm</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft/60 px-3 py-1">
            <span className="text-base">🏆</span>
            <span className="text-xs font-bold">Sportif — Niveau 12</span>
          </div>
        </section>

        <section className="px-5 pt-6 grid grid-cols-3 gap-3">
          <KPI label="Séances" value="24" />
          <KPI label="Points" value="2410" />
          <KPI label="Badges" value="4" />
        </section>

        <section className="px-5 pt-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-brand-yellow" />
            <h2 className="text-base font-bold">Galerie des badges</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className="aspect-square rounded-full bg-card border border-border flex flex-col items-center justify-center"
              >
                <div className="text-2xl">{b.emoji}</div>
                <p className="text-[10px] font-medium text-muted-foreground mt-1">{b.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pt-8">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-brand-blue" />
            <h2 className="text-base font-bold">Journal des entraînements</h2>
          </div>
          <ul className="space-y-2">
            {sessions.map((s, i) => (
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
        </section>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3 text-center">
      <p className="text-xl font-bold leading-none">{value}</p>
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

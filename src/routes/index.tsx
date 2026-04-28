import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Trophy, Flame } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";
import { LogoMark } from "@/components/Logo";
import { CircularProgress } from "@/components/CircularProgress";
import { equipements } from "@/data/equipements";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Accueil — Quali Move" },
      { name: "description", content: "Tableau de bord, progression et défis du jour." },
    ],
  }),
  component: Home,
});

function Home() {
  const champions = [
    { rank: 1, name: "Sarah", points: 2840 },
    { rank: 2, name: "Karim", points: 2615 },
    { rank: 3, name: "Lucas", points: 2410 },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-6 pb-4">
          <LogoMark size={40} />
          <button
            type="button"
            className="relative h-11 w-11 rounded-full bg-card border border-border flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-brand-blue" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-brand-red" />
          </button>
        </header>

        {/* Greeting */}
        <section className="px-5 pt-2 pb-6">
          <p className="text-sm font-medium text-muted-foreground">Bonjour,</p>
          <h1 className="text-3xl font-bold tracking-tight">Lucas 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Prêt pour ta séance d'aujourd'hui ?
          </p>
        </section>

        {/* Progress card */}
        <section className="px-5">
          <div className="rounded-3xl bg-card border border-border p-5 flex items-center gap-5">
            <CircularProgress value={68} size={110} stroke={10}>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Niveau
                </div>
              </div>
            </CircularProgress>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft/60 px-2.5 py-1">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">Sportif</span>
              </div>
              <p className="mt-2 text-2xl font-bold leading-none">2 410 pts</p>
              <p className="mt-1 text-xs text-muted-foreground">+180 cette semaine</p>
            </div>
          </div>
        </section>

        {/* Horizontal gallery */}
        <section className="pt-8">
          <div className="px-5 flex items-end justify-between mb-3">
            <h2 className="text-lg font-bold">Les agrès du parc</h2>
            <Link to="/equipements" className="text-xs font-medium text-brand-blue">
              Voir plus
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {equipements.slice(0, 5).map((eq) => (
              <Link
                key={eq.id}
                to="/equipements/$id"
                params={{ id: eq.id }}
                className="snap-start shrink-0 w-36 rounded-3xl bg-card border border-border p-4 flex flex-col items-center text-center"
              >
                <div className="h-20 w-20 rounded-full bg-brand-blue-soft/30 flex items-center justify-center text-3xl">
                  {eq.emoji}
                </div>
                <p className="mt-3 text-sm font-bold leading-tight">{eq.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">4 niveaux</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Coach */}
        <section className="px-5 pt-8">
          <div className="rounded-3xl bg-brand-blue/10 border border-brand-blue/20 p-5 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-brand-blue text-white flex items-center justify-center text-2xl font-bold shrink-0">
              C
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                Conseil du coach
              </p>
              <p className="mt-1 text-sm font-medium leading-snug">
                Échauffe-toi 5 minutes avant chaque séance pour éviter les blessures.
              </p>
            </div>
          </div>
        </section>

        {/* Wall of Champions */}
        <section className="px-5 pt-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-brand-yellow" />
            <h2 className="text-lg font-bold">Mur des Champions</h2>
          </div>
          <div className="rounded-3xl bg-card border border-border p-5">
            <p className="text-xs font-medium text-muted-foreground mb-4">Top 3 — Parc Quali-Cité</p>
            <div className="flex items-end justify-around gap-2 h-32">
              {/* 2nd */}
              <PodiumStep rank={2} name={champions[1].name} points={champions[1].points} height="h-20" tone="bg-brand-blue-soft/50" />
              {/* 1st */}
              <PodiumStep rank={1} name={champions[0].name} points={champions[0].points} height="h-28" tone="bg-brand-yellow" big />
              {/* 3rd */}
              <PodiumStep rank={3} name={champions[2].name} points={champions[2].points} height="h-14" tone="bg-brand-red-soft/40" />
            </div>
          </div>
        </section>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

function PodiumStep({
  rank,
  name,
  points,
  height,
  tone,
  big = false,
}: {
  rank: number;
  name: string;
  points: number;
  height: string;
  tone: string;
  big?: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className={`h-10 w-10 rounded-full bg-card border-2 ${big ? "border-brand-yellow" : "border-border"} flex items-center justify-center font-bold text-sm`}>
        {name[0]}
      </div>
      <p className="mt-1 text-xs font-bold leading-none">{name}</p>
      <p className="text-[10px] text-muted-foreground">{points}pts</p>
      <div className={`mt-2 w-full ${height} ${tone} rounded-t-2xl flex items-start justify-center pt-2 font-bold ${big ? "text-2xl" : "text-lg"}`}>
        {rank}
      </div>
    </div>
  );
}

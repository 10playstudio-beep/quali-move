import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Trophy, Calendar, UserRound, Lock, LogIn, HelpCircle } from "lucide-react";
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
  // No auth wired yet — default to guest. Tiny dev toggle to preview connected state.
  const [isGuest, setIsGuest] = useState(true);

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-24">
        {isGuest ? <GuestView /> : <ConnectedView />}

        <div className="px-5 pt-6">
          <button
            onClick={() => setIsGuest((v) => !v)}
            className="w-full text-[10px] uppercase tracking-widest text-muted-foreground/70 py-2"
          >
            {isGuest ? "Aperçu : voir l'état connecté" : "Aperçu : voir l'état invité"}
          </button>
        </div>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

/* ---------------- GUEST ---------------- */

function GuestView() {
  return (
    <>
      <header className="px-5 pt-6 pb-2 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Mon profil
        </p>
        <button
          aria-label="Aide"
          className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </header>

      {/* Hero identité */}
      <section className="px-5 pt-4 flex flex-col items-center text-center">
        <div
          className="h-[140px] w-[140px] rounded-full flex items-center justify-center border-4 border-card shadow-sm"
          style={{ backgroundColor: "color-mix(in oklab, var(--brand-green-soft) 25%, var(--secondary))" }}
        >
          <UserRound className="h-14 w-14 text-muted-foreground" strokeWidth={1.5} />
        </div>

        <button className="mt-5 text-2xl font-bold text-brand-blue underline-offset-4 hover:underline">
          Se connecter / S'inscrire
        </button>

        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted-foreground/20 text-[10px] font-bold text-muted-foreground">
            ?
          </span>
          <span className="text-xs font-medium text-muted-foreground">Utilisateur invité</span>
        </div>
      </section>

      {/* Card CTA conversion */}
      <section className="px-5 pt-6">
        <div className="rounded-3xl bg-brand-blue text-white p-5 shadow-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">
            Rejoignez Quali Move
          </p>
          <h2 className="mt-1 text-lg font-bold leading-snug">
            Suivez votre progression, débloquez des badges et grimpez le podium.
          </h2>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-brand-blue font-bold text-sm px-5 py-2.5">
            <LogIn className="h-4 w-4" />
            Créer mon compte
          </button>
        </div>
      </section>

      {/* Progression verrouillée */}
      <section className="px-5 pt-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-brand-blue" />
          <h2 className="text-base font-bold">Votre progression</h2>
        </div>
        <div className="relative">
          <ul className="space-y-2 opacity-40 blur-[2px] pointer-events-none select-none">
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-card border border-border shadow-sm px-4 py-2 text-xs font-medium text-foreground">
              Connectez-vous pour enregistrer vos séances
            </div>
          </div>
        </div>
      </section>

      {/* Badges verrouillés */}
      <section className="px-5 pt-8">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-brand-yellow" />
          <h2 className="text-base font-bold">Vos succès</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-full border-2 border-dashed border-border flex items-center justify-center"
            >
              <Lock className="h-6 w-6 text-brand-yellow" strokeWidth={2.25} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Débloquez vos premiers badges dès la 1ʳᵉ séance enregistrée.
        </p>
      </section>
    </>
  );
}

/* ---------------- CONNECTED (existing) ---------------- */

function ConnectedView() {
  return (
    <>
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
    </>
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

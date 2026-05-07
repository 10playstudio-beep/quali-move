import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Sparkles } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { getEquipement } from "@/data/equipements";

export const Route = createFileRoute("/equipements/$id/")({
  loader: ({ params }) => {
    const eq = getEquipement(params.id);
    if (!eq) throw notFound();
    return { equipement: eq };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.equipement.name ?? "Agrès"} — Quali Move` },
      { name: "description", content: loaderData?.equipement.description ?? "" },
    ],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <MobileFrame>
        <div className="p-6 flex flex-col items-center justify-center flex-1 gap-3 text-center">
          <p className="text-sm">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium"
          >
            Réessayer
          </button>
        </div>
      </MobileFrame>
    );
  },
  notFoundComponent: () => (
    <MobileFrame>
      <div className="p-6 flex flex-col items-center justify-center flex-1 gap-3 text-center">
        <h1 className="text-2xl font-bold">Agrès introuvable</h1>
        <Link to="/equipements" className="text-brand-blue font-medium text-sm">
          Retour au parc
        </Link>
      </div>
    </MobileFrame>
  ),
  component: Page,
});

const tones: Record<string, { ring: string; bg: string }> = {
  cool: { ring: "border-brand-blue-soft", bg: "bg-brand-blue-soft/15" },
  actif: { ring: "border-brand-green-soft", bg: "bg-brand-green-soft/15" },
  sportif: { ring: "border-brand-yellow-soft", bg: "bg-brand-yellow-soft/25" },
  athlete: { ring: "border-brand-red-soft", bg: "bg-brand-red-soft/15" },
};

function Page() {
  const { equipement } = Route.useLoaderData();
  const isLoggedIn = false;

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-10">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link
            to="/equipements"
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Fiche agrès
          </p>
        </header>

        <div className="px-5">
          <div className="aspect-[4/3] rounded-3xl bg-brand-blue-soft/25 flex items-center justify-center text-8xl">
            {equipement.emoji}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight">{equipement.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {equipement.description}
          </p>
        </div>

        {!isLoggedIn && (
          <div className="mx-5 mt-6 rounded-2xl bg-brand-yellow/40 border border-brand-yellow p-4 flex items-start gap-3">
            <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="text-xs font-medium leading-snug">
              Crée ton compte pour suivre ta progression et débloquer les badges.
            </p>
          </div>
        )}

        <section className="px-5 pt-6">
          <h2 className="text-lg font-bold mb-3">Choisis ton niveau</h2>
          <div className="space-y-3">
            {equipement.levels.map((lvl) => {
              const t = tones[lvl.id];
              return (
                <Link
                  key={lvl.id}
                  to="/equipements/$id/$levelId"
                  params={{ id: equipement.id, levelId: lvl.id }}
                  className={`block rounded-2xl border ${t.ring} ${t.bg} p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Niveau {lvl.num}
                      </p>
                      <p className="text-base font-bold">{lvl.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{lvl.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold leading-none">{lvl.duration}s</p>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                        de maintien
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-5 pt-8">
          <div className="rounded-3xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-brand-blue" />
              <h3 className="text-sm font-bold">Tes statistiques</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Séances" value="0" />
              <Stat label="Temps total" value="0min" />
              <Stat label="Record" value="—" />
            </div>
          </div>
        </section>
      </div>
    </MobileFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

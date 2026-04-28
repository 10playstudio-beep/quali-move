import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Layers } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { TabBar } from "@/components/TabBar";
import { equipements } from "@/data/equipements";
import { useMemo, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  structure: z.string().optional(),
});

export const Route = createFileRoute("/equipements/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Équipements — Quali Move" },
      { name: "description", content: "Le parc complet de Street Workout : tous les agrès Quali-Cité." },
    ],
  }),
  component: Page,
});

function Page() {
  const { structure } = Route.useSearch();
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    return equipements.filter(
      (e) =>
        (!structure || e.structure === structure) &&
        e.name.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q, structure]);

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-24">
        <header className="px-5 pt-8 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">Catalogue</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Le Parc de Street Workout</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choisis un agrès pour démarrer ta séance.
          </p>
        </header>

        <div className="px-5">
          <div className="flex items-center gap-3 rounded-full bg-card border border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Chercher un agrès..."
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <section className="px-5 pt-6 grid grid-cols-2 gap-3">
          {items.map((eq) => (
            <Link
              key={eq.id}
              to="/equipements/$id"
              params={{ id: eq.id }}
              className="rounded-3xl bg-card border border-border p-4 flex flex-col"
            >
              <div className="aspect-square rounded-2xl bg-brand-blue-soft/25 flex items-center justify-center text-5xl">
                {eq.emoji}
              </div>
              <p className="mt-3 text-sm font-bold leading-tight">{eq.name}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-brand-blue font-medium">
                <Layers className="h-3 w-3" />
                {eq.levels.length} niveaux
              </div>
            </Link>
          ))}
          {items.length === 0 && (
            <p className="col-span-2 text-center text-sm text-muted-foreground py-8">
              Aucun agrès trouvé.
            </p>
          )}
        </section>
      </div>
      <TabBar />
    </MobileFrame>
  );
}

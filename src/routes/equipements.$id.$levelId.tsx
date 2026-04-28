import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Check } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { CircularProgress } from "@/components/CircularProgress";
import { getEquipement, getLevel } from "@/data/equipements";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/equipements/$id/$levelId")({
  loader: ({ params }) => {
    const eq = getEquipement(params.id);
    if (!eq) throw notFound();
    const level = getLevel(eq, params.levelId);
    if (!level) throw notFound();
    return { equipement: eq, level };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.equipement.name} — ${loaderData.level.label} — Quali Move`,
            },
            { name: "description", content: loaderData.level.description },
          ],
        }
      : { meta: [] },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <MobileFrame>
        <div className="p-6 text-center flex-1 flex flex-col justify-center gap-3">
          <p>{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium mx-auto"
          >
            Réessayer
          </button>
        </div>
      </MobileFrame>
    );
  },
  notFoundComponent: () => (
    <MobileFrame>
      <div className="p-6 text-center flex-1 flex flex-col justify-center gap-3">
        <h1 className="text-xl font-bold">Niveau introuvable</h1>
        <Link to="/equipements" className="text-brand-blue text-sm font-medium">
          Retour
        </Link>
      </div>
    </MobileFrame>
  ),
  component: Page,
});

function Page() {
  const { equipement, level } = Route.useLoaderData();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= level.duration) {
          setRunning(false);
          setDone(true);
          return level.duration;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [running, level.duration]);

  const pct = (elapsed / level.duration) * 100;
  const remaining = Math.max(0, level.duration - elapsed);

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto pb-10">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link
            to="/equipements/$id"
            params={{ id: equipement.id }}
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">{equipement.name}</p>
            <h1 className="text-lg font-bold leading-tight">
              Niveau : {level.label} <span className="text-muted-foreground font-medium">(Niv.{level.num})</span>
            </h1>
          </div>
        </header>

        {/* Video */}
        <div className="px-5">
          <div className="relative aspect-video rounded-3xl bg-ink overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-green/20" />
            <div className="relative z-10 text-center text-cream">
              <div className="text-6xl mb-2">{equipement.emoji}</div>
              <p className="text-xs font-medium opacity-80">Démonstration en boucle</p>
            </div>
            <button
              type="button"
              className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-cream/90 flex items-center justify-center"
              aria-label="Lecture"
            >
              <Play className="h-4 w-4 fill-ink" />
            </button>
          </div>
        </div>

        {/* Audio coach */}
        <div className="px-5 pt-4">
          <button
            type="button"
            onClick={() => setAudioOn((v) => !v)}
            className="w-full flex items-center gap-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 px-4 py-3"
          >
            <span className="h-9 w-9 rounded-full bg-brand-blue text-white flex items-center justify-center">
              {audioOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </span>
            <span className="flex-1 text-left text-sm font-medium">
              Conseils du coach {audioOn ? "(en lecture)" : ""}
            </span>
            {audioOn ? <Pause className="h-4 w-4 text-brand-blue" /> : <Play className="h-4 w-4 text-brand-blue" />}
          </button>
        </div>

        {/* Validation */}
        <section className="px-5 pt-10 flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
            {done ? "Bravo !" : running ? "Tiens la position" : "C'est à vous !"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {done ? "Exercice validé" : `${remaining}s restantes`}
          </h2>

          <div className="mt-6">
            <CircularProgress
              value={pct}
              size={220}
              stroke={14}
              color={done ? "var(--brand-green)" : "var(--brand-blue)"}
            >
              <button
                type="button"
                disabled={!done && !running && elapsed === 0 ? false : !done}
                onClick={() => {
                  if (done) {
                    // reset / re-do
                    setDone(false);
                    setElapsed(0);
                    setRunning(false);
                    return;
                  }
                  if (!running) setRunning(true);
                }}
                className={`h-40 w-40 rounded-full flex flex-col items-center justify-center font-bold text-lg transition-all ${
                  done
                    ? "bg-brand-green text-ink shadow-lg shadow-brand-green/30"
                    : running
                      ? "bg-secondary text-foreground/60"
                      : "bg-ink text-cream"
                }`}
              >
                {done ? (
                  <>
                    <Check className="h-8 w-8" />
                    <span className="mt-1 text-sm">Validé</span>
                  </>
                ) : running ? (
                  <span className="text-3xl">{remaining}</span>
                ) : (
                  <>
                    <Play className="h-7 w-7 fill-cream" />
                    <span className="mt-1 text-sm">Démarrer</span>
                  </>
                )}
              </button>
            </CircularProgress>
          </div>

          <p className="mt-6 text-xs text-muted-foreground max-w-xs">
            Maintiens la position {level.duration} secondes. Le bouton de validation s'active une fois la jauge pleine.
          </p>
        </section>
      </div>
    </MobileFrame>
  );
}

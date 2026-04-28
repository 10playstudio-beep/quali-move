export type Level = {
  id: "cool" | "actif" | "sportif" | "athlete";
  label: string;
  num: number;
  description: string;
  duration: number;
};

export type Equipement = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  structure: string;
  levels: Level[];
};

const baseLevels: Level[] = [
  { id: "cool", label: "Cool", num: 1, description: "Initiation, mouvement guidé.", duration: 20 },
  { id: "actif", label: "Actif", num: 2, description: "Tonification générale.", duration: 25 },
  { id: "sportif", label: "Sportif", num: 3, description: "Renforcement intermédiaire.", duration: 30 },
  { id: "athlete", label: "Athlète", num: 4, description: "Performance avancée.", duration: 40 },
];

export const equipements: Equipement[] = [
  {
    id: "chaise-romaine",
    name: "Chaise Romaine",
    emoji: "🪑",
    description: "Travail du gainage, des dips et des relevés de jambes. Indispensable pour le haut du corps.",
    structure: "multi",
    levels: baseLevels,
  },
  {
    id: "barres-traction",
    name: "Barres de traction",
    emoji: "🏋️",
    description: "Tractions, suspensions et travail dorsal complet.",
    structure: "barres",
    levels: baseLevels,
  },
  {
    id: "barres-paralleles",
    name: "Barres parallèles",
    emoji: "🤸",
    description: "Dips, équilibres et renforcement triceps/pectoraux.",
    structure: "barres",
    levels: baseLevels,
  },
  {
    id: "echelle-horizontale",
    name: "Échelle horizontale",
    emoji: "🪜",
    description: "Déplacements suspendus, force des avant-bras et grip.",
    structure: "echelle",
    levels: baseLevels,
  },
  {
    id: "anneaux",
    name: "Anneaux",
    emoji: "💍",
    description: "Stabilité, gainage et travail haut du corps en instabilité.",
    structure: "anneaux",
    levels: baseLevels,
  },
  {
    id: "espalier",
    name: "Espalier",
    emoji: "🧗",
    description: "Étirements, gainage et renforcement bas du corps.",
    structure: "espalier",
    levels: baseLevels,
  },
];

export const getEquipement = (id: string) => equipements.find((e) => e.id === id);
export const getLevel = (eq: Equipement, levelId: string) =>
  eq.levels.find((l) => l.id === levelId);

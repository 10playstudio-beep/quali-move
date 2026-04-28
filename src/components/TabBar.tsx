import { Link, useLocation } from "@tanstack/react-router";
import { Home, Dumbbell, User } from "lucide-react";

const items = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/equipements", label: "Équipements", icon: Dumbbell },
  { to: "/account", label: "Compte", icon: User },
] as const;

export function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur border-t border-border">
      <ul className="flex items-center justify-around px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/"
              ? pathname === "/"
              : pathname === to || pathname.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-full transition-colors"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                    active ? "bg-brand-blue text-white" : "text-foreground/60"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span
                  className={`text-[11px] ${
                    active ? "font-bold text-brand-blue" : "font-medium text-foreground/60"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

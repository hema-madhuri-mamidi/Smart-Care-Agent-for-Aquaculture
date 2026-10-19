import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  HeartPulse,
  Droplets,
  BrainCircuit,
  TrendingUp,
  Sliders,
  Utensils,
  Bell,
  Wrench,
  Settings,
  Fish,
  X,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/fish-health", label: "Fish Health", icon: HeartPulse },
  { to: "/water-quality", label: "Water Quality", icon: Droplets },
  { to: "/ai-agent", label: "AI Agent", icon: BrainCircuit },
  { to: "/predictions", label: "Predictions", icon: TrendingUp },
  { to: "/automation", label: "Automation", icon: Sliders },
  { to: "/feeding", label: "Feeding", icon: Utensils },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-aqua-600 text-white shadow-glow"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 bg-depth border-r border-border">
        <Brand />
        <NavItems />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-depth border-r border-border flex flex-col">
            <div className="flex items-center justify-between px-4">
              <Brand />
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <NavItems onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2 px-5 py-5">
      <div className="h-8 w-8 rounded-lg bg-aqua-600 flex items-center justify-center">
        <Fish size={18} className="text-white" />
      </div>
      <span className="font-display font-semibold text-white">Smart Aquarium</span>
    </div>
  );
}
import { Menu, Bell, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { aquarium } from "../data/mockData.js";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-depth/90 backdrop-blur px-4 lg:px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm font-medium text-white">{aquarium.name}</p>
          <div className="flex items-center gap-1.5 text-xs text-status-good">
            <span className="h-1.5 w-1.5 rounded-full bg-status-good animate-pulseGlow" />
            Online
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/alerts"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </Link>
        <Link
          to="/settings"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Settings"
        >
          <SettingsIcon size={18} />
        </Link>
      </div>
    </header>
  );
}
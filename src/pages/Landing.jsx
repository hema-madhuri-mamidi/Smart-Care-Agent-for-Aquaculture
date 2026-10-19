import { Link } from "react-router-dom";
import { Fish, Activity, BrainCircuit, Sliders, ArrowRight } from "lucide-react";
import AquariumBackground from "../components/AquariumBackground.jsx";

const features = [
  { icon: Activity, title: "Real-time Monitoring", desc: "Live temperature, pH, oxygen and more, updated continuously." },
  { icon: BrainCircuit, title: "AI Predictions", desc: "Forecasts risks before they affect your fish." },
  { icon: Sliders, title: "Automatic Control", desc: "Devices react on their own to keep water parameters safe." },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <AquariumBackground />

      <div className="relative z-10">
        {/* Nav */}
        <header className="flex items-center justify-between px-6 lg:px-10 py-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-aqua-600 flex items-center justify-center">
              <Fish size={18} />
            </div>
            <span className="font-display font-semibold">Smart Aquarium</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#about" className="hover:text-white">About</a>
          </nav>
          <Link
            to="/login"
            className="rounded-lg bg-aqua-600 hover:bg-aqua-700 transition-colors px-4 py-2 text-sm font-medium"
          >
            Login
          </Link>
        </header>

        {/* Hero */}
        <section id="home" className="px-6 lg:px-10 pt-16 pb-20 max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
            <span className="text-aqua-300">AI-Powered</span>
            <br />
            Smart Aquarium
          </h1>
          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-xl">
            Intelligent monitoring, prediction and automatic aquarium management.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-aqua-600 hover:bg-aqua-700 transition-colors px-6 py-3 text-sm font-medium shadow-glow"
          >
            Enter Dashboard
            <ArrowRight size={16} />
          </Link>

          <div id="features" className="mt-16 grid sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-border flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-aqua-300" />
                </div>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-slate-400 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="sr-only">
          Smart Aquarium is a frontend demo of an AI-assisted aquaculture management dashboard.
        </section>
      </div>
    </div>
  );
}

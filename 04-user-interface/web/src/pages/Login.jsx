import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fish } from "lucide-react";
import AquariumBackground from "../components/AquariumBackground.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Mock login: no real authentication, just move on to the dashboard.
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-abyss text-white">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16">
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-lg bg-aqua-600 flex items-center justify-center">
            <Fish size={18} />
          </div>
          <span className="font-display font-semibold">Smart Aquarium</span>
        </div>

        <h1 className="font-display text-2xl font-semibold">Welcome Back!</h1>
        <p className="text-slate-400 text-sm mt-2 mb-8">
          Sign in to your aquarium control center
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
          <div>
            <label className="text-sm text-slate-300 block mb-1.5">Email / Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full rounded-lg bg-card border border-border px-3.5 py-2.5 text-sm placeholder:text-slate-500 focus:border-aqua-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg bg-card border border-border px-3.5 py-2.5 text-sm placeholder:text-slate-500 focus:border-aqua-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" className="rounded border-border bg-card accent-aqua-600" />
              Remember me
            </label>
            <a href="#" className="text-aqua-300 hover:text-aqua-200">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-aqua-600 hover:bg-aqua-700 transition-colors py-2.5 text-sm font-medium shadow-glow"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-aqua-300 hover:text-aqua-200">Register</Link>
        </p>
      </div>

      {/* Right: visual */}
      <div className="relative hidden lg:block">
        <AquariumBackground />
        <div className="absolute inset-0 flex items-end p-10">
          <p className="text-slate-300 text-sm max-w-xs">
            Monitor water quality, fish health and automation, all from one dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

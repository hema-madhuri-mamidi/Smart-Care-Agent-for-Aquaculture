// Lightweight decorative underwater backdrop: a deep gradient with a handful
// of softly rising bubbles. Pure CSS/SVG, no images required, so the app has
// zero external asset dependencies and still reads as "underwater".
export default function AquariumBackground({ className = "" }) {
  const bubbles = [
    { left: "8%", size: 14, duration: 9, delay: 0 },
    { left: "20%", size: 8, duration: 7, delay: 1.5 },
    { left: "35%", size: 18, duration: 11, delay: 0.5 },
    { left: "52%", size: 10, duration: 8, delay: 2 },
    { left: "68%", size: 22, duration: 12, delay: 1 },
    { left: "80%", size: 12, duration: 9.5, delay: 3 },
    { left: "92%", size: 9, duration: 7.5, delay: 2.5 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ocean-gradient ${className}`}>
      {/* light shafts */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-40 h-full bg-gradient-to-b from-aqua-300/20 to-transparent -skew-x-12 blur-2xl" />
        <div className="absolute top-0 left-2/3 w-24 h-full bg-gradient-to-b from-aqua-200/15 to-transparent -skew-x-6 blur-2xl" />
      </div>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble animate-rise"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
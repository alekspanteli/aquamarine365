const cities = [
  'London', 'Stockholm', 'Paris', 'Berlin', 'Athens', 'Milan', 'Amsterdam',
  'Zürich', 'Oslo', 'Dublin', 'Madrid', 'Copenhagen', 'Warsaw', 'Tel Aviv',
  'Vienna', 'Helsinki', 'Brussels', 'Lisbon'
];

export default function Marquee() {
  const doubled = [...cities, ...cities];
  return (
    <div
      className="mt-12 flex items-center gap-5 p-5 md:p-6 bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden flex-col md:flex-row"
      aria-label="Guests from these cities"
    >
      <span className="label whitespace-nowrap">Guests this year —</span>
      <div
        className="flex-1 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)'
        }}
      >
        <div className="flex gap-8 w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {doubled.map((c, i) => (
            <span key={`${c}-${i}`} className="inline-flex items-center gap-2 font-display text-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
              {c}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        .animate-marquee { animation: marquee 40s linear infinite; will-change: transform; }
        .motion-reduce\\:animate-none { }
      `}</style>
    </div>
  );
}

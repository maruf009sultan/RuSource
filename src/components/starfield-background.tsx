export function StarfieldBackground() {
  return (
    <div aria-hidden className="starfield pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="starfield-layer starfield-layer-1" />
      <div className="starfield-layer starfield-layer-2" />
      <div className="starfield-layer starfield-layer-3" />
      <div className="starfield-glow" />
    </div>
  );
}

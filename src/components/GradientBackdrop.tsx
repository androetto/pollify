export default function GradientBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-30 blur-3xl animate-blob-float" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-fuchsia-400 opacity-25 blur-3xl animate-blob-float-slow" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-purple-300 opacity-25 blur-3xl animate-blob-float" />
    </div>
  );
}

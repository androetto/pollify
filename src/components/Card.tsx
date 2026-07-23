interface Props {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

export default function Card({ children, className = "", padding = "lg" }: Props) {
  return (
    <div
      className={`bg-[var(--color-surface)] rounded-2xl shadow-lg border border-[var(--color-border)] ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

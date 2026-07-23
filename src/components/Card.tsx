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
      className={`glass-card rounded-2xl shadow-xl shadow-purple-500/10 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

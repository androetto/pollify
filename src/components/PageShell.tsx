interface Props {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "xl" | "2xl" | "3xl" | "4xl";
}

const maxWidthClasses = {
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

export default function PageShell({ children, className = "", maxWidth = "3xl" }: Props) {
  return (
    <div className={`min-h-screen px-4 pt-24 pb-16 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>{children}</div>
    </div>
  );
}

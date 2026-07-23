import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center">
        <Icon className="w-8 h-8 text-[var(--color-primary)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-secondary)] max-w-sm mx-auto mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}

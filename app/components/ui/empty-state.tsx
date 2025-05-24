import { cn } from "~/lib/utils";
import { Button } from "./button";

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-10 px-6 border border-dashed rounded-lg bg-muted/50",
        className
      )}
    >
      {icon && <div className="mb-4 text-4xl">{icon}</div>}

      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

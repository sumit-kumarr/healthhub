
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50",
      className
    )}>
      <div className="mb-4 rounded-full bg-primary/10 p-2.5 w-fit">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

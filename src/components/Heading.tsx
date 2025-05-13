import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        "font-sans uppercase",
        {
          "~text-4xl/8xl": size === "xl",
          "~text-4xl/7xl": size === "lg",
          "~text-3xl/5xl": size === "md",
          "~text-2xl/4xl": size === "sm",
          "~text-lg/xl": size === "xs",
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}

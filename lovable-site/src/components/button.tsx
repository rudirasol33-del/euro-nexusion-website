import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
  secondary: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-border bg-background/10 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
};

export function ActionButton({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return <button className={cn(styles[variant], className)} {...props} />;
}

export function ActionLink({ children, variant = "primary", className = "", onClick, ...props }: LinkProps & { children: ReactNode; onClick?: () => void; variant?: keyof typeof styles; className?: string }) {
  return <Link className={cn(styles[variant], className)} {...props} onClick={() => { if (props.to === "/contact") track("quote_click"); onClick?.(); }}>{children}</Link>;
}
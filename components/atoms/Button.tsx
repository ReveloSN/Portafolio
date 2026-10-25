import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "lime" | "ghost" | "dark";
export type ButtonSize = "md" | "sm";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border-[1.5px] border-transparent font-sans font-semibold no-underline transition duration-300 hover:-translate-y-[3px] disabled:cursor-default disabled:opacity-55 disabled:hover:translate-y-0";

const VARIANTS: Readonly<Record<ButtonVariant, string>> = {
  lime: "bg-glow text-(--ink) hover:shadow-[0_14px_34px_-10px_var(--glow)]",
  ghost: "border-leaf/55 bg-white/5 text-leaf hover:bg-white/15",
  dark: "border-white/20 bg-[#0b1d15] text-leaf hover:bg-[#12301f]",
};

const SIZES: Readonly<Record<ButtonSize, string>> = {
  md: "px-[26px] py-3.5 text-base",
  sm: "px-5 py-2.5 text-sm",
};

interface CommonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { readonly href: string };
type NativeProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    readonly href?: undefined;
  };

export type ButtonProps = LinkProps | NativeProps;

const isInternalRoute = (href: string) => href.startsWith("/") && !href.endsWith(".pdf");

export function Button(props: ButtonProps) {
  const { variant = "lime", size = "md", className, children, ...rest } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<
      LinkProps,
      keyof CommonProps | "className"
    >;
    if (isInternalRoute(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }
  const buttonProps = rest as Omit<NativeProps, keyof CommonProps | "className">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

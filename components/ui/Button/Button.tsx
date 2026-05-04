import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", as = "button", className, children, ...props }, ref) => {
    const cls = clsx(styles.button, styles[variant], className);

    if (as === "a" && props.href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={props.href}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cls}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;

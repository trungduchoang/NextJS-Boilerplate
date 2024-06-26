import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { useRouter } from "@/hooks/useRouter";
import classes from "./Link.module.scss";

/**
 * Link
 * @param href
 * @param query
 * @param children
 * @params ...@mui/material :Link params
 * @example <Link href="/designs-list">Label</Link>
 */
export default function Link({
  href,
  query,
  children,
  className,
  ...rest
}: { href: string; children: ReactNode; query?: TObject } & {
  className?: string;
  style?: CSSProperties;
}) {
  const router = useRouter();
  return (
    <a
      {...rest}
      className={clsx(classes.root, className)}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        router.push(href, query, {
          atNewTab: e.ctrlKey,
        });
      }}
    >
      {children}
    </a>
  );
}

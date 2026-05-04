import clsx from "clsx";
import styles from "./SectionLabel.module.scss";
import Link from "next/link";

interface SectionLabelProps {
  number?: string;
  title: string;
  right?: string;
  rightLink?: string;
  dark?: boolean;
  className?: string;
}

export default function SectionLabel({ number, title, right, rightLink, dark = false, className }: SectionLabelProps) {
  return (
    <div className={clsx(styles.wrapper, dark && styles.dark, className)}>
      <span className={styles.label}>
        {number && `${number} / `}
        {title}
      </span>
      {right && rightLink && (
        <Link href={rightLink} className={clsx(styles.label, styles.right)}>
          {right}
        </Link>
      )}
      {right && !rightLink && <span className={clsx(styles.label, styles.right)}>{right}</span>}
    </div>
  );
}

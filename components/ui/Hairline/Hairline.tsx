import clsx from 'clsx';
import styles from './Hairline.module.scss';

interface HairlineProps {
  dark?: boolean;
  className?: string;
}

export default function Hairline({ dark = false, className }: HairlineProps) {
  return (
    <div className={clsx(styles.hairline, dark && styles.dark, className)} />
  );
}

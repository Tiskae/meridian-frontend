import styles from './Crosshair.module.scss';
import clsx from 'clsx';

interface CrosshairProps {
  topLeft?: string;
  bottomLeft?: string;
  topRight?: string;
  className?: string;
}

export default function Crosshair({
  topLeft,
  bottomLeft,
  topRight,
  className,
}: CrosshairProps) {
  return (
    <>
      {(topLeft || bottomLeft) && (
        <div className={clsx(styles.label, styles.left, className)}>
          {topLeft && <span>{topLeft}</span>}
          {bottomLeft && <span>{bottomLeft}</span>}
        </div>
      )}
      {topRight && (
        <div className={clsx(styles.label, styles.right, className)}>
          <span>{topRight}</span>
        </div>
      )}
    </>
  );
}

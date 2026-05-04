import styles from './Marquee.module.scss';

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Triple the items for seamless infinite scroll
  const tripled = [...items, ...items, ...items];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {tripled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

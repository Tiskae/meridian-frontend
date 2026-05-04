import styles from './Placeholder.module.scss';

interface PlaceholderProps {
  title: string;
  subtitle?: string;
}

export default function Placeholder({
  title,
  subtitle = 'This page is being designed and will be available soon.',
}: PlaceholderProps) {
  return (
    <main className={styles.placeholder}>
      <p className={styles.label}>— In preparation</p>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.body}>{subtitle}</p>
    </main>
  );
}

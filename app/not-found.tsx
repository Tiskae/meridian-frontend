import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <p className={styles.label}>— 404</p>
      <h1 className={styles.title}>
        Page not <em>found</em>.
      </h1>
      <p className={styles.body}>
        The page you are looking for does not exist or has been moved.
      </p>
    </main>
  );
}

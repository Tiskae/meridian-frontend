import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';
import styles from './BrandsMarquee.module.scss';

interface MakeWithLogo {
  _id: string;
  name: string;
  logo: SanityImageSource;
}

interface BrandsMarqueeProps {
  makes: MakeWithLogo[];
}

export default function BrandsMarquee({ makes }: BrandsMarqueeProps) {
  if (makes.length === 0) return null;

  // Duplicate the set once — animation scrolls exactly -50% for seamless loop
  const doubled = [...makes, ...makes];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((make, i) => {
          const logoUrl = urlFor(make.logo)
            .height(80)
            .auto('format')
            .url();

          return (
            <div key={`${make._id}-${i}`} className={styles.logoWrap}>
              <Image
                src={logoUrl}
                alt={make.name}
                width={0}
                height={32}
                sizes="auto"
                className={styles.logo}
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

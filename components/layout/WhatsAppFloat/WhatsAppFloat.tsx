'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './WhatsAppFloat.module.scss';

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Enquire on WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1.5} />
    </a>
  );
}

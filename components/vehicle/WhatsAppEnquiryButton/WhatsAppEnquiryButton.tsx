'use client';

import { analytics } from '@/lib/analytics';
import styles from './WhatsAppEnquiryButton.module.scss';

interface Props {
  href: string;
  vehicleName: string;
  className?: string;
}

export default function WhatsAppEnquiryButton({ href, vehicleName, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => analytics.whatsappEnquiry(vehicleName)}
    >
      Enquire on WhatsApp
    </a>
  );
}

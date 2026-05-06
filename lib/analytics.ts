/**
 * Thin wrapper around gtag for custom event tracking.
 * GA4 page views are handled automatically by @next/third-parties/google.
 * Use trackEvent() for button clicks and other interactions.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('whatsapp_enquiry', { vehicle: 'Porsche 911', page: '/vehicle/porsche-911' });
 */

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

// ─── Predefined events ──────────────────────────────────────────────────────
// Call these directly from onClick handlers for consistent naming across the site.

export const analytics = {
  /** User clicked the WhatsApp enquiry button on a vehicle page */
  whatsappEnquiry: (vehicleName: string) =>
    trackEvent("whatsapp_enquiry", { vehicle: vehicleName }),

  /** User clicked "View the Collection" or "Browse Inventory" CTAs */
  viewCollection: (source: string) =>
    trackEvent("view_collection", { source }),

  /** User clicked "Book a Private Viewing" */
  bookViewing: (source: string) =>
    trackEvent("book_viewing", { source }),

  /** User clicked a vehicle card to open the detail page */
  vehicleCardClick: (vehicleName: string) =>
    trackEvent("vehicle_card_click", { vehicle: vehicleName }),

  /** User submitted the financing enquiry form */
  financeEnquiry: () =>
    trackEvent("finance_enquiry_submit"),

  /** User submitted the sell-your-car form */
  sellEnquiry: () =>
    trackEvent("sell_enquiry_submit"),

  /** User clicked "Get Directions" on the contact/map section */
  getDirections: () =>
    trackEvent("get_directions"),

  /** User clicked a dot or navigated the hero slideshow */
  heroSlideChange: (index: number) =>
    trackEvent("hero_slide_change", { slide_index: index }),
};

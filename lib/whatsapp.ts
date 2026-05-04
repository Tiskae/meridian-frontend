const WHATSAPP_NUMBER = '2349120448767';

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsAppUrl(
  make: string,
  model: string,
  year: number,
): string {
  return buildWhatsAppUrl(
    `Hello, I'm interested in the ${year} ${make} ${model} listed on your website. Could you share more details?`,
  );
}

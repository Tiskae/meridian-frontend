// Inline SVG social icons — lucide-react v1 omits platform icons

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconInstagram() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconX() {
  // Exact X (Twitter) logo — filled path, not stroked
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.012 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.76.459 3.41 1.265 4.847L2 22l5.293-1.237A9.953 9.953 0 0 0 12.004 22C17.528 22 22 17.522 22 12.004 22 6.478 17.528 2 12.004 2Zm0 18.18a8.153 8.153 0 0 1-4.156-1.136l-.298-.177-3.092.722.756-2.995-.194-.308A8.162 8.162 0 0 1 3.82 12.004c0-4.51 3.67-8.18 8.184-8.18 4.508 0 8.178 3.67 8.178 8.18 0 4.509-3.67 8.176-8.178 8.176Z" />
    </svg>
  );
}

export function IconFacebook() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function IconLinkedin() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const SOCIAL_LINKS = [
  { Icon: IconInstagram, label: "Instagram" },
  { Icon: IconWhatsApp, label: "WhatsApp" },
  { Icon: IconX,         label: "X / Twitter" },
  { Icon: IconFacebook,  label: "Facebook" },
  { Icon: IconLinkedin,  label: "LinkedIn" },
];

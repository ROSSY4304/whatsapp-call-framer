// src/whatsappButtonShared.js

export function getWhatsAppButtonConfig(userCfg = {}) {
  return {
    ctaText: "Talk to us",
    buttonColor: "#25D366",
    ctaTextColor: "#FFFFFF",
    iconColor: "#FFFFFF",
    cornerRadius: 28,
    phoneNumber: "",
    prefilledMessage: "",
    position: "bottom-right",
    offsetX: 24,
    offsetY: 24,
    zIndex: 99999,
    showIcon: true,
    containerId: "peach-wa-btn",
    ...userCfg,
  };
}

// Returns {button, iconSvg, onClick} to use in React OR vanilla JS
export function makeWhatsAppButtonElements(cfg, onClick) {
  const config = getWhatsAppButtonConfig(cfg);

  // Icon as SVG string
  const iconSvg = `
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.52 3.48A11.78 11.78 0 0012 .25 11.75 11.75 0 00.25 12 11.78 11.78 0 003.48 20.52L3 24l3.48-.48A11.78 11.78 0 0012 23.75h.01A11.75 11.75 0 0023.75 12 11.78 11.78 0 0020.52 3.48z" fill="${config.iconColor}" opacity="0.06"/>
      <path d="M17.472 14.382l-1.4-.4a1.12 1.12 0 00-1.02.24l-.88.74a8.64 8.64 0 01-4.06-4.06l.74-.88c.28-.34.32-.8.12-1.18l-.4-1.36A1.1 1.1 0 009 6.116L8.1 6.36a1.1 1.1 0 00-.88 1.12c.06 1.16.44 2.82 1.8 5.12 1.4 2.34 3.22 4.16 5.56 5.56 2.3 1.36 3.96 1.74 5.12 1.8.5.04 1.02-.32 1.12-.88l.244-.9a1.1 1.1 0 00-.986-1.35l-1.408-.08a1.1 1.1 0 00-.76-.64z" fill="${config.iconColor}"/>
    </svg>
  `;

  return {
    config,
    iconSvg,
    get onClick() {
      return function(ev) {
        if (ev) ev.preventDefault();
        const digits = (config.phoneNumber || "").replace(/[^\d]/g, "");
        const url = digits
          ? `https://wa.me/${digits}?text=${encodeURIComponent(config.prefilledMessage || "")}`
          : "https://web.whatsapp.com/";
        window.open(url, "_blank");
      };
    },
  };
}

import React from "react";
import { makeWhatsAppButtonElements } from "./whatsappButtonShared";

export default function WhatsAppCallButton({ config = {} }) {
  const { config: cfg, iconSvg, onClick } = makeWhatsAppButtonElements(config);

  // Styles
  const pill = {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 18px",
    height: 44,
    borderRadius: cfg.cornerRadius + "px",
    background: cfg.buttonColor,
    color: cfg.ctaTextColor,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    border: "1px solid rgba(0,0,0,0.06)",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    textDecoration: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const iconCircle = {
    width: 28,
    height: 28,
    borderRadius: 9999,
    background: "rgba(255,255,255,0.12)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  // Use React dangerouslySetInnerHTML to render the SVG safely
  return (
    <button
      onClick={onClick}
      style={pill}
      aria-label={cfg.ctaText}
      title={cfg.ctaText}
    >
      {cfg.showIcon && (
        <span style={iconCircle} dangerouslySetInnerHTML={{ __html: iconSvg }} />
      )}
      <span style={{ color: cfg.ctaTextColor }}>{cfg.ctaText}</span>
    </button>
  );
}

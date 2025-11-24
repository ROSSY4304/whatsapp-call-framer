// src/WhatsAppCallButton.jsx
import React from "react";

/**
 * WhatsAppCallButton
 * - Default position: bottom-right (safe — won't overlap header/title)
 * - Accepts config.position values:
 *    "bottom-right" (default), "bottom-left", "top-right", "top-left", "left", "right"
 *
 * Usage:
 *  <WhatsAppCallButton config={cfg} />
 */
export default function WhatsAppCallButton({ config = {} }) {
  const defaults = {
    ctaText: "Talk to us",
    buttonColor: "#25D366",
    ctaTextColor: "#FFFFFF",
    iconColor: "#FFFFFF",
    cornerRadius: 28,
    phoneNumber: "",
    prefilledMessage: "",
    position: "bottom-right", // changed default to bottom-right
    offsetX: 24, // pixels from side
    offsetY: 24, // pixels from bottom/top
    zIndex: 99999,
    showIcon: true,
  };
  const cfg = { ...defaults, ...config };

  const normalizePhone = (raw) => (raw || "").replace(/[^\d]/g, "");
  const openWhatsApp = (e) => {
    e && e.preventDefault();
    const phone = normalizePhone(cfg.phoneNumber);
    const text = cfg.prefilledMessage || "";
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : "https://web.whatsapp.com/";
    window.open(url, "_blank");
  };

  // compute position styles based on cfg.position
  const pos = cfg.position || "bottom-right";
  const posStyle = {};
  // defaults to bottom-right offsets
  if (pos === "bottom-right") {
    posStyle.right = `${cfg.offsetX}px`;
    posStyle.bottom = `${cfg.offsetY}px`;
  } else if (pos === "bottom-left") {
    posStyle.left = `${cfg.offsetX}px`;
    posStyle.bottom = `${cfg.offsetY}px`;
  } else if (pos === "top-right") {
    posStyle.right = `${cfg.offsetX}px`;
    posStyle.top = `${cfg.offsetY}px`;
  } else if (pos === "top-left") {
    posStyle.left = `${cfg.offsetX}px`;
    posStyle.top = `${cfg.offsetY}px`;
  } else if (pos === "left") {
    posStyle.left = `${cfg.offsetX}px`;
    posStyle.top = `${cfg.offsetY}px`;
  } else if (pos === "right") {
    posStyle.right = `${cfg.offsetX}px`;
    posStyle.top = `${cfg.offsetY}px`;
  } else {
    // fallback
    posStyle.right = `${cfg.offsetX}px`;
    posStyle.bottom = `${cfg.offsetY}px`;
  }

  const containerStyle = {
  // REMOVE position, zIndex, and offsets for static display
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Optionally add margin or centering styles if needed:
  // margin: "40px auto",
  // width: "fit-content", // or  "100%" for full width preview
};


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
    // ensure the pill is clickable but doesn't capture accidental drag events
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

  const svg = (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.52 3.48A11.78 11.78 0 0012 .25 11.75 11.75 0 00.25 12 11.78 11.78 0 003.48 20.52L3 24l3.48-.48A11.78 11.78 0 0012 23.75h.01A11.75 11.75 0 0023.75 12 11.78 11.78 0 0020.52 3.48z" fill={cfg.iconColor} opacity="0.06"/>
      <path d="M17.472 14.382l-1.4-.4a1.12 1.12 0 00-1.02.24l-.88.74a8.64 8.64 0 01-4.06-4.06l.74-.88c.28-.34.32-.8.12-1.18l-.4-1.36A1.1 1.1 0 009 6.116L8.1 6.36a1.1 1.1 0 00-.88 1.12c.06 1.16.44 2.82 1.8 5.12 1.4 2.34 3.22 4.16 5.56 5.56 2.3 1.36 3.96 1.74 5.12 1.8.5.04 1.02-.32 1.12-.88l.244-.9a1.1 1.1 0 00-.986-1.35l-1.408-.08a1.1 1.1 0 00-.76-.64z" fill={cfg.iconColor}/>
    </svg>
  );

  // fallback readable text color
  const textColor = cfg.ctaTextColor || "#FFFFFF";

  return (
    <div style={containerStyle} aria-hidden={false}>
      <button
        onClick={openWhatsApp}
        style={pill}
        aria-label={cfg.ctaText}
        title={cfg.ctaText}
      >
        {cfg.showIcon && <span style={iconCircle}>{svg}</span>}
        <span style={{ color: textColor }}>{cfg.ctaText}</span>
      </button>
    </div>
  );
}

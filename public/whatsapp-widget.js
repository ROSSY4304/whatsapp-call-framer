import { makeWhatsAppButtonElements } from "./whatsappButtonShared.js";

(function (global) {
  function build(cfg) {
    var { config, iconSvg, onClick } = makeWhatsAppButtonElements(cfg);

    var container = document.createElement("div");
    container.id = config.containerId;
    container.style.position = "fixed";
    container.style.top = (config.top || 24) + "px";
    container.style.left = (config.left || 24) + "px";
    container.style.zIndex = config.zIndex;
    container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
    
    // Button
    var button = document.createElement("button");
    button.setAttribute("type", "button");

    var pillStyles = {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 18px",
      height: "44px",
      borderRadius: config.cornerRadius + "px",
      background: config.buttonColor,
      color: config.ctaTextColor,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      border: "1px solid rgba(0,0,0,0.06)",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
      textDecoration: "none",
      userSelect: "none"
    };
    Object.assign(button.style, pillStyles);

    // Icon
    if (config.showIcon) {
      var iconWrap = document.createElement("span");
      iconWrap.style.width = "28px";
      iconWrap.style.height = "28px";
      iconWrap.style.borderRadius = "9999px";
      iconWrap.style.background = "rgba(255,255,255,0.12)";
      iconWrap.style.display = "inline-flex";
      iconWrap.style.alignItems = "center";
      iconWrap.style.justifyContent = "center";
      iconWrap.style.flexShrink = "0";
      iconWrap.innerHTML = iconSvg;
      button.appendChild(iconWrap);
    }

    // Text
    var text = document.createElement("span");
    text.textContent = config.ctaText;
    text.style.color = config.ctaTextColor;
    button.appendChild(text);

    // Add click handler
    button.addEventListener("click", onClick);

    container.appendChild(button);
    document.body.appendChild(container);
    return container;
  }

  global.renderWhatsAppButton = build;
  // ...rest of your code (init on DOMContentLoaded etc)...
})(window);

// public/whatsapp-widget.js
(function (global) {
  function setStyles(el, styles) { Object.keys(styles||{}).forEach(k=>{ el.style[k]=styles[k]; }); }

  function build(cfg) {
    var defaults = {
      ctaText: "Talk to us",
      buttonColor: "#25D366",
      ctaTextColor: "#FFFFFF",
      iconColor: "#FFFFFF",
      cornerRadius: 28,
      phoneNumber: "",
      prefilledMessage: "",
      position: "left",
      left: 24,
      top: 24,
      zIndex: 99999,
      showIcon: true,
      containerId: "peach-wa-btn"
    };
    cfg = Object.assign({}, defaults, cfg || {});

    var existing = document.getElementById(cfg.containerId);
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var container = document.createElement("div");
    container.id = cfg.containerId;
    setStyles(container, {
      position: "fixed",
      top: cfg.top + "px",
      left: cfg.left + "px",
      zIndex: String(cfg.zIndex),
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
    });

    var a = document.createElement("a");
    a.href = "#";
    a.setAttribute("role","button");
    setStyles(a, {
      display:"inline-flex",
      alignItems:"center",
      gap:"12px",
      padding:"10px 18px",
      height:"44px",
      borderRadius: cfg.cornerRadius + "px",
      background: cfg.buttonColor,
      color: cfg.ctaTextColor,
      fontWeight:"700",
      textDecoration:"none",
      boxShadow:"0 10px 30px rgba(0,0,0,0.12)",
      border:"1px solid rgba(0,0,0,0.06)",
      cursor:"pointer"
    });

    var iconWrap = document.createElement("span");
    setStyles(iconWrap, {
      width:"28px", height:"28px", borderRadius:"9999px",
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      background:"rgba(255,255,255,0.12)"
    });

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS,"svg");
    svg.setAttribute("width","16"); svg.setAttribute("height","16"); svg.setAttribute("viewBox","0 0 24 24");
    var p1 = document.createElementNS(svgNS,"path");
    p1.setAttribute("d","M20.52 3.48A11.78 11.78 0 0012 .25 11.75 11.75 0 00.25 12 11.78 11.78 0 003.48 20.52L3 24l3.48-.48A11.78 11.78 0 0012 23.75h.01A11.75 11.75 0 0023.75 12 11.78 11.78 0 0020.52 3.48z");
    p1.setAttribute("fill", cfg.iconColor); p1.setAttribute("opacity","0.06");
    var p2 = document.createElementNS(svgNS,"path");
    p2.setAttribute("d","M17.472 14.382l-1.4-.4a1.12 1.12 0 00-1.02.24l-.88.74a8.64 8.64 0 01-4.06-4.06l.74-.88c.28-.34.32-.8.12-1.18l-.4-1.36A1.1 1.1 0 009 6.116L8.1 6.36a1.1 1.1 0 00-.88 1.12c.06 1.16.44 2.82 1.8 5.12 1.4 2.34 3.22 4.16 5.56 5.56 2.3 1.36 3.96 1.74 5.12 1.8.5.04 1.02-.32 1.12-.88l.244-.9a1.1 1.1 0 00-.986-1.35l-1.408-.08a1.1 1.1 0 00-.76-.64z");
    p2.setAttribute("fill", cfg.iconColor);
    svg.appendChild(p1); svg.appendChild(p2);
    iconWrap.appendChild(svg);

    var text = document.createElement("span");
    text.textContent = cfg.ctaText;
    text.style.color = cfg.ctaTextColor;

    if (cfg.showIcon) a.appendChild(iconWrap);
    a.appendChild(text);

    a.addEventListener("click", function(ev){
      ev.preventDefault();
      var digits = (cfg.phoneNumber || "").replace(/[^\d]/g,"");
      var url = digits ? "https://wa.me/" + digits + "?text=" + encodeURIComponent(cfg.prefilledMessage || "") : "https://web.whatsapp.com/";
      window.open(url, "_blank");
    });

    container.appendChild(a);
    document.body.appendChild(container);
    return container;
  }

  function renderWhatsAppButton(cfg) { return build(cfg); }
  global.renderWhatsAppButton = renderWhatsAppButton;

  if (global.whatsappButtonConfig) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(function(){ renderWhatsAppButton(global.whatsappButtonConfig); }, 10);
    } else {
      document.addEventListener("DOMContentLoaded", function(){ renderWhatsAppButton(global.whatsappButtonConfig); });
    }
  }
})(window);

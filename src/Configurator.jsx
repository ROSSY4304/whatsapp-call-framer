// src/Configurator.jsx
import React, { useState } from "react";
import WhatsAppCallButton from "./WhatsAppCallButton";

/* Theme colors */
const PRIMARY = "#111827";
const SOFT_BG = "#f7f9fb";
const CARD_BG = "#ffffff";
const INPUT_BORDER = "#e6e9ee";
const MUTED = "#6b7280";

const initial = {
  ctaText: "Talk to us",
  buttonColor: "#25D366",
  ctaTextColor: "#FFFFFF",
  iconColor: "#FFFFFF",
  marginTop: 16,
  marginRight: 16,
  marginBottom: 16,
  marginLeft: 16,
  cornerRadius: 40,
  phoneNumber: "",               // <-- blank by default now
  prefilledMessage: "",
  position: "left",
  top: 28,
};

export default function WhatsAppCallConfigurator() {
  const [cfg, setCfg] = useState(initial);
  const [copied, setCopied] = useState(false);

  const embedCode = `<script async src="https://cdn.examplecdn.com/fake-whatsapp-widget/whatsapp-widget.js"></script>
<script>
var whatsappButtonConfig = ${JSON.stringify(cfg, null, 2)};
</script>`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.warn(e);
    }
  };

  const FieldLabel = ({ children }) => (
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#111827" }}>{children}</div>
  );

  // Input base style — now set color to dark so text is visible
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${INPUT_BORDER}`,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    color: "#0f1724" // dark text for visibility
  };

  return (
    // OUTER layout: center the card both horizontally and vertically
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: SOFT_BG,
      display: "flex",
      justifyContent: "center",   // centers horizontally
      alignItems: "center",       // centers vertically
      padding: "28px 24px",       // side padding for small screens
      boxSizing: "border-box",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
    }}>
      {/* Center card container */}
      <div style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        background: CARD_BG,
        borderRadius: 12,
        padding: 32,
        boxShadow: "0 18px 60px rgba(2,6,23,0.08)",
        border: "1.5px solid rgba(0,0,0,0.04)"
      }}>
        {/* floating preview pill (uses the component) */}
        <WhatsAppCallButton config={cfg} />

        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: PRIMARY }}>WhatsApp Call Button Preview</h1>
        <p style={{ marginTop: 10, marginBottom: 24, color: MUTED }}>
          Design and generate a WhatsApp call-to-action button for any website.
        </p>

        {/* Style header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="#e6eef7" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <div style={{ fontWeight: 600, color: "#374151" }}>Style</div>
        </div>

        {/* three-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "18px 22px",
          marginBottom: 18,
          alignItems: "start"
        }}>
          {/* CTA Text */}
          <div>
            <FieldLabel>CTA Text</FieldLabel>
            <input
              style={inputStyle}
              value={cfg.ctaText}
              onChange={e => setCfg(s=>({...s, ctaText: e.target.value}))}
              placeholder="Talk to us"
            />
          </div>

          {/* Button Color */}
          <div>
            <FieldLabel>Button Color</FieldLabel>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <input type="color" value={cfg.buttonColor} onChange={e=>setCfg(s=>({...s, buttonColor:e.target.value}))}
                style={{width:36,height:36,padding:0,borderRadius:6,border:`1px solid ${INPUT_BORDER}`}}/>
              <input style={{...inputStyle,flex:1}} value={cfg.buttonColor} onChange={e=>setCfg(s=>({...s, buttonColor:e.target.value}))}/>
            </div>
          </div>

          {/* CTA Text Color */}
          <div>
            <FieldLabel>CTA Text Color</FieldLabel>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <input type="color" value={cfg.ctaTextColor} onChange={e=>setCfg(s=>({...s, ctaTextColor:e.target.value}))}
                style={{width:36,height:36,padding:0,borderRadius:6,border:`1px solid ${INPUT_BORDER}`}}/>
              <input style={{...inputStyle,flex:1}} value={cfg.ctaTextColor} onChange={e=>setCfg(s=>({...s, ctaTextColor:e.target.value}))}/>
            </div>
          </div>

          {/* Icon Color */}
          <div>
            <FieldLabel>WhatsApp Call Icon Color</FieldLabel>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <input type="color" value={cfg.iconColor} onChange={e=>setCfg(s=>({...s, iconColor:e.target.value}))}
                style={{width:36,height:36,padding:0,borderRadius:6,border:`1px solid ${INPUT_BORDER}`}}/>
              <input style={{...inputStyle,flex:1}} value={cfg.iconColor} onChange={e=>setCfg(s=>({...s, iconColor:e.target.value}))}/>
            </div>
          </div>

          {/* Margin Top */}
          <div>
            <FieldLabel>Margin Top</FieldLabel>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="number" style={{...inputStyle}} value={cfg.marginTop} onChange={e=>setCfg(s=>({...s, marginTop: +e.target.value}))}/>
              <div style={{color:MUTED,fontSize:13}}>px</div>
            </div>
          </div>

          {/* Margin Bottom */}
          <div>
            <FieldLabel>Margin Bottom</FieldLabel>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="number" style={{...inputStyle}} value={cfg.marginBottom} onChange={e=>setCfg(s=>({...s, marginBottom: +e.target.value}))}/>
              <div style={{color:MUTED,fontSize:13}}>px</div>
            </div>
          </div>

          {/* Corner Radius */}
          <div>
            <FieldLabel>Corner Radius</FieldLabel>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="number" style={{...inputStyle}} value={cfg.cornerRadius} onChange={e=>setCfg(s=>({...s, cornerRadius: +e.target.value}))}/>
              <div style={{color:MUTED,fontSize:13}}>px</div>
            </div>
          </div>

          {/* Margin Right */}
          <div>
            <FieldLabel>Margin Right</FieldLabel>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="number" style={{...inputStyle}} value={cfg.marginRight} onChange={e=>setCfg(s=>({...s, marginRight: +e.target.value}))}/>
              <div style={{color:MUTED,fontSize:13}}>px</div>
            </div>
          </div>

          {/* Margin Left */}
          <div>
            <FieldLabel>Margin Left</FieldLabel>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <input type="number" style={{...inputStyle}} value={cfg.marginLeft} onChange={e=>setCfg(s=>({...s, marginLeft: +e.target.value}))}/>
              <div style={{color:MUTED,fontSize:13}}>px</div>
            </div>
          </div>

          <div></div>
        </div>

        <div style={{height:1, background:"#eef2f6", margin:"12px 0 18px"}}></div>

        <h3 style={{margin:0, color:"#111827", fontWeight:700}}>Content</h3>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px 28px", marginTop:14}}>
          <div>
            <FieldLabel>Your WhatsApp Number</FieldLabel>
            <input
              style={inputStyle}
              value={cfg.phoneNumber}
              onChange={e=>setCfg(s=>({...s, phoneNumber:e.target.value}))}
              placeholder="+91 90282 87182"
            />
            <div style={{color:MUTED, fontSize:13, marginTop:8}}>
              Enter the phone number you'd like to get calls from your website visitors. Include country code with + symbol.
            </div>
          </div>
          <div>
            <FieldLabel>Pre-filled Message (Optional)</FieldLabel>
            <textarea
              style={{...inputStyle, minHeight:88, resize:"vertical", padding:12}}
              value={cfg.prefilledMessage}
              onChange={e=>setCfg(s=>({...s, prefilledMessage:e.target.value}))}
              placeholder="Hi, I visited your website and want to talk to someone."
            />
            <div style={{color:MUTED, fontSize:13, marginTop:8}}>
              Add a default message that appears in WhatsApp when visitors contact you.
            </div>
          </div>
        </div>

        <div style={{marginTop:20, color:"#374151", fontWeight:600}}>
          Copy this code and paste before the {'</body>'} tag on every page of your website.
        </div>

        <pre style={{
          marginTop:12,
          background:"#f3f5f7",
          padding: 16,
          borderRadius: 8,
          border: "1px solid rgba(15,23,42,0.04)",
          color:"#0f1724",
          fontFamily: "Menlo, SFMono-Regular, monospace",
          fontSize:13,
          overflowX:"auto"
        }}>
{`<script async src="https://cdn.examplecdn.com/fake-whatsapp-widget/whatsapp-widget.js"></script>
<script>
var whatsappButtonConfig = ${JSON.stringify(cfg, null, 2)};
</script>`}
        </pre>

        <div style={{display:"flex", justifyContent:"flex-end", marginTop:16}}>
          <button
            onClick={onCopy}
            style={{
              background: copied ? "#111827" : "#0f172a",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              boxShadow: "0 6px 20px rgba(2,6,23,0.12)",
              cursor: "pointer",
              fontWeight: 700
            }}>
            {copied ? "Copied ✓" : "Copy to Clipboard"}
          </button>
        </div>

      </div>
    </div>
  );
}

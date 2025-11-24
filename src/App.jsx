import WhatsAppCallButton from './WhatsAppCallButton';

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100vw",
        minHeight: "100vh"
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <WhatsAppCallButton />
      </div>
      <h2 style={{ margin: "0" }}>
        This Heading Is *Below* the Button
      </h2>
    </div>
  );
}

export default App;

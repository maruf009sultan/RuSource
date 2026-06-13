import { createFileRoute } from "@tanstack/react-router";
import qrPng from "@/assests/qr.png";

export const Route = createFileRoute("/qr")({
  component: QrPage,
});

function QrPage() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#1a1620",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999,
    }}>
      <img src={qrPng} alt="RuSource QR Code" style={{
        maxWidth: "90vmin", maxHeight: "90vmin",
        width: "auto", height: "auto", borderRadius: "4px",
      }} />
    </div>
  );
}

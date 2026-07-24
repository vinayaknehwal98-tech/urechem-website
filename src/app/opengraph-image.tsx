import { ImageResponse } from "next/og";

export const alt = "Urechem Chemicals — The pinnacle of polyurethane solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #03101e 0%, #082f49 56%, #0369a1 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "68px 76px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(34, 211, 238, 0.13)",
            borderRadius: 999,
            height: 420,
            position: "absolute",
            right: -100,
            top: -160,
            width: 420,
          }}
        />
        <div
          style={{
            background: "rgba(37, 99, 235, 0.18)",
            borderRadius: 999,
            bottom: -190,
            height: 460,
            left: 350,
            position: "absolute",
            width: 460,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760, position: "relative" }}>
          <div
            style={{
              alignItems: "center",
              color: "#a5f3fc",
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Urechem Chemicals
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1.02,
              marginTop: 28,
            }}
          >
            The pinnacle of polyurethane solutions
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 28, lineHeight: 1.45, marginTop: 30 }}>
            Spray foam · MDI · Polyols · Waterproofing · Grouting · Polyurea · TPU
          </div>
          <div style={{ alignItems: "center", display: "flex", marginTop: 42 }}>
            <div style={{ background: "#67e8f9", height: 5, width: 180 }} />
            <div style={{ background: "#2563eb", height: 5, width: 110 }} />
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            border: "4px solid rgba(207, 250, 254, 0.9)",
            borderRadius: "52% 48% 54% 46% / 62% 60% 40% 38%",
            boxShadow: "0 0 80px rgba(34, 211, 238, 0.28)",
            display: "flex",
            flexDirection: "column",
            height: 260,
            justifyContent: "center",
            position: "relative",
            transform: "rotate(45deg)",
            width: 260,
          }}
        >
          <div
            style={{
              color: "#ecfeff",
              display: "flex",
              fontSize: 52,
              fontWeight: 900,
              transform: "rotate(-45deg)",
            }}
          >
            U
          </div>
        </div>

        <div
          style={{
            bottom: 32,
            color: "#bae6fd",
            display: "flex",
            fontSize: 21,
            fontWeight: 700,
            position: "absolute",
            right: 76,
          }}
        >
          We deliver what we promise.
        </div>
      </div>
    ),
    size,
  );
}

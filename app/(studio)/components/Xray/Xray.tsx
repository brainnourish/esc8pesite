"use client";

import { useEffect } from "react";
import { toggleXray } from "./toggle";
import "./xray.css";

export function Xray() {
  // Esc toggles wireframe view, except while typing in a field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName ?? "")) toggleXray();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="xray-grid" aria-hidden="true"><div className="wrap">{Array.from({ length: 12 }, (_, i) => <i key={i}></i>)}</div></div>
      <div className="toast" role="status">Wireframe view · press <b>Esc</b> to exit</div>
    </>
  );
}

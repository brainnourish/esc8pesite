"use client";

import { useEffect, useState } from "react";
import "./nav.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  // nav border on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "nav scrolled" : "nav"} id="top">
      <div className="wrap">
        <a className="brand" href="#top" aria-label="Esc8pe Studio home">
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="15.5" cy="4.5" r="2.3" fill="#000" stroke="none" />
              <path d="M13.5 8.5 9 14" /><path d="M12 10.5 17.5 12" /><path d="M11.5 11 5.5 8.5" /><path d="M9 14 12 20" /><path d="M9 14 4 17.5" />
            </svg>
          </span>
          Esc8pe <small>Studio</small>
        </a>
        <nav aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#reach">Reach</a>
          <a href="#process">Process</a>
          <a className="pill solid" href="#apply">Apply</a>
        </nav>
      </div>
    </header>
  );
}

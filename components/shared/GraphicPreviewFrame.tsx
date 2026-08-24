"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function GraphicPreviewFrame({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      if (!frameRef.current) return;
      const width = frameRef.current.clientWidth;
      setScale(Math.min(0.5, Math.max(0.28, width / 1080)));
    };
    update();
    const observer = new ResizeObserver(update);
    if (frameRef.current) observer.observe(frameRef.current);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const width = 1080 * scale;
  const height = 1350 * scale;

  return (
    <div ref={frameRef} className="w-full max-w-[540px] overflow-hidden rounded-2xl bg-black">
      <div style={{ width, height }} className="relative mx-auto overflow-hidden">
        <div style={{ width: 1080, height: 1350, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

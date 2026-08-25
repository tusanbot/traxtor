"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type PreviewScalerProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  maxWidth?: number;
};

export default function PreviewScaler({ children, width = 1080, height = 1350, maxWidth = 720 }: PreviewScalerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setScale(Math.min(1, host.clientWidth / width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={hostRef} className="w-full overflow-hidden" style={{ maxWidth, aspectRatio: `${width}/${height}` }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top center" }}>
        {children}
      </div>
    </div>
  );
}

import React from "react";

export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-50 bg-[size:50px_50px]
        bg-[linear-gradient(to_right,rgba(234,88,12,0.05)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(234,88,12,0.05)_1px,transparent_1px)]
        pointer-events-none" />

      <div className="fixed inset-0 flex items-center justify-center -z-40 pointer-events-none">
        <div className="w-[90vmin] h-[90vmin] rounded-full 
          bg-[radial-gradient(circle,rgba(251,146,60,0.35),transparent_70%)]
          animate-pulse-slow" />
      </div>

      <div className="ember-layer fixed inset-0 -z-30 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="ember"></div>
        ))}
      </div>

      <div className="fixed inset-0 -z-20 opacity-5
        bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0%20200 200%22 ... %3E')]
        pointer-events-none" />
    </>
  );
}



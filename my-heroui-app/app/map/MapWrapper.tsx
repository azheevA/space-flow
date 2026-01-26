"use client";

export default function MapWrapper() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <div
        id="map-container"
        className="w-full h-full rounded-xl overflow-hidden shadow-2xl transition-opacity duration-500"
      />
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-white text-sm font-medium">
          2GIS Map in real time
        </div>
      </div>
    </div>
  );
}

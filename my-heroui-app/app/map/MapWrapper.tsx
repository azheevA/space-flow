"use client";

export default function MapWrapper() {
  return (
    <div className=" flex flex-col items-center w-full max-w-4xl mx-auto my-10 rounded-2xl p-6 bg-[#7c7586]">
      <p className="text-2xl font-bold my-5 overflow-hidden">Карта</p>
      <div
        id="map-container"
        className="w-full aspect-video rounded-xl min-h-[300px]"
      ></div>
    </div>
  );
}

"use client";
import { load } from "@2gis/mapgl";
import { useEffect, useRef } from "react";
import { Map as MapInstance } from "@2gis/mapgl/types";
import MapWrapper from "./MapWrapper";
export const MapBlock = () => {
  const mapRef = useRef<MapInstance | null>(null);
  useEffect(() => {
    let isInstanceDeleted = false;
    load().then((mapglAPI) => {
      if (isInstanceDeleted) return;

      mapRef.current = new mapglAPI.Map("map-container", {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: process.env.NEXT_PUBLIC_ACCESS_TOKEN_2GIS!,
      });
    });

    return () => {
      isInstanceDeleted = true;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return <MapWrapper />;
};

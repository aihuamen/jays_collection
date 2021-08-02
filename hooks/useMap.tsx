import H from "@here/maps-api-for-javascript";
import { RefObject, useEffect, useState } from "react";

const getPositionPromise = (options?: PositionOptions) => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        return reject(error);
      },
      options
    );
  });
};

export const useMap = (ref: RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<H.Map>()

  useEffect(() => {
    const getLocation = async () => {
      const apikey = process.env.NEXT_PUBLIC_MAP_API_KEY || ''
      const coords = {
        lat: 0,
        lng: 0,
      };
      if (navigator.geolocation) {
        try {
          const position = await getPositionPromise();
          const { latitude, longitude } = position.coords;
          coords.lat = latitude;
          coords.lng = longitude;
        } catch (error) {
          console.log(error);
        }
      }
      const platform = new H.service.Platform({ apikey });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(ref.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: coords,
        zoom: 12,
      });
      const marker = new H.map.Marker(coords);
      map.addObject(marker);
      setMap(map)
    };
    getLocation();
  }, [])
  
  return map
}
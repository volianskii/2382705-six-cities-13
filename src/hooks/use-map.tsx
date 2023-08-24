import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';

import type { City } from '../constants/city.ts';
import { URL_MAP_LAYER, URL_MAP_ATTRIBUTION } from '../constants/map-url.ts';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
        },
        zoom: city.zoom
      });
      const layer = new TileLayer(
        URL_MAP_LAYER,
        {
          attribution:
            URL_MAP_ATTRIBUTION
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;

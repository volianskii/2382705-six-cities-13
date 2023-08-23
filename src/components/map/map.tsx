import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants/marker-url';
import useMap from '../../hooks/use-map';
import type { City } from '../../constants/city.ts';
import { CombinedOfferType, FullOfferType, OfferType } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps ={
  city: City;
  offers: CombinedOfferType[];
  selectedOffer: OfferType | null | FullOfferType;
  height: string | number | undefined;
  width: string | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map ({city, offers, selectedOffer, height, width}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.lat, city.lng], city.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(selectedOffer !== null && offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return(() => {
        map.removeLayer(markerLayer);
      });
    }
  }, [map, offers, selectedOffer]);

  return <div style={{height: height, width: width}} ref={mapRef}></div>;
}

export default Map;

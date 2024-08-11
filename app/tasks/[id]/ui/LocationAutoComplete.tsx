import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';

const mapContainerStyle = {
  width: '100%',
  height: '200px',
};

const center = {
  lat: 0,
  lng: 0,
};

const Libraries = ['places'] as any;

const LocationAutoComplete = ({ location, setTask }: any) => {
  const [selectedLocation, setSelectedLocation] = useState(location?.points ? location.points : center);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      document.head.appendChild(script);

      script.onload = () => {
        handlePlaceSelect();
      };
    } else {
      handlePlaceSelect();
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = location?.value || "";
    }
  }, [location?.value, inputRef.current]);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const handlePlaceSelect = () => {
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
      fields: ['formatted_address', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        setTask((prev:any) => ({
            ...prev,
            location: {
              value: place.formatted_address || place.name, 
              points: {lat: location.lat, lng: location.lng}
            }
        }));

        if (inputRef.current) {
          inputRef.current.value = (place.formatted_address || place.name) as string;
        }

        map?.panTo(location);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={Libraries}
    >
      <div>
        <Input
          type="text"
          placeholder="Enter a location"
          ref={inputRef}
          onFocus={handlePlaceSelect}
          required
        />

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedLocation.lat === 0 && selectedLocation.lng === 0 ? center : selectedLocation}
          zoom={selectedLocation.lat === 0 && selectedLocation.lng === 0 ? 2 : 14}
          onLoad={onLoad}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationAutoComplete;

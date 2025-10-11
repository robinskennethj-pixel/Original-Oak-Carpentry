'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GoogleMapsProps {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: string;
  showInfoWindow?: boolean;
  className?: string;
}

interface MapData {
  lat: number;
  lng: number;
  address: string;
  formattedAddress?: string;
}

export function GoogleMaps({
  address = "Orlando, FL",
  lat = 28.5383,
  lng = -81.3792,
  zoom = 10,
  height = "400px",
  showInfoWindow = true,
  className = ""
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapData, setMapData] = useState<MapData>({ lat, lng, address });

  // Fetch geocoding data from our server-side API
  const fetchGeocodingData = async (address: string) => {
    try {
      const response = await fetch(`/api/maps?address=${encodeURIComponent(address)}&service=geocode`);
      const data = await response.json();

      if (data.status === 'success' && data.data.length > 0) {
        const result = data.data[0];
        return {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          address: address,
          formattedAddress: result.formatted_address
        };
      } else {
        throw new Error(data.error || 'Geocoding failed');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch geocoding data if address is provided
        let currentData = { lat, lng, address };
        if (address && address !== "Orlando, FL") {
          try {
            const geocodedData = await fetchGeocodingData(address);
            currentData = geocodedData;
            setMapData(currentData);
          } catch (err) {
            console.warn('Geocoding failed, using provided coordinates:', err);
          }
        }

        // Load Google Maps API
        if (!window.google || !window.google.maps) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;

          script.onload = () => {
            createMap(currentData);
          };

          script.onerror = () => {
            setError('Failed to load Google Maps API');
            setLoading(false);
          };

          document.head.appendChild(script);
        } else {
          createMap(currentData);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    const createMap = (data: MapData) => {
      if (!mapRef.current || !window.google?.maps) return;

      try {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: data.lat, lng: data.lng },
          zoom,
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": [{ "color": "#f5f5f5" }]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{ "color": "#c9c9c9" }]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [{ "color": "#e8e8e8" }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        };

        // Create map
        mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

        // Create marker
        markerRef.current = new google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map: mapInstanceRef.current,
          title: "Original Oak Carpentry",
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="#dc2626"/>
                <circle cx="15" cy="15" r="6" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
          }
        });

        // Add info window
        if (showInfoWindow) {
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 16px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #dc2626; font-weight: bold;">Original Oak Carpentry</h3>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                  ${data.formattedAddress || data.address}
                </p>
                <p style="margin: 0; color: #374151; font-size: 14px;">
                  Professional carpentry services in Florida
                </p>
                <div style="margin-top: 12px; display: flex; align-items: center; gap: 4px;">
                  <span style="color: #fbbf24;">★★★★★</span>
                  <span style="font-size: 12px; color: #6b7280;">5.0 (200+ reviews)</span>
                </div>
              </div>
            `
          });

          markerRef.current.addListener("click", () => {
            infoWindow.open(mapInstanceRef.current, markerRef.current!);
          });

          // Open info window by default
          infoWindow.open(mapInstanceRef.current, markerRef.current);
        }

        setLoading(false);
      } catch (error) {
        console.error('Map creation error:', error);
        setError('Failed to create map');
        setLoading(false);
      }
    };

    initMap();

    return () => {
      // Cleanup
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [lat, lng, zoom, address, showInfoWindow]);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}. Please check your internet connection and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-border shadow-lg ${className}`}>
      <div
        ref={mapRef}
        className="w-full"
        style={{ height }}
      />

      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-primary mx-auto mb-2 animate-spin" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Service area map component
export function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Service Area</h3>
        <p className="text-muted-foreground">
          We proudly serve Central and South Florida with professional carpentry services
        </p>
      </div>
      <GoogleMaps
        lat={27.9506}
        lng={-82.4572}
        zoom={8}
        height="300px"
        showInfoWindow={true}
      />
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">Orlando & Central FL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-muted-foreground">Tampa Bay Area</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <span className="text-muted-foreground">Miami-Dade County</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-muted-foreground">Broward & Palm Beach</span>
        </div>
      </div>
    </div>
  );
}
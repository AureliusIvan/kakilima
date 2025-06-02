"use client"

import {APIProvider, Map} from "@vis.gl/react-google-maps";
import {cn} from "@/lib/utils";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

  if (!API_KEY) {
    if (isBuildPhase) {
      return (
          <div className="p-6 text-center">
            <p>Google Maps component is unavailable during build or API key is missing.</p>
            <p>Please ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set for runtime.</p>
          </div>
      );
    }
    // If not in build phase, it's a runtime error if the key is missing
    throw new Error("Runtime Error: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set.");
  }

  return (
      <APIProvider apiKey={API_KEY}>
        <Map
            className={cn(`w-full`, `h-screen`)}
            defaultZoom={3}
            defaultCenter={{lat: 22.54992, lng: 0}}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        />
      </APIProvider>
  );
}

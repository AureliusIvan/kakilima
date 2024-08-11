"use client"

import {APIProvider, Map} from "@vis.gl/react-google-maps";
import {cn} from "@/lib/utils";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    throw new Error("Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env variable");
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

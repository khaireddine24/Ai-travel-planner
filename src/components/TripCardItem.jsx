import React from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

const fetchTripImage = async ({ queryKey }) => {
  const [, destination] = queryKey;

  if (!destination) return '/travel-plane.jpg';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${destination}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error('Error fetching trip image:', error);
  }

  return '/travel-plane.jpg';
};

const TripCardItem = ({ trip,index }) => {
  const destination = trip?.tripData?.destination;

  const { data: tripImage = '/travel-plane.jpg' } = useQuery({
    queryKey: ['tripImage', destination],
    queryFn: fetchTripImage,
    enabled: !!destination,
    staleTime: 60 * 1000,
  });

  return (
    <Link to={`/ViewTrip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all" key={index}>
        <img
          src={tripImage}
          alt={destination}
          className="object-cover rounded-xl h-48 w-full"
        />
        <div>
          <h2 className="font-bold text-lg">{destination}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.tripData?.days} Days trip {trip?.tripData?.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default TripCardItem;

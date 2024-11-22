import React from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

const fetchDestinationImage = async (destination) => {
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
    console.error('Error fetching destination image:', error);
  }
  return '/travel-plane.jpg';
};

const InfoSection = ({ trip }) => {
  const destination = trip?.userSelection?.destination?.label;

  const { data: destinationImage = '/travel-plane.jpg' } = useQuery({
    queryKey: ['destinationImage', destination],
    queryFn: () => fetchDestinationImage(destination),
    enabled: !!destination,
    staleTime: 60 * 1000,
  });

  return (
    <>
      <img
        src={destinationImage}
        className="h-[340px] w-full object-cover rounded-xl hover:scale-110 transition-all"
        alt={destination}
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
            {destination}
          </h2>

          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300 md:text-md">
              📅{trip?.userSelection?.nbOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300 md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-300 md:text-md">
              👥No of Traveler {trip?.userSelection?.travelWith}
            </h2>
          </div>
        </div>
        <Link to={`https://www.google.com/maps/search/?api=1&query=${destination}`} target="_blank">
          <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">
            <Send />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InfoSection;
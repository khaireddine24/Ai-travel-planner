import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import axios from 'axios';

const InfoSection = ({ trip }) => {
  const [destinationImage, setDestinationImage] = useState('/travel-plane.jpg');

  useEffect(() => {
    const fetchDestinationImage = async () => {
      try {
        const destination = trip?.userSelection?.destination?.label;
        if (!destination) return;

        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: destination,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            per_page: 1
          }
        });

        if (response.data.results.length > 0) {
          setDestinationImage(response.data.results[0].urls.regular);
        }
      } catch (error) {
        console.error('Error fetching destination image:', error);
        setDestinationImage('/travel-plane.jpg');
      }
    };

    fetchDestinationImage();
  }, [trip?.userSelection?.destination?.label]);

  return (
    <>
      <img
        src={destinationImage}
        className="h-[340px] w-full object-cover rounded-xl hover:scale-110 transition-all"
        alt={trip?.userSelection?.destination?.label}
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination?.label}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">
              📅{trip?.userSelection?.nbOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md">
              👥No of Traveler {trip?.userSelection?.travelWith}
            </h2>
          </div>
        </div>
        <Link to={`https://www.google.com/maps/search/?api=1&query=${trip?.userSelection?.destination?.label}`} target='_blank'>
          <Button>
            <Send />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InfoSection;
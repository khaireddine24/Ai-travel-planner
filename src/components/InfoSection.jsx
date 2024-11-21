import React from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';

const InfoSection = ({ trip }) => {
  return (
    <>
      <img
        src="/travel-plane.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
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
        <Button>
          <Send />
        </Button>
      </div>
    </>
  );
};

export default InfoSection;

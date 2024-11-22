import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import DeleteTripDialog from './DeleteTripDialog';

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

const TripCardItem = ({ trip, onDeleteTrip, index }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const destination = trip?.tripData?.destination;
  const { data: tripImage = '/travel-plane.jpg' } = useQuery({
    queryKey: ['tripImage', destination],
    queryFn: fetchTripImage,
    enabled: !!destination,
    staleTime: 60 * 1000,
  });

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = () => {
    onDeleteTrip(trip.id);
  };

  return (
    <>
      <Link to={`/ViewTrip/${trip?.id}`} className="relative block">
        <div 
          className="group hover:scale-105 transition-all bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900 relative"
        >
          <button 
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400 hover:scale-110 transition-transform" />
          </button>
          <div className="relative h-48 overflow-hidden">
            <img
              src={tripImage}
              alt={destination}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{destination}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {trip?.tripData?.days} Days trip • {trip?.tripData?.budget}
            </p>
          </div>
        </div>
      </Link>

      <DeleteTripDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        tripId={trip.id}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default TripCardItem;
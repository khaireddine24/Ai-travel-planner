import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { detailIcons } from '@/constants/option';
import renderRatingStars from './renderRatingStars';

const fetchPlaceImage = async ({ queryKey }) => {
  const [, placeName] = queryKey;

  if (!placeName) return '/travel-plane.jpg';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${placeName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error('Error fetching place image:', error);
  }

  return '/travel-plane.jpg';
};

const PlaceCardItem = ({ place }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { data: placeImage = '/travel-plane.jpg' } = useQuery({
    queryKey: ['placeImage', place.PlaceName],
    queryFn: fetchPlaceImage,
    enabled: !!place.PlaceName,
    staleTime: 60 * 1000,
  });

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.PlaceName}`}
      target="_blank"
      className="block"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={placeImage}
            alt={place.PlaceName}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
            <ExternalLink size={16} className="text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
              {place.PlaceName}
            </h2>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <detailIcons.location size={16} className="mr-1" />
              <p className="text-sm truncate">{place.PlaceDetails}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">{renderRatingStars(place.Rating)}</div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <detailIcons.ticket size={16} className="mr-2" />
              <span className="text-sm">{place.TicketPricing || 'Free Entry'}</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <detailIcons.travelTime size={16} className="mr-2" />
              <span className="text-sm">{place.TimeTravel || 'Time not specified'}</span>
            </div>

            {place.additionalInfo && (
              <div className="flex items-start text-gray-600 dark:text-gray-300 mt-2">
                <detailIcons.additionalInfo size={16} className="mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm">{place.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;

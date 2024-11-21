import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import axios from 'axios';
import { Star, Clock, Ticket, MapPin, Info, ExternalLink } from 'lucide-react';

const PlaceCardItem = ({ place }) => {
  const [placeImage, setPlaceImage] = useState('/travel-plane.jpg');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchPlaceImage = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              query: place.PlaceName,
              client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
              per_page: 1,
            },
          },
        );

        if (response.data.results.length > 0) {
          setPlaceImage(response.data.results[0].urls.regular);
        }
      } catch (error) {
        console.error('Error fetching place image:', error);
        setPlaceImage('/travel-plane.jpg');
      }
    };

    if (place.PlaceName) {
      fetchPlaceImage();
    }
  }, [place.PlaceName]);

  const renderRatingStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : index === fullStars && hasHalfStar
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'text-gray-300'
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating || 'N/A'}</span>
      </div>
    );
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.PlaceName}`}
      target="_blank"
      className="block"
    >
      <div
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative">
          <img
            src={placeImage}
            alt={place.PlaceName}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
            <ExternalLink size={16} className="text-blue-500" />
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4">
          <div className="mb-3">
            <h2 className="font-bold text-lg text-gray-800 mb-1">
              {place.PlaceName}
            </h2>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <p className="text-sm truncate">{place.PlaceDetails}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-2">
            <div className="flex items-center">
              {renderRatingStars(place.Rating)}
            </div>

            {/* Ticket Price */}
            <div className="flex items-center text-gray-600">
              <Ticket size={16} className="mr-2" />
              <span className="text-sm">
                {place.TicketPricing || 'Free Entry'}
              </span>
            </div>

            {/* Travel Time */}
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">
                {place.TimeTravel || 'Time not specified'}
              </span>
            </div>

            {/* Additional Info if available */}
            {place.additionalInfo && (
              <div className="flex items-start text-gray-600 mt-2">
                <Info size={16} className="mr-2 mt-1 flex-shrink-0" />
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

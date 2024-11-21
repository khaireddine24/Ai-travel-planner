import React from 'react';
import { Link } from '@tanstack/react-router';

const PlaceCardItem = ({ place }) => {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place.PlaceName}`} target='_blank'>
    <div className="border rounded-xl p-4 shadow-md hover:scale-105 hover:shadow-md cursor-pointer transition-all">
      <img
        src='/travel-plane.jpg'
        alt={place.PlaceName}
        className="w-full h-40 rounded-t-xl object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800">{place.PlaceName}</h2>
        <p className="text-sm text-gray-600 mt-1">{place.PlaceDetails}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Rating:</span> {place.Rating || 'N/A'}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Ticket Pricing:</span>{' '}
            {place.TicketPricing || 'N/A'}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Time Travel:</span>{' '}
            {place.TimeTravel || 'N/A'}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default PlaceCardItem;
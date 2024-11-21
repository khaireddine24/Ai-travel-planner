import React from 'react';
import { getNestedProperty, sortItinerary } from '@/lib/utils';
import PlaceCardItem from './PlaceCardItem';

const Place = ({ trip }) => {
  const itinerary = getNestedProperty(trip, 'tripData.tripDetails.Itinerary');

  if (!itinerary || typeof itinerary !=='object') {
    return (
      <div className="p-4 text-gray-600 bg-gray-100 rounded-lg">
        No itinerary details available.
      </div>
    );
  }

  const sortedItinerary = sortItinerary(itinerary);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Places to Visit</h2>

      {sortedItinerary.map(([day, details], index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">{day}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {details.Plan.map((place, idx) => (
              <PlaceCardItem key={idx} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Place;
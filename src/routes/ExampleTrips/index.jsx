import React from 'react'
import { createFileRoute,Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import { exampleTrips } from '@/constants/option';
import TripExampleCard from '@/components/TripExampleCard';
import { ChevronRight} from 'lucide-react';

export const Route = createFileRoute('/ExampleTrips/')({
  component: ExampleTrips,
})


function ExampleTrips() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Example Trip Itineraries
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover AI-generated travel inspiration and create your perfect trip based on these examples.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleTrips.map((trip) => (
              <TripExampleCard key={trip.id} trip={trip} />
            ))}
          </div>
  
          <div className="mt-16 text-center">
            <Link to="/CreateTrip">
              <Button size="lg" className="bg-[#f56551] hover:bg-[#a3382a] text-white">
                Create Your Own Custom Trip
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Want something different? Let our AI create a personalized itinerary just for you.
            </p>
          </div>
        </div>
      </div>
    );
  };
export default ExampleTrips;

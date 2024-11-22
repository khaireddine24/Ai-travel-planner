import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import TripCardItem from '@/components/TripCardItem';
import Spinner from '@/components/Spinner';
import TripFilters from '@/components/TripFilter';
import filterTrips from '@/components/filterTrips';
import { toast } from 'sonner';

export const Route = createFileRoute('/MyTrips/')({
  component: MyTrips,
});

function MyTrips() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    destination: '',
    budget: ''
  });

  const destinations = [...new Set(trips.map(trip => trip.tripData?.destination))];
  const budgetOptions = ['Cheap', 'Moderate', 'Luxury'];

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;

      try {
        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
          console.error('User email not found.');
          return;
        }

        const q = query(collection(db, 'Trips'), where('userEmail', '==', email));
        const querySnapshot = await getDocs(q);

        const tripsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripsData);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(err.message);
      }
    };

    fetchTrips();
  }, [user]);

  const handleDeleteTrip = (deletedTripId) => {
    const updatedTrips = trips.filter(trip => trip.id !== deletedTripId);
    setTrips(updatedTrips);
    toast.success('Trip deleted successfully');
  };

  const filteredTrips = filterTrips(trips, filters);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 dark:text-red-400 text-center">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 mt-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
            My Trips
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTrips.length} trips found
          </p>
        </div>

        <TripFilters
          filters={filters}
          setFilters={setFilters}
          destinations={destinations}
          budgetOptions={budgetOptions}
        />

        {trips.length > 0 ? (
          <>
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip, index) => (
                  <TripCardItem 
                    trip={trip} 
                    key={index} 
                    onDeleteTrip={handleDeleteTrip}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No trips match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center py-12">
            <Spinner text="Loading Trips..." />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
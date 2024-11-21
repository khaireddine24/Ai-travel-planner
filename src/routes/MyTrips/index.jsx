import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import TripCardItem from '@/components/TripCardItem';

export const Route = createFileRoute('/MyTrips/')({
  component: MyTrips,
});

function MyTrips() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 wl:px-72 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>My Trips</h1>
      {trips.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
          {trips.map((trip) => (
            <TripCardItem trip={trip}/>
          ))}
        </div>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
}

import React,{useState,useEffect} from 'react';
import HotelCard from './HotelCard';
import axios from 'axios';

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    const fetchHotelImages = async () => {
      const imagePromises = trip?.tripData?.tripDetails?.Hotels?.map(async (hotel) => {
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
              query: hotel.HotelName,
              client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
              per_page: 1
            }
          });

          return {
            hotelName: hotel.HotelName,
            imageUrl: response.data.results.length > 0 
              ? response.data.results[0].urls.regular 
              : '/travel-plane.jpg'
          };
        } catch (error) {
          console.error(`Error fetching image for ${hotel.HotelName}:`, error);
          return {
            hotelName: hotel.HotelName,
            imageUrl: '/travel-plane.jpg'
          };
        }
      });

      const images = await Promise.all(imagePromises || []);
      const imagesMap = images.reduce((acc, img) => {
        acc[img.hotelName] = img.imageUrl;
        return acc;
      }, {});

      setHotelImages(imagesMap);
    };

    if (trip?.tripData?.tripDetails?.Hotels?.length > 0) {
      fetchHotelImages();
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.tripDetails?.Hotels?.length > 0 ? (
          trip?.tripData?.tripDetails?.Hotels?.map((hotel, index) => (
            <HotelCard 
              key={index} 
              hotel={hotel} 
              imageUrl={hotelImages[hotel.HotelName]}
            />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>No hotels available.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
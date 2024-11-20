import React, { useState, useMemo, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import debounce from 'lodash.debounce';
import { useQuery } from '@tanstack/react-query';
import { Combobox } from '@/components/combobox';
import { Input } from '@/components/ui/input';
import OptionService from '@/components/optionService';
import { SelectBudgetOptions, SelectTravels } from '@/constants/option';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Route = createFileRoute('/CreateTrip')({
  component: CreateTrip,
});

function CreateTrip() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    destination: null,
    nbOfDays: '',
    budget: '',
    travelWith: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenerateTrips=()=>{
    if(formData?.nbOfDays>5 && !formData?.destination || !formData?.budget || !formData?.travelWith){
      toast('Please fill all details');
      return ;
    }
    console.log(formData);
  }

  const fetchDestinations = async (query) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Erreur de recherche de destination');
    }
    const data = await response.json();
    return data.features.map((feature, index) => ({
      value: index.toString(),
      label: feature.properties.formatted,
      country: feature.properties.country,
      lat: feature.properties.lat,
      lon: feature.properties.lon,
    }));
  };

  const { data: destinations = [], refetch } = useQuery({
    queryKey: ['searchDestinations', searchTerm],
    queryFn: () => fetchDestinations(searchTerm),
    enabled: false,
  });

  const debouncedSearch = useMemo(() => {
    return debounce((query) => {
      if (query.length >= 3) {
        refetch();
      }
    }, 100);
  }, [refetch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleDestinationSelect = (selectedValue) => {
    const destination = destinations.find((dest) => dest.value === selectedValue);
    if (destination) {
      setSelectedDestination(destination);
      setSearchTerm(destination.label);
      setFormData({
        ...formData,
        destination: {
          label: destination.label,
          lat: destination.lat,
          lon: destination.lon,
          country: destination.country,
        },
      });
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🚞🌅</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What's your destination of choice?</h2>
          <div className='flex space-x-4'>
            <div className='flex-grow'>
              <Combobox
                options={destinations}
                value={searchTerm}
                onSearch={handleSearchChange}
                onSelect={handleDestinationSelect}
                placeholder='Search for a destination'
              />
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
            <Input
              placeholder={'Ex.2'}
              type='number'
              value={formData.nbOfDays}
              onChange={(e) => handleInputChange('nbOfDays', e.target.value)}
            />
          </div>

          <OptionService
            title="What is your budget?"
            options={SelectBudgetOptions}
            selectedValue={formData.budget}
            onSelect={(value) => handleInputChange('budget', value)}
          />

          <OptionService
            title="What do you plan on traveling with on your next adventure?"
            options={SelectTravels}
            selectedValue={formData.travelWith}
            onSelect={(value) => handleInputChange('travelWith', value)}
          />
        </div>
      </div>

      <div className='my-10 flex justify-end'>
        <Button onClick={OnGenerateTrips}>
          Generate Trip
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
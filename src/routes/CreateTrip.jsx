import React, { useState, useMemo } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useUser, SignInButton } from '@clerk/clerk-react';
import debounce from 'lodash.debounce';
import { useQuery } from '@tanstack/react-query';
import { Combobox } from '@/components/combobox';
import { Input } from '@/components/ui/input';
import OptionService from '@/components/OptionService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravels,
} from '@/constants/option';
import { chatSession } from '@/service/AIService';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

export const Route = createFileRoute('/CreateTrip')({
  component: CreateTrip,
});

function CreateTrip() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    destination: null,
    nbOfDays: '',
    budget: '',
    travelWith: '',
  });

  const fetchDestinations = async (query) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,
    );
    if (!response.ok) {
      throw new Error('Destination search error');
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
    }, 300);
  }, [refetch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleDestinationSelect = (selectedValue) => {
    const destination = destinations.find(
      (dest) => dest.value === selectedValue,
    );
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

  const sanitizeJsonResponse = (response) => {
    try {
      const jsonStartIndex = response.indexOf('{');
      const jsonEndIndex = response.lastIndexOf('}') + 1;
      
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        const sanitizedJson = response.slice(jsonStartIndex, jsonEndIndex);
        return sanitizedJson;
      }
      
      return '{}';
    } catch (error) {
      console.error('Sanitization error:', error);
      return '{}';
    }
  };

  const saveUserTrip = async (tripData, tripDetails) => {
    try {
      const docId = Date.now().toString();
      const tripDocRef = doc(db, 'Trips', docId);
      
      const tripDocument = {
        userSelection: formData,
        tripData: {
          ...tripData,
          tripDetails: tripDetails
        },
        userEmail: user?.primaryEmailAddress?.emailAddress,
        id: docId,
        createdAt: new Date().toISOString()
      };

      await setDoc(tripDocRef, tripDocument);
      return docId;
    } catch (error) {
      console.error('Error saving trip:', error);
      throw error;
    }
  };

  const OnGenerateTrips = async () => {
    const { destination, nbOfDays, budget, travelWith } = formData;
  
    if (!isSignedIn) {
      toast.error('Please sign in to generate a trip');
      return;
    }
  
    if (!destination || !nbOfDays || !budget || !travelWith) {
      toast.error('Please fill all trip details');
      return;
    }
  
    try {
      setIsLoading(true);
      const prompt = AI_PROMPT.replace('{location}', destination.label)
        .replace('{totalDays}', nbOfDays)
        .replace('{travelWith}', travelWith)
        .replace('{budget}', budget);
  
      const res = await chatSession.sendMessage(prompt);
      const rawResponse = res?.response?.text() || '{}';
      
      console.log('Raw AI Response:', rawResponse);
      
      let tripDetails = {};
      try {
        const sanitizedResponse = sanitizeJsonResponse(rawResponse);
        tripDetails = JSON.parse(sanitizedResponse);
      } catch (parseError) {
        console.error('JSON Parsing Error:', parseError);
        
        tripDetails = {
          hotels: [],
          itinerary: [],
          recommendations: []
        };
        
        toast.warning('Could not parse full trip details. Using default structure.');
      }
  
      const hotels = tripDetails.hotels || [];
  
      const tripData = {
        userId: user.id,
        destination: destination.label,
        days: nbOfDays,
        budget,
        travelType: travelWith,
        hotels,
      };
  
      const docId = await saveUserTrip(tripData, tripDetails);
      toast.success('Trip generated successfully!');
      navigate({ to: '/ViewTrip/$tripId', params: { tripId: docId } });
  
    } catch (error) {
      console.error('Trip generation error:', error);
      toast.error('Failed to generate trip');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-2 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto ">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Plan Your Perfect Trip 🌍✈️
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Share your travel preferences, and let us craft a personalized
          itinerary for you.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Destination</h3>
            <Combobox
              options={destinations}
              value={searchTerm}
              onSearch={handleSearchChange}
              onSelect={handleDestinationSelect}
              placeholder="Where do you want to go?"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Trip Duration</h3>
            <Input
              type="number"
              placeholder="Number of days"
              value={formData.nbOfDays}
              onChange={(e) => handleInputChange('nbOfDays', e.target.value)}
              min="1"
              max="30"
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <OptionService
            title="Budget Range"
            options={SelectBudgetOptions}
            selectedValue={formData.budget}
            onSelect={(value) => handleInputChange('budget', value)}
          />

          <OptionService
            title="Traveling Companions"
            options={SelectTravels}
            selectedValue={formData.travelWith}
            onSelect={(value) => handleInputChange('travelWith', value)}
          />

          <div className="text-right">
            <Button
              onClick={OnGenerateTrips}
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-800 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" />
                  Generating Trip...
                </div>
              ) : (
                <>
                  {!isSignedIn ? (
                    <SignInButton mode="modal">
                      <span>Sign In to Generate Trip</span>
                    </SignInButton>
                  ) : (
                    'Generate My Trip'
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
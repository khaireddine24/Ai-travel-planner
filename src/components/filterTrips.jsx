
const filterTrips = (trips,filters) => {
    return trips.filter(trip => {
      const matchesSearch = trip.tripData?.destination?.toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesDestination = !filters.destination || 
        trip.tripData?.destination === filters.destination;
      const matchesBudget = !filters.budget || 
        trip.tripData?.budget === filters.budget;
      
      return matchesSearch && matchesDestination && matchesBudget;
    });
  };

export default filterTrips;
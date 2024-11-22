import React,{useState} from 'react';
import { Search,X,SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

const TripFilters = ({ 
    filters, 
    setFilters, 
    destinations, 
    budgetOptions 
  }) => {
    const [showFilters, setShowFilters] = useState(false);
  
    return (
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 outline-none"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 dark:border-gray-700 dark:text-black dark:bg-slate-50 dark:hover:bg-gray-400"
          >
            {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
        </div>
  
        {showFilters && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Destinations</h3>
              <div className="flex flex-wrap gap-2">
                {destinations.map((dest) => (
                  <Button
                    key={dest}
                    variant={filters.destination === dest ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      destination: prev.destination === dest ? '' : dest
                    }))}
                    className="dark:border-gray-700 dark:bg-slate-50 dark:text-black dark:hover:bg-gray-400" 
                  >
                    {dest}
                  </Button>
                ))}
              </div>
            </div>
  
            <div>
              <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Budget Range</h3>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((budget) => (
                  <Button
                    key={budget}
                    variant={filters.budget === budget ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      budget: prev.budget === budget ? '' : budget
                    }))}
                    className="dark:border-gray-700 dark:bg-slate-50 dark:text-black dark:hover:bg-gray-400"
                  >
                    {budget}
                  </Button>
                ))}
              </div>
            </div>
  
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters({ searchTerm: '', destination: '', budget: '' })}
              className="mt-2 dark:border-gray-700 dark:text-black dark:bg-slate-50 dark:hover:bg-gray-400"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    );
  };

export default TripFilters;
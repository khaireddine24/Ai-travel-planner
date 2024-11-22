import { useState } from "react";
import { Clock, MapPin, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TripExampleCard = ({ trip }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleDestinationClick = (destination) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, '_blank');
    };
  
    return (
      <TooltipProvider>
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 overflow-hidden group">
            <img 
              src={trip.image} 
              alt={trip.title}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-center">
              <p className="text-white font-semibold">
                {trip.budget}
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <ExternalLink 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${trip.destinations.join('+')}`)}
                    className="text-white hover:text-blue-300 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Destinations on Map</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {trip.title}
            </h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>
                  {trip.destinations.map((destination, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center mr-2 cursor-pointer hover:text-blue-600"
                      onClick={() => handleDestinationClick(destination)}
                    >
                      {destination}
                      <ExternalLink className="w-3 h-3 ml-1 text-gray-500 hover:text-blue-600" />
                    </span>
                  )).reduce((prev, curr) => [prev, ' • ', curr])}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{trip.season}</span>
              </div>
            </div>
    
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Trip Highlights</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {trip.highlights.map((highlight, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <ChevronRight className="w-4 h-4 mr-1 text-blue-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Perfect For</h4>
                <div className="flex flex-wrap gap-2">
                  {trip.bestFor.map((type, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
    
            <div className="p-6 pt-0">
                <Link to="/CreateTrip" className="w-full">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Create Similar Trip
                    </Button>
                </Link>
            </div>
        </div>
      </TooltipProvider>
    );
  };

export default TripExampleCard;
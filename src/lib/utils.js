import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const extractDayNumber = (dayString) => {
  return parseInt(dayString.replace('Day', ''), 10);
};

export const sortItinerary = (itinerary) => {
  return Object.entries(itinerary).sort(
    ([dayA], [dayB]) => extractDayNumber(dayA) - extractDayNumber(dayB)
  );
};

export const getNestedProperty = (obj, path, defaultValue = null) => {
  return path.split('.').reduce(
    (acc, part) => acc && acc[part] !== undefined ? acc[part] : defaultValue, 
    obj
  );
};

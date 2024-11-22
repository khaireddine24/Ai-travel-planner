import { 
User, Users, 
Home,DollarSign, 
BarChart2, Crown, 
Ticket, Clock, 
Info,Brain, MapPin, 
Shield, Compass, 
Hotel, Plane,Calendar
} 

from 'lucide-react';

export const SelectTravels=[
    {
        id: 1,
        title:'Just Me',
        description:'A sole traveles in exploration',
        icon:<User/>,
        people:'1'
    },
    {
        id: 2,
        title:'Friends',
        description:'A group of friends on a adventure',
        icon:<Users/>,
        people:'2 peoples'
    },
    {
        id: 3,
        title:'Family',
        description:'A family on a vacation',
        icon:<Home/>,
        people:'3 to 6 peoples'
    }
]

export const SelectBudgetOptions=[
    {
        id: 1,
        title:'Cheap',
        description:'Stay conscious of costs',
        icon:<DollarSign/>,
    },
    {
        id: 2,
        title:'Moderate',
        description:'A balance between cost and quality',
        icon:<BarChart2/>,
    },
    {
        id: 3,
        title:'Luxury',
        description:'Experience the best',
        icon:<Crown/>,
    }
]

export const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Personalized itineraries crafted by advanced AI algorithms based on your preferences"
    },
    {
      icon: Compass,
      title: "Recommendations",
      description: "Discover hidden gems and authentic local experiences tailored to your interests"
    },
    {
      icon: Hotel,
      title: "Curated Stays",
      description: "Hand-picked accommodations that match your style and budget perfectly"
    },
    {
      icon: Calendar,
      title: "Flexible Planning",
      description: "Easily adjust your itinerary with real-time updates and smart rescheduling"
    },
    {
      icon: Plane,
      title: "Travel Logistics",
      description: "Seamless transportation planning and booking assistance"
    },
    {
      icon: MapPin,
      title: "Local Insights",
      description: "Access to insider tips and cultural recommendations from locals"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Stay informed with live updates on weather, events, and bookings"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Book with confidence using our secure and transparent system"
    }
  ];

export const detailIcons = {
    location: MapPin,
    ticket: Ticket,
    travelTime: Clock,
    additionalInfo: Info,
};

export const StatDetails=[
    { number: "1000+", label: "Trips Planned" },
    { number: "50+", label: "Countries" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "AI Support" },
  ];

export const exampleTrips = [
    {
      id: 1,
      title: "Cultural Tour of Japan",
      description: "A 10-day journey through Tokyo, Kyoto, and Osaka, exploring temples, modern culture, and culinary delights.",
      duration: "10 days",
      destinations: ["Tokyo", "Kyoto", "Osaka"],
      bestFor: ["Culture lovers", "Foodies", "First-time visitors"],
      season: "Spring (Cherry Blossom)",
      image: "images/japan.jpg",
      budget: "$3,000 - $4,000",
      highlights: [
        "Tea ceremony in Kyoto",
        "Tsukiji Fish Market tour",
        "Mount Fuji day trip",
        "Traditional ryokan stay"
      ]
    },
    {
      id: 2,
      title: "Mediterranean Adventure",
      description: "Experience the best of Greece and Italy in this 14-day Mediterranean exploration combining history, beaches, and cuisine.",
      duration: "14 days",
      destinations: ["Rome", "Athens", "Santorini"],
      bestFor: ["History buffs", "Beach lovers", "Couples"],
      season: "Summer",
      image: "images/roma.jpg",
      budget: "$4,500 - $5,500",
      highlights: [
        "Colosseum guided tour",
        "Santorini sunset cruise",
        "Athens food tour",
        "Italian cooking class"
      ]
    },
    {
      id: 3,
      title: "Costa Rica Eco-Adventure",
      description: "An 8-day sustainable travel experience combining rainforest adventures, wildlife spotting, and beach relaxation.",
      duration: "8 days",
      destinations: ["Manuel Antonio", "Arenal", "Tamarindo"],
      bestFor: ["Nature lovers", "Adventure seekers", "Eco-tourists"],
      season: "Dry Season (Dec-Apr)",
      image: "images/costaRica.jpg",
      budget: "$2,500 - $3,500",
      highlights: [
        "Rainforest zip-lining",
        "Sloth sanctuary visit",
        "Volcano hot springs",
        "Surfing lessons"
      ]
    }
  ];

export const AI_PROMPT="generate Travel Plan for location :{location},for {totalDays} days for {travelWith} with a {budget} budget ,give me a Hotels options list with HotelName,Hotel address,Price ,hotel image url ,geo coordinates ,rating ,descriptions, and suggest itinerary with PlaceName,PlaceDetails,Place Image Url,Geo Coordinates,ticket Pricing,rating,Time travel each of location for {totalDays} days with each day plan with best time to visit in JSON Format."
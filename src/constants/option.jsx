import { User, Users, Home,DollarSign, BarChart2, Crown} from 'lucide-react';

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

export const AI_PROMPT="generate Travel Plan for location :{location},for {totalDays} days for {travelWith} with a {budget} budget ,give me a Hotels options list with HotelName,Hotel address,Price ,hotel image url ,geo coordinates ,rating ,descriptions, and suggest itinerary with PlaceName,PlaceDetails,Place Image Url,Geo Coordinates,ticket Pricing,rating,Time travel each of location for {totalDays} days with each day plan with best time to visit in JSON Format."
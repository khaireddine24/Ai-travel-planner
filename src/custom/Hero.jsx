import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">Discover Your Next Adventure:</span>
        Personalized Itineraries
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Explore the world with our expertly curated travel itineraries, tailored
        to your interests and preferences
      </p>
      <Link to="/CreateTrip">
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  )
}

export default Hero
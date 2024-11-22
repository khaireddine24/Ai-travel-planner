import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { features } from '@/constants/option';
import FeatureCard from '@/components/FeatureCard';
import Stats from '@/components/Stats';
import GradientBackground from '@/components/GradientBackground';

const Hero = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <GradientBackground>
        <div className="container mx-auto px-4 pt-24 pb-20">
          <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto text-center relative">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f56551] to-orange-500">
                  Your Dream Trip
                </span>
                <span className="block text-gray-900 dark:text-white">Planned by AI</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Experience the future of travel planning with our AI-powered platform. 
                Create personalized itineraries, discover hidden gems, and book with confidence.
              </p>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link to="/CreateTrip">
                <Button
                  size="lg"
                  className="bg-[#f56551] hover:bg-[#e54531] shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Start Planning Free
                </Button>
              </Link>
              <Link to="/examples">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-black dark:hover:bg-gray-800 w-full sm:w-auto"
                >
                  View Sample Trips
                </Button>
              </Link>
            </div>
          </div>
          <Stats />
        </div>
      </GradientBackground>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Why Choose Our AI Travel Planner?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock a smarter way to plan your travels with our comprehensive suite of features
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#f56551] to-orange-400">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center text-white gap-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">Ready for Your Next Adventure?</h2>
            <p className="text-xl">
              Join thousands of happy travelers who have discovered their perfect trips with our AI planner.
              Start your journey today!
            </p>
            <Link to="/CreateTrip">
              <Button
                size="lg"
                className="bg-white text-[#f56551] hover:bg-gray-100 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                Create Your Perfect Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

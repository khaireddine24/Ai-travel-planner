import { useUser } from '@clerk/clerk-react'
import React from 'react'

const Footer = () => {
  const { user } = useUser()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={user?.imageUrl || '/default-avatar.png'} 
                alt={user?.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Created by <span className="font-medium text-gray-900 dark:text-white">{user?.fullName}</span>
            </p>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>Plan your perfect trip with TravelPlan</p>
            <p>© {new Date().getFullYear()} TravelPlan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
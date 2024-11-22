import React, { useState, useEffect } from 'react'
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { toast } from 'sonner'
import InfoSection from '@/components/InfoSection'
import Hotels from '@/components/Hotels'
import Place from '@/components/Place'
import Footer from '@/custom/Footer'
import Spinner from '@/components/Spinner'

export const Route = createFileRoute('/ViewTrip/$tripId/')({
  component: ViewTrip,
})

function ViewTrip() {
  const { tripId } = useParams({ from: '/ViewTrip/$tripId/' })
  const [tripData, setTripData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripDocRef = doc(db, 'Trips', tripId)
        const tripDocSnap = await getDoc(tripDocRef)

        if (tripDocSnap.exists()) {
          setTripData(tripDocSnap.data())
        } else {
          toast.error('Trip not found')
          navigate('/CreateTrip')
        }
      } catch (error) {
        console.error('Error fetching trip details:', error)
        toast.error('Failed to load trip details')
        navigate('/CreateTrip')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTripDetails()
  }, [tripId, navigate])

  if (isLoading) {
    return (
        <Spinner text={'Loading your trip details...'}/>
    )
  }

  if (!tripData) {
    return null
  }

  return (
    <div className="min-h-screen mt-2 bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white dark:bg-gray-800  rounded-xl shadow-sm p-6">
            <InfoSection trip={tripData} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <Hotels trip={tripData} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <Place trip={tripData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { createFileRoute, useParams, useNavigate, Link } from '@tanstack/react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { Loader} from 'lucide-react'
import { toast } from 'sonner'
import InfoSection from '@/components/InfoSection'
import Hotels from '@/components/Hotels'
import Place from '@/components/Place'
import Footer from '@/custom/Footer'

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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
        <p className="mt-4 text-gray-600">Loading your trip details...</p>
      </div>
    )
  }

  if (!tripData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <InfoSection trip={tripData} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Hotels trip={tripData} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Place trip={tripData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
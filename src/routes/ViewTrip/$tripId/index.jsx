import React,{useState,useEffect} from 'react'
import { createFileRoute, useParams,useNavigate,Link } from '@tanstack/react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import InfoSection from '@/components/InfoSection'
import Hotels from '@/components/Hotels'
import Place from '@/components/Place'

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
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-12 h-12" />
      </div>
    )
  }

  if (!tripData) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <InfoSection trip={tripData}/>
        <Hotels trip={tripData}/>
        <Place trip={tripData}/>

        <div className="mt-6 flex justify-center">
          <Link to='/CreateTrip'>
            <Button>
                Create Another Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewTrip
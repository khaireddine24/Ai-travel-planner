import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/CreateTrip')({
  component: () => <CreateTrip/>,
})

const CreateTrip = () => {
  return <div>create</div>
}

export default CreateTrip;

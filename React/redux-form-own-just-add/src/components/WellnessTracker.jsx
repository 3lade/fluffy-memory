import React from 'react'
import WellnessForm from './WellnessForm'
import WellnessSummary from './WellnessSummary'

function WellnessTracker() {
  return (
    <div>
    <h1>Daily Wellness Tracker</h1>
    <WellnessForm/>
    <WellnessSummary/>
    </div>
  )
}

export default WellnessTracker
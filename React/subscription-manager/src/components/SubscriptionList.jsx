import React, { useState } from 'react'
import SubscriptionForm from './SubscriptionForm'
import SubscriptionItem from './SubscriptionItem'

function SubscriptionList() {

    const [subs, setSubs] = useState([])

    const addSub = (newSub) => {
        setSubs((prevState) => [...prevState, newSub])
        console.log(newSub);
    }

    const deleteSub = (id) => {
        setSubs((prevState) => prevState.filter(sub => sub.id !== id))
    }

    const totalMonthlyCost = subs.reduce((total, curr) => total + curr.cost, 0)

    const yearlyCost = totalMonthlyCost * 12;

  return (
    <div className='list'>
        <h1>Subscription Manager</h1>
        <SubscriptionForm addSub={addSub}/>
        {subs.length > 0 ? 
        <>
          <SubscriptionItem subs={subs} deleteSub={deleteSub}/>
          <p><strong>Total Monthly Cost</strong></p>
          {totalMonthlyCost && <p>₹{totalMonthlyCost}</p>}
          {yearlyCost && <p>Yearly: {yearlyCost}</p>}
        </>
        : ""}

    </div>
  )
}

export default SubscriptionList
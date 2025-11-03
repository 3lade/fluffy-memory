// Use this Initial data:
import React, { useMemo } from 'react'

const data = [
    { id: 1, service: 'Netflix', cost: 499, category: 'Entertainment' },
    { id: 2, service: 'Spotify', cost: 199, category: 'Music' },
    { id: 3, service: 'Google Drive', cost: 149, category: 'Cloud Storage' },
]


function SubscriptionTracker() {

    const summaryMetrics = useMemo(() => {
        const totalSubs = data.length
        const monthlyCost = data.reduce((sum, subs) => sum + subs.cost, 0)
        const totalAvdMontlyCost = monthlyCost / totalSubs

        // const HighestSubCost = data.reduce((max, subs) => {
        //     if(subs.cost > max.cost)
        //     {
        //         max = subs;
        //     }
        //     return max;
        // }, {cost: 0})
        const HighestSubCost = [...data].sort((a,b) => b.cost-a.cost)[0]
        
        // const LowestSubCost = data.reduce((min, subs) => {
        //     if(subs.cost < min.cost)
        //     {
        //         min = subs;
        //     }
        //     return min;
        // }, {cost: Infinity})
        const LowestSubCost = [...data].sort((a,b) => a.cost-b.cost)[0]


        return {
            totalSubs,
            monthlyCost,
            totalAvdMontlyCost,
            HighestSubCost,
            LowestSubCost
        }

    }, []) //[data]---becomes an unnecessary dependency

  return (
    <div>
        <h1>Subscription Tracker</h1>
        <div className='tracker'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Monthly Cost</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.service}</td>
                            <td>${item.cost}</td>
                            <td>{item.category}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <section className='summary-section'>
            <div className='summary-card'>
                <h1>Total Subscriptions</h1>
                <p>${summaryMetrics.totalSubs}</p>
                  
            </div>

            <div className='summary-card'>
                <h1>Total Monthly Cost</h1>
                <p>${summaryMetrics.monthlyCost}</p>
                  
            </div>

            <div className='summary-card'>
                <h1>Average Monthly Cost</h1>
                <p>${summaryMetrics.totalAvdMontlyCost}</p>
                  
            </div>

            <div className='summary-card'>
                <h1>Highest Cost Subscription</h1>
                <p>{summaryMetrics.HighestSubCost.service} (${summaryMetrics.HighestSubCost.cost})</p>
                  
            </div>

            <div className='summary-card'>
                <h1>Lowest Cost Subscription</h1>
                <p>{summaryMetrics.LowestSubCost.service} (${summaryMetrics.LowestSubCost.cost})</p>
                  
            </div>

        </section>
    </div>
  )
}

export default SubscriptionTracker
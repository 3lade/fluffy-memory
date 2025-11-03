import React from 'react'

function SubscriptionItem({subs, deleteSub}) {

  const body = () => {
    return (
      <>
      {
        subs.map((sub) => (
          <tr key={sub.id}>
          <td>{sub.name}</td>
          <td>₹{sub.cost}</td>
          <td>{sub.category || 'N/A'}</td>
          <td>
            <button onClick={() => deleteSub(sub.id)} className='remove-btn'>Delete</button>
          </td>
        </tr>
        ))
      }
      </>
    )
  }

  return (
    <div className='item'>
      <h3>Your Subscription</h3>
      {subs.length > 0 ? 
      <table className='sub-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {body()}
        </tbody>
      </table>
     : "" 
    }
    </div>
  )
}

export default SubscriptionItem
import React from 'react'

function FreezingWarning({celsius}) {
    if(celsius<=0 && celsius !== "")
    {
        return (
          <>
            <p>{`🥶Water Freeze at ${celsius}`}</p>
          </>
        )
    }
    return null
}

export default FreezingWarning
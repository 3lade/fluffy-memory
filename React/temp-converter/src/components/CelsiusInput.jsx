import React from 'react'

function CelsiusInput({value, onChange}) {
  return (
    <div>
        <input
            type='number'
            value={value}
            placeholder='Enter in Celsius...'
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  )
}

export default CelsiusInput
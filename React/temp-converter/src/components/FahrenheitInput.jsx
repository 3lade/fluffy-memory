import React from 'react'

function FahrenheitInput({value, onChange}) {
  return (
    <div>
        <input
            type='number'
            value={value}
            placeholder='Enter in Fahrenheit...'
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  )
}

export default FahrenheitInput
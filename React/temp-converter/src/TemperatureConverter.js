import React, { useState } from 'react'
import CelsiusInput from './components/CelsiusInput'
import FahrenheitInput from './components/FahrenheitInput';
import FreezingWarning from './components/FreezingWarning';

function TemperatureConverter() {

    const [celsius, setCelsius] = useState("");

    const celsiusConverter = (temp) => {
        setCelsius(temp)
    }

    const fahrenheitConverter = (temp) => {
        if(temp==="") {
            setCelsius("")
        } else {
            const c = (temp - 32) * 5 / 9;
            setCelsius(c)
        }
    }

    const fahrenheit = celsius === "" ? "" : ((celsius * 9 / 5 ) + 32)


  return (
    <div>
        <h1>Temperature Converter</h1>

        <CelsiusInput 
            value={celsius}
            onChange={celsiusConverter}
        />

        <FahrenheitInput 
            value={fahrenheit}
            onChange={fahrenheitConverter}
        />

        <FreezingWarning celsius={celsius}/>

    </div>
  )
}

export default TemperatureConverter
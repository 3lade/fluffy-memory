import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearEntries } from '../redux/wellnessSlice';

function WellnessSummary() {

  const entries = useSelector(state => state.wellness.entries)
  console.log(entries)

  const dispatch = useDispatch();

  // input,
  // selectedOptions,
  // selectedRadio,
  // sliderValue,
  // inputNumber,
  // goalChecked

  if(entries.length === 0)
  {
    return (
      <p>no wellness data submitted</p>
    )
  }

  const handleClear = () => {
    dispatch(clearEntries());
  }

  return (
    <div>
      <div>
        {
          entries.map((entry, index) => (
            <div key={index}>
              <p>Name: {entry.input}</p>
              {
                entry.selectedOptions.length > 0 && <p>Hydration: {entry.selectedOptions.join(', ')}</p>
              }
              <p>Mood: {entry.selectedRadio}</p>
              <p>Sleep: {entry.sliderValue}</p>
              <p>Screen Time: {entry.inputNumber}</p>
              <p>Goal Completed: {entry.goalChecked}</p>
            </div>

          ))
        }
      </div>
      <button onClick={handleClear}>clear all</button>
    </div>
  )
}

export default WellnessSummary
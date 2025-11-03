import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCrop } from '../redux/cropSlice'

function CropList({setCurrentCrop}) {
  const cropData = useSelector(state => state.crops)
  const dispatch = useDispatch()
  return (
    <div>
      <ul>
        {
          cropData.length === 0 ? "No crops added" :
          cropData.map((crop) => (
            <li key={crop.id}>
              <span>{crop.name} - {crop.type} - {crop.quantity}</span>
              <button onClick={() => setCurrentCrop(crop)}>Edit</button>
              <button onClick={() => dispatch(deleteCrop(crop.id))}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CropList
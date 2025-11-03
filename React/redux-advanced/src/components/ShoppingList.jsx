
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, deleteItem, editItem, toggleItem } from '../redux/shoppingSlice'

function ShoppingList() {
    const [input, setInput] = useState('')
    const [editData, setEditData] = useState(null)

    const shoppingList = useSelector(state => state.shopping)

    const dispatch = useDispatch()

    const handingAddItem = (payload) => {
        if (payload.trim()) {
            dispatch(addItem(payload))
            console.log(payload)
        }
        setInput('')
    }

    const handleSave = (editId) => {
        dispatch(editItem({ id: editId, name: editData.name }))
        console.log(editData)
        setEditData(null)
    }

    const handleEditSave = (e, id) => {
        if (e.key === 'Enter') {
            handleSave(id)
        }
        if (e.key === 'Escape') {
            setEditData(null)
        }
    }

    return (
        <div>
            <h1>My Shopping List</h1>
            <div className='from-input'>
                <input type='text'
                    placeholder='Enter item...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handingAddItem(input)
                        else if (e.key === 'Escape') setInput('')
                    }}
                    aria-label='add-input-field'
                />
                <button onClick={() => handingAddItem(input)} aria-label='add-button'>Add</button>
                <>
                    {
                        shoppingList.length === 0 ? "No items in your list."
                            :
                            <ul>
                                {
                                    shoppingList.map((item) => (
                                        <div>
                                            <li key={item.id}>
                                                <input type='checkbox'
                                                    aria-label='toggle-input-field'
                                                    checked={item.completed}
                                                    onChange={() => dispatch(toggleItem({ id: item.id, completed: item.completed }))}
                                                />
                                                {editData && editData.id === item.id ? (
                                                    <>
                                                        <input type='text'
                                                            aria-label='edit-input-value'
                                                            value={editData.name}
                                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                            onKeyDown={(e) => handleEditSave(e, editData.id)}
                                                            autoFocus
                                                        />
                                                        <button onClick={() => handleSave(editData.id)}>Save</button>
                                                    </>
                                                ) : <>
                                                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.name}</span>
                                                    <button onClick={() => setEditData(item)}>Edit</button>
                                                    <button onClick={() => dispatch(deleteItem(item.id))}>Delete</button>
                                                </>
                                                }
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                    }
                </>
            </div>
        </div>
    )
}

export default ShoppingList

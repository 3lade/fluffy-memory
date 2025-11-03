import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, editItem, toggleItem } from './redux/shoppingSlice';

function ShoppingList() {
    const [inputItem, setInputItem] = useState('');
    const [editing, setEditing] = useState(null)

    const listData = useSelector(state => state.shopping)

    const dispatch = useDispatch()

    const handleAdd = () => {
        if (inputItem.trim()) {
            dispatch(addItem(inputItem));
            setInputItem('')
        }
    }


    const handleEdit = () => {
        if (editing && inputItem.trim()) {
            dispatch(editItem({ id: editing.id, newItem: inputItem }))
            setEditing(null)
            setInputItem('')
        }
    }

    return (
        <div>
            <input type='text'
                placeholder='Enter item...'
                value={inputItem}
                onChange={(e) => setInputItem(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
            />
            <button type='submit' onClick={handleAdd} disabled={editing}>Add</button>

            {
                listData.length === 0 ? "No items in your list."
                    :
                    <ul>
                        {
                            listData.map((item) => (
                                <li key={item.id}>
                                    <div>
                                        <input type='checkbox'
                                            checked={item.completed}
                                            onChange={() => dispatch(toggleItem({ id: item.id }))}
                                        />
                                        {item.name}
                                        <>
                                            {editing?.id === item.id ? (
                                                <>
                                                <input type='text'
                                                    value={inputItem}
                                                    onChange={(e) => setInputItem(e.target.value)}
                                                />
                                                    <button onClick={handleEdit}>Save</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => { setEditing(item); setInputItem(item.name) }}>Edit</button>
                                                    <button onClick={() => dispatch(deleteItem(item.id))}>Delete</button>
                                                </>)
                                            }
                                        </>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

            }
        </div>

    )
}

export default ShoppingList
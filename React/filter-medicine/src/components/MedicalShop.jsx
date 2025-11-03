import React, { useState } from 'react'

const initialData = [
    { id: 1, name: 'Paracetamol', quantity: '50', price: '2.5' },
    { id: 2, name: 'Aspirin', quantity: '30', price: '3' },
    { id: 3, name: 'Band-Aid', quantity: '100', price: '1' },
]

function MedicalShop() {
    const [medicine, setMedicine] = useState(initialData)
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        price: ""
    })
    const [searchValue, setSearchValue] = useState('');

    const filterMedicine = medicine.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(filterMedicine)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleForm = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.quantity || !formData.price) {
            alert("Please fill in all fields")
            return
        }
        const newMedicine = {
            id: medicine.length + 1,
            name: formData.name,
            quantity: formData.quantity,
            price: formData.price
        }

        setMedicine((prev) => [...prev, newMedicine])
        setFormData({
            name: '',
            quantity: '',
            price: ''
        })


    }



    return (
        <div>
            <h1>Medical Shop Inventory</h1>
            <input type="text"
                placeholder='Search by name...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filterMedicine.length === 0 ? `No medicines found matching "${searchValue}".`
                        :
                        <>
                        {
                            filterMedicine.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))
                        }
                        </>

                    }
                </tbody>
            </table>
            <h3>Add New Medicine</h3>
            <form className='form' onSubmit={handleForm}>
                <input type="text"
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <input type="Quantity"
                    placeholder='Quantity'
                    name='quantity'
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <input type="text"
                    placeholder='Price'
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                />
                <button type='submit'>Add Medicine</button>
            </form>

        </div>
    )
}

export default MedicalShop
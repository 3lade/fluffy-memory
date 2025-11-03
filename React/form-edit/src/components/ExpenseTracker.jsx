import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseTracker() {
    const [expenseData, setExpenseData] = useState([]);
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
    });
    const [editingId, setEditingId] = useState(null);

    const API_URL = "https://ide-eeebbcdcdac334793291dedfacdfccfbone.premiumproject.examly.io/proxy/3003/expenses";

    const fetchData = async () => {
        try {
            const response = await axios(API_URL);
            setExpenseData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = async () => {
        try {
            const response = await axios.post(API_URL, {
                description: formData.description,
                amount: formData.amount
            });
            if (response.status === 200 || response.status === 201) {
                fetchData();
            }
        } catch (error) {
            console.error("Error adding data:", error.message);
        }
    };

    const updateData = async () => {
        try {
            const response = await axios.put(`${API_URL}/${editingId}`, {
                description: formData.description,
                amount: formData.amount
            });
            if (response.status === 200 || response.status === 201) {
                fetchData();
                setEditingId(null);
            }
        } catch (error) {
            console.error("Error updating data:", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setExpenseData((prevData) => prevData.filter(data => data.id !== id));
        } catch (error) {
            console.error("Error deleting data:", error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.description || !formData.amount) {
            alert("Please fill all the values");
            return;
        }
        if (isNaN(formData.amount)) {
            alert("Amount must be a number");
            return;
        }

        if (editingId) {
            updateData();
        } else {
            addData();
        }

        setFormData({ description: "", amount: "" });
    };

    const startEditing = (data) => {
        setFormData({ description: data.description, amount: data.amount });
        setEditingId(data.id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id='description'
                    placeholder='Description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id='amount'
                    placeholder='Amount'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                />
                <button type='submit'>{editingId ? "Update Expense" : "Add Expense"}</button>
            </form>

            <h1>Expenses</h1>
            <table className='table-data'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseData.length === 0 ? (
                        <tr><td colSpan="3">No data found</td></tr>
                    ) : (
                        expenseData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.description}</td>
                                <td>{data.amount}</td>
                                <td>
                                    <button onClick={() => startEditing(data)}>Edit</button>
                                    <button onClick={() => handleDelete(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseTracker;

















// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function ExpenseTracker() {

//     const [expenseData, setExpenseData] = useState([]);
//     const [formData, setFormData] = useState({
//         description: "",
//         amount: "",
//     })
//     const [editingId, setEditingId] = useState(null)

//     const API_URL = "https://ide-eeebbcdcdac334793291dedfacdfccfbone.premiumproject.examly.io/proxy/3003/expenses"


//     const fetchData = async () => {
//         try {
//             const response = await axios(API_URL)
//             console.log(response.data)
//             setExpenseData(response.data)
//         } catch (error) {
//             console.log(error.message)
//         }
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const addData = async () => {
//         const response = await axios.post(API_URL, {
//             description: formData.description,
//             amount: formData.amount
//         })
//         if (response.status === 200 || response.status === 201) {
//             const finalData = response.data;
//             // setExpenseData((prevData) => [...prevData, finalData])
//             fetchData()
//             console.log(response.data);

//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!formData.description || !formData.amount) {
//             alert("Please fill all the values")
//         }
//         const newData = {
//             description: formData.description,
//             amount: formData.amount
//         }

//         addData(newData)    
//         setFormData({
//             description: "",
//             amount: ""
//         })
//         // fetchData();
//     }

//     const handleEdit = async (data) => {
//         try {           
//             const response = await axios.put(`${API_URL}/${data.id}`, {
//                 description: formData.description,
//                 amount: formData.amount
//             })
//             if(response.status === 200 || response.status === 201)
//             {
//                 fetchData()
//                 setEditingId(null)
//             }
//         } catch (error) {
//             console.log(error.message)
//         }
//     }

//     const handleDelete = async (id) => {
//         await axios.delete(`${API_URL}/${id}`)
//         setExpenseData((prevData) => prevData.filter(data => data.id !== id))
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({ ...prevState, [name]: value }))
//     }

//     return (
//         <div>
//             <h1>Expense Tracker</h1>
//             <form className='form' onSubmit={handleSubmit}>
//                 <label htmlFor="description">Description:</label>
//                 <input type="text"
//                     id='description'
//                     placeholder='Description'
//                     name='description'
//                     value={formData.description}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="amount">Amount:</label>
//                 <input type="text"
//                     id='amount'
//                     placeholder='Amount'
//                     name='amount'
//                     value={formData.amount}
//                     onChange={handleChange}
//                 />
//                 <button type='submit'>Add Expense</button>
//             </form>
//             <h1>Expenses</h1>
//             <>
//                 <table className='table-data'>
//                     <thead>
//                         <tr>
//                             <th>Description</th>
//                             <th>Amount</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenseData.length === 0 ? "No data found" :
//                             expenseData.map((data, id) => (
//                                 <tr key={id}>
//                                     <td>{data.description}</td>
//                                     <td>{data.amount}</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(data)}>Edit</button>
//                                         <button onClick={() => handleDelete(data.id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </>
//         </div>
//     )
// }

// export default ExpenseTracker
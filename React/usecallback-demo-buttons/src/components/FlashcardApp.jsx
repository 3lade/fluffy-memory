import React, { useState } from 'react'

const data = [
    {id: 1, title: "To Kill a Mockingbird", description: "A novel about the serious issues of rape and racial inequality.", author: "Harper Lee"},
    {id: 2, title: "1984", description: "A dystopian novel set in a totalitaration society ruled by Bid Brother.", author: "George Orwell"},
    {id: 3, title: "The Great Gatsby", description: "A story about the American dream and the excesses of the Jazz Age.", author: "F. Scott Fitzgerald"},
    {id: 4, title: "Pride and Prejudice", description: "A romantic novel that critiques the British landed gentry of the 19th century", author: "Jane Austen"},
    {id: 5, title: "The Hobbit", description: "A fantacy adventure that follows Bilbo Baggins on a quest to win treasure guarded by a dragon.", author: "J.R.R. Tolkien"},
]

function FlashcardApp() {
    let [index, setIndex] = useState(0);

    const prevBtn = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1))
        console.log("hello1")
    }

    const nextBtn = () => {
        setIndex((nextIndex) => (nextIndex === data.length - 1 ? 0 : nextIndex + 1))
        console.log("hello")
    }

    const {title, description, author} = data[index];

  return (
    <div>
        <h1>Book Flashcard App</h1>
        <h3>Card {index + 1} of {data.length}</h3>
        <div>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>-- {author}</p>
     </div>
            <button onClick={prevBtn}>Prev</button>
            <button onClick={nextBtn}>Next</button>
        </div>
    </div>
  )
}

export default FlashcardApp


// import React, { useEffect, useState } from 'react'
// // import axios from 'axios'

// const CROP_URL = 'https://8080-eeebbcdcdac334698392deecdfdaaaeone.premiumproject.examly.io/crops'

// function Crop() {
//     const [crops, setCrops] = useState([]);
//     const [formData, setFormData] = useState({
//         cropname: "",
//         season: "",
//         quantity: ""
//     })

//     const [loading, setLoading] = useState(false)
//     // const [adding, setAdding] = useState()

//     useEffect(() => {
//         setLoading(true)
//         fetch(CROP_URL)
//         .then((res) => {
//             if(!res) {
//                 throw new Error("Failed to Fetch");
//             }
//             return res.json();
//         })
//         .then(data => setCrops(data))
//         .catch(err => console.error("error", err))
//         .finally(() => setLoading(false));
//     }, [])

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         const {cropname, season, quantity} = formData;
//         if(!cropname || !season || !quantity) {
//             alert('Please fill in all details')
//             return;
//         }

//         const newCrop = {
//             name: cropname,
//             season,
//             quantity: Number(quantity)
//         }

//         fetch(CROP_URL, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newCrop)
//         }).then((res) => {
//             if(!res.ok) {
//                 throw new Error("Cannot connect to Crop DB")
//             }
//             return res.json()
//         }).then((newCrop) => {
//             setCrops(prevCrops => [...prevCrops, newCrop])
//             setFormData({
//                 cropname: "",
//                 season: "",
//                 quantity: ""
//             })
//         }).catch(err => console.log("error", err.message))
//     }

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData(prevState => ({...prevState, [name]: value}))
//     }


//   return (
//     <>
//     {
//     loading ?  (
//     <p>Loading...</p>)
//     : null
//     }

//     <div>
//         <h1>Crop Management System</h1>
//         <form className='form' onSubmit={handleSubmit}>
//             <input type="text"
//                 name='cropname'
//                 placeholder='Crop Name'
//                 value={formData.cropname}
//                 onChange={handleChange}
//             />
//             <input type="text"
//                 name='season'
//                 value={formData.season}
//                 onChange={handleChange}
//                 placeholder='Season'
//             />
//             <input type="text"
//                 name='quantity'
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 placeholder='Quantity'
//             />
//             <button type='submit'>Add Crop</button>
//         </form>
//         {
//             loading ? (
//                 <p>Loading...</p>
//             ) : null
//         }
//         <>
//         {
//             crops.length === 0 && !loading ? (
//                 <p>No corps have been added yet.</p>
//             ) : (
//             <>
//         <h1>Crop List</h1>
//         <div>
//             {crops.length === 0 ? ("No crops have been added yet") : 
//                 <ul>
//                     {
//                         crops.map((crop) => (
//                             <li key={crop.name || crop.id}>
//                                 <span>
//                                     <strong>{crop.name}</strong>
//                                     {" "}({crop.season}) - {crop.quantity} kg
//                                 </span>
//                             </li>
//                         ))
//                     }
//                 </ul>
//             }
//         </div>
                   
//             </>
//             )
//         }
//         </>
//     </div>
    

//     </>
//   )
// }

// export default Crop








//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const CROP_URL = 'https://8080-eeebbcdcdac334698392deecdfdaaaeone.premiumproject.examly.io/crops'

// function Crop() {
//     const [crops, setCrops] = useState([]);
//     const [formData, setFormData] = useState({
//         cropname: "",
//         season: "",
//         quantity: ""
//     })

//     const [loading, setLoading] = useState(false)
//     // const [adding, setAdding] = useState()

//     const fetchData = async () => {
//         try {
//             const res = await axios.get('http://localhost:8080/crops');
//             setCrops(res.data)
//         } catch (error) {
//             console.log("error", error.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         setLoading(true)
//     //     axios.get(CROP_URL)
//     //         .then(res => setCrops(res.data))
//     //         .catch(err => console.error("error", err))
//     //         .finally(() => setLoading(false));
//     // }, [])
//             fetchData();
// })

//     // useEffect(() => {
//     //     setLoading(true)
//     //     fetch(CROP_URL)
//     //     .then((res) => {
//     //         if(!res) {
//     //             throw new Error("Failed to Fetch");
//     //         }
//     //         return res.json();
//     //     })
//     //     .then(data => setCrops(data))
//     //     .catch(err => console.error("error", err))
//     //     .finally(() => setLoading(false));
//     // }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const {cropname, season, quantity} = formData;
//         if(!cropname || !season || !quantity) {
//             alert('Please fill in all details')
//             return;
//         }

//         // const newCrop = {
//         //     name: cropname,
//         //     season,
//         //     quantity: Number(quantity)
//         // }



//         try {
//             const newCrop = {
//                 name: cropname,
//                 season,
//                 quantity: Number(quantity)
//             }
            
//             const res = await axios.post(CROP_URL, newCrop)
//             setCrops(prevState => [...prevState, res.data])

//             setFormData({
//                 cropname: "",
//                 season: "",
//                 quantity: ""
//             });
            
//         } catch (error) {
//             console.log("error", error.message)
//         }



//         // fetch(CROP_URL, {
//         //     method: 'POST',
//         //     headers: {
//         //         "Content-Type": "application/json"
//         //     },
//         //     body: JSON.stringify(newCrop)
//         // }).then((res) => {
//         //     if(!res.ok) {
//         //         throw new Error("Cannot connect to Crop DB")
//         //     }
//         //     return res.json()
//         // }).then((newCrop) => {
//         //     setCrops(prevCrops => [...prevCrops, newCrop])
//         //     setFormData({
//         //         cropname: "",
//         //         season: "",
//         //         quantity: ""
//         //     })
//         // }).catch(err => console.log("error", err.message))
//     }

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData(prevState => ({...prevState, [name]: value}))
//     }


//   return (
//     <>
//     {
//     loading ?  (
//     <p>Loading...</p>)
//     : null
//     }

//     <div>
//         <h1>Crop Management System</h1>
//         <form className='form' onSubmit={handleSubmit}>
//             <input type="text"
//                 name='cropname'
//                 placeholder='Crop Name'
//                 value={formData.cropname}
//                 onChange={handleChange}
//             />
//             <input type="text"
//                 name='season'
//                 value={formData.season}
//                 onChange={handleChange}
//                 placeholder='Season'
//             />
//             <input type="text"
//                 name='quantity'
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 placeholder='Quantity'
//             />
//             <button type='submit'>Add Crop</button>
//         </form>
//         {
//             loading ? (
//                 <p>Loading...</p>
//             ) : null
//         }
//         <>
//         {
//             crops.length === 0 && !loading ? (
//                 <p>No corps have been added yet.</p>
//             ) : (
//             <>
//         <h1>Crop List</h1>
//         <div>
//             {crops.length === 0 ? ("No crops have been added yet") : 
//                 <ul>
//                     {
//                         crops.map((crop) => (
//                             <li key={crop.name || crop.id}>
//                                 <span>
//                                     <strong>{crop.name}</strong>
//                                     {" "}({crop.season}) - {crop.quantity} kg
//                                 </span>
//                             </li>
//                         ))
//                     }
//                 </ul>
//             }
//         </div>
                   
//             </>
//             )
//         }
//         </>
//     </div>
    

//     </>
//   )
// }

// export default Crop
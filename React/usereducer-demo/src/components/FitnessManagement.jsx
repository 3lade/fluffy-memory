import { useMemo, useReducer } from "react";

let initialData = [
    {id: 1, name: 'John Doe', age: 25, membership: 'Gold'},
    {id: 2, name: 'Emma Smith', age: 30, membership: 'Silver'},
    {id: 3, name: 'Michael Lee', age: 28, membership: 'Platinum'},
]

const initialState = {
    members: initialData,
    formData: {
        name: "",
        age: "",
        membership: ""
    }
}

function reducer(state, action) {
    switch (action.type) {

        case "SET_MEMBER": 
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            }

        case "ADD_MEMBER":
            const {name, age, membership} = state.formData
            
            if(!name || !age || !membership)
            {
                alert("Please fill in all fields")
                return state;
            }

            const newId = state.members.length > 0
                ? Math.max(...state.members.map((m) => m.id)) + 1
                : 1;

            const newMember = {
                id: newId,
                name,
                age : parseInt(age),
                membership
            }
            console.log(newMember)

            return {
                members: [...state.members, newMember],
                formData: {
                    name: "",
                    age: "",
                    membership: ""
                }
            }

    
        default:
            break;
    }
}

function FitnessManagement() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const totalMembers = useMemo(() => state.members.length, [state.members])

    const averageAge = useMemo(() => {
        const totalAge = state.members.reduce((sum, m) => sum + m.age, 0);
        return (totalAge / state.members.length).toFixed(1);
    }, [state.members])

    const handleChange = (e) => {
        dispatch({type: "SET_MEMBER", field: e.target.name, value: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({type: "ADD_MEMBER"})
    }

  return (
    <div>
        <h1>Fitness Member Management</h1>
        <div>
            <h2>Total Members: {totalMembers}</h2>
            <h2>Average Age: {averageAge}</h2>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Membership</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.members.map((mem) => (
                            <tr key={mem.id}>
                                <td>{mem.id}</td>
                                <td>{mem.name}</td>
                                <td>{mem.age}</td>
                                <td>{mem.membership}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <div>
            <h1>Add New Member</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Enter full name'
                    name='name'
                    value={state.formData.name}
                    onChange={handleChange}
                />
                <input type="text" 
                    placeholder='Enter age'
                    name='age'
                    value={state.formData.age}
                    onChange={handleChange}
                />
                <input type="text" 
                    placeholder='Enter membership type'
                    name='membership'
                    value={state.formData.membership}
                    onChange={handleChange}
                />
                <button type='submit' >Add Member</button>
            </form>
        </div>
    </div>
  )
}

export default FitnessManagement

    // const [members, setMembers] = useState(data)
    // const [inputValue, setInputValue] = useState({
    //     name: "",
    //     age: "",
    //     membership: ""
    // })
    // const [error, setError] = useState({})

    // const validation = () => {
    //     // const newError = {}
    //     if(!inputValue.name || !inputValue.age || !inputValue.membership)
    //     {
    //         setError("Please fill in all fields")
    //     }

    //     return Object.keys(error).length === 0
    // }

    // const addMember = (newMember) => {
    //     setMembers((prevData) => [...prevData, newMember])
    // } 

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if(validation())
    //     {
    //         const member = {
    //             id: members.length + 1,
    //             name: inputValue.name,
    //             age: inputValue.age,
    //             membership: inputValue.membership
    //         }
    //         addMember(member)
    //         setError('')
    //         setInputValue({
    //             name: "",
    //             age: "",
    //             membership: ""
    //         })

    //     }
    // }
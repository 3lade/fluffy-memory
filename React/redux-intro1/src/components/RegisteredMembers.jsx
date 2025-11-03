import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMember } from '../redux/clubSlice';

function RegisteredMembers({onEdit}) {

    const {members} = useSelector(state => state.clubs)

    const dispatch = useDispatch();

    console.log(Object.keys(members))
    console.log(Object.entries(members))

// console.log("hello from regesteredMembers")


    return (
        <div>
            {
                Object.entries(members).map(([club, memberList]) => (
                    <div key={club}>
                        <h3>{club} Members</h3>
                        <ul>
                            {
                                memberList.map((member) => (
                                    <li key={member.id}>
                                        <span>{member.name}</span> - {member.email} - {member.interest}
                                        <button onClick={() => onEdit(club, member)}>Edit</button>
                                        <button onClick={() => dispatch(removeMember({id: member.id, club}))}>Delete</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default RegisteredMembers
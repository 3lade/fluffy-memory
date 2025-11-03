import React, { useEffect, useState } from 'react'
import ClubList from './ClubList'
import RegistrationForm from './RegistrationForm'
import RegisteredMembers from './RegisteredMembers'
import { useDispatch } from 'react-redux';
import { fetchClubs } from '../redux/clubSlice';

function ClubManager() {

    const [selectClub, setSelectedClub] = useState('');
    const [editData, setEditData] = useState(null);

// console.log("hello from clubManager")


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClubs())
    }, [dispatch])

    const handleJoinClub = (club) => {
        setSelectedClub(club)
        setEditData(null);
    }

    const handleCancel = () => {
        setSelectedClub('');
    }

    const handleEdit = (club, member) => {
        setSelectedClub(club);
        setEditData(member)
    }

  return (
    <div>

        <h1 style={{textAlign: "center"}}>Club Membership Manager</h1>
        <ClubList onClickClub={handleJoinClub}/>
        {
            selectClub && <RegistrationForm 
            selectClub={selectClub}
            editData={editData}
            onClose={handleCancel}
            />
        }
        <RegisteredMembers onEdit={handleEdit}/>
    </div>
  )
}

export default ClubManager
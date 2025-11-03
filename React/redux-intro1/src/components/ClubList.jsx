import React from 'react'
import { useSelector } from 'react-redux'

function ClubList({ onClickClub }) {

    // console.log("hello from clubList")

    const { availableClubs, loading } = useSelector(state => state.clubs)

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div style={{display: 'flex', margin: '30px', justifyContent: 'center', alignItems: 'center'}}>
            {
                availableClubs.map((club) => (
                    <div key={club} className='club-card' style={{margin: '30px'}}>
                        <h3 className='club-title'>{club}</h3>
                        <button aria-label={`Join ${club}`} onClick={() => onClickClub(club)}>Join</button>
                    </div>
                ))
            }
        </div>
    )
}

export default ClubList
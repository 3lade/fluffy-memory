import React from 'react'

const Filter = ({filterStatus, setFilterStatus}) => {
  return (
    <div>
        <label htmlFor="filter">Filter movies by status</label>
        <select id="filter"
            className='filter-select'
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Plan to Watch">Plan to Watch</option>
            <option value="Watching">Watching</option>
            <option value="Watched">Watched</option>
        </select>
    </div>
  )
}

export default Filter
import React, { useState } from 'react'
import EmpList from './EmpList'

function EmpDashboard({Emp}) {
    const [empData, setEmpData] = useState('')

    const filteredEmp = Emp.filter(emp => emp.toLowerCase().includes(empData.toLowerCase()))

  return (
    <>
    <div>
        <h1>Employees Searching...</h1>
        <input type="text" placeholder='Searching name...' onChange={(e) => setEmpData(e.target.value)} value={empData}/>
    </div>
    <div>
        <EmpList Emp={filteredEmp}/>
    </div>
    </>
  )
}

export default EmpDashboard
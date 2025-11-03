import React from 'react'

function EmpList({Emp}) {
  return (
    <div>
        <ul>
            {
                Emp.map((emp, key) => (
                    <li key={key}>
                        {`${emp}`}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default EmpList
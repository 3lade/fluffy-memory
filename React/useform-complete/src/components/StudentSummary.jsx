import React from 'react'

function StudentSummary({studentDetails}) {
    if(!studentDetails) return null

  return (
    
    <div>
        <h1>Registration Summary</h1>
        <span><strong>name:</strong>{studentDetails.fullName}</span><br />
        <span><strong>email:</strong>{studentDetails.email}</span><br />
        <span><strong>dob:</strong>{studentDetails.birthDate}</span><br />
        <span><strong>phone:</strong>{studentDetails.phoneNumber}</span><br />
        <span><strong>gender:</strong>{studentDetails.gender}</span><br />
        <span><strong>course:</strong>{studentDetails.course}</span><br />
        <span><strong>password:</strong>{studentDetails.password}</span><br />
        <span><strong>confirmPassword:</strong>{studentDetails.confirmPassword}</span><br />
        <span><strong>hostelRequired:</strong>{studentDetails.hostelRequired}</span><br />
    </div>
  )
}

export default StudentSummary
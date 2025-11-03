import React from 'react'

function Home() {
  return (
    <div>
        <img src='.../public/profileimage.avif' alt='profile pic'></img>
        <h1>John Doe</h1>
        <h3>Welcome to My Portfolio</h3>
        <p>Hi, I am a web developer</p>
        <h4>My Tech Stack</h4>
        {/* <img></img> */}
        <div>
            <h4>PERSONAL INFORMATION</h4>
            <p><strong>Collage:</strong>ABC University</p>
            <p><strong>Degree:</strong>Bachelor of Science in Computer Science</p>
            <p><strong>Address:</strong>123 Main St, City, Country</p>
            <p><strong>Email:</strong>johndoe@example.com</p>
            <p><strong>Phone:</strong>+1 234 567 890</p>
        </div>
    </div>
  )
}

export default Home
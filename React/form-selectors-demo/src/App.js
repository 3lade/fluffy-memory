import React, { useState } from 'react'
import CourseForm from './components/CourseForm'
import CourseList from './components/CourseList';

function App() {
    const [courses, setCourses] = useState([]);

    const addCourse = (title, description) => {
      const newCourse = {
        id: Date.now().toString(),
        title: title,
        description: description,
        status: 'active'
      }
      setCourses([...courses, newCourse])
    }

    // const toggleCourseStatus = (id) => {
    //   setCourses(courses.map((course) => (
    //     course.id === id ? {...course, status: course.status} : course
    //   )))
    // }

    const toggleCourseStatus = (id) => {
      setCourses(courses.map((course) => (
        course.id === id ? {...course, status: course.status === 'active' ? 'completed' : 'active'} : course
      )))
    }

  return (
    <div>
        <h1>Online Course Platform</h1>
        <CourseForm addCourse={addCourse}/>
        <CourseList courses={courses} toggleCourseStatus={toggleCourseStatus}/>
    </div>
  )
}

export default App
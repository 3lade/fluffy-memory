import React from 'react'

function CourseList({courses, toggleCourseStatus}) {
    const activeCourses = courses.filter((course) => course.status === 'active')
    const completedCourses = courses.filter((course) => course.status === 'completed')
  return (
    <div>
            <div>
                <h3>Active Courses</h3>
                {
                    activeCourses.length === 0 ? "No active courses. Add one above!"
                    :
                    <div>
                        {
                            activeCourses.map((course) => (
                                <div key={course.id}>
                                    <h4>{course.title}</h4>
                                    <span>{course.description}</span>
                                    <button onClick={() => toggleCourseStatus(course.id)}>Mark as Completed</button>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div>
                <h3>Completed Courses</h3>
                {
                    completedCourses.length === 0 ? "No completed courses yet."
                    :
                    <div>
                        {
                            completedCourses.map((course) => (
                                <div key={course.id}>
                                    <h4>{course.title}</h4>
                                    <span>{course.description}</span>
                                    <button onClick={() => toggleCourseStatus(course.id)}>mark as active</button>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
    </div>
  )
}

export default CourseList
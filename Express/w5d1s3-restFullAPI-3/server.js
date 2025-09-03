const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;

const coursesA = [];
const instructor = [];

app.get('/courses', (req, res) => {
    // if(!coursesA.length == 0)
    // {
    //     return coursesA=[];
    // }
    return res.status(200).json(coursesA)
})

app.post('/courses', (req, res) => {
    const {title, instructor, duration} = req.body;
    if(!title || typeof title !=='string' || !instructor || typeof instructor !== 'string' || duration < 0 || typeof duration !== 'number' || duration < 0)
    {
        return res.status(400).json("Invalid input");
    }
    const newId = coursesA + 1;
    const newCourse = {
        id: newId,
        title,
        instructor,
        duration
    }
    coursesA.push(newCourse);

    //using map
    // const instructors = coursesA.map(course => course.instructor);
    if(!instructor.includes(instructor))
    {
        instructor.push(instructor)
        // console.log(instructor)
    }
    return res.status(201).json(newCourse)
})

app.get('/instructors', (req, res) => {
    return res.status(200).json({instructors: instructor});
})

// app.get('/instructors', (req, res) => {
//     return res.status(200).json({instructors: ["abc", "xyz"]})
// })

app.patch('/courses', (req, res) => {
    return res.status(405).json("Fk u");
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})


// const express = require('express');
// const app = express();

// const tasks = [
//   { id: 1, title: 'Task A' },
//   { id: 2, title: 'Task B' }
// ];

// app.get('/api/tasks', (req, res) => {
//   res.json(tasks);
// });

// app.put('/api/tasks/:id', (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const updatedTask = req.body;
//   const index = tasks.findIndex(task => task.id === taskId);
//   if (index !== -1) {
//     tasks[index] = { ...tasks[index], ...updatedTask };
//     res.json(tasks[index]);
//   } else {
//     res.status(404).json({ message: 'Task not found' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
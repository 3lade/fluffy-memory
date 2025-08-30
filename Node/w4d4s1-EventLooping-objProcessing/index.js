

const {jobQueue, addJob, startProcessing } = require("./jobProcessor");

//write your code here
console.log("Job Processing system started.");

addJob({id: 1, task: "Email processing"})
addJob({id: 2, task: "Data backup"})
addJob({id: 3, task: "Report generation"})

console.log("Jobs have been added to the queue.");

startProcessing();
const fs=require('fs')
const path=require('path')
const filePath=path.resolve(__dirname,'students.json')
const students=[
    {id:1,name:'Alice',marks:85},
    {id:2,name:'Bob',marks:78}
]
function createStudentFile(){
    const data=JSON.stringify(students,null,2)
    fs.writeFileSync(filePath,data)
    const msg='students.json file created with initial records.\n'
    process.stdout.write(msg)
    return msg
}
function readStudents(){
    if(fs.existsSync(filePath)){
    const data= fs.readFileSync(filePath,'utf8')
    const parsedData=JSON.parse(data)
    const formattedData=JSON.stringify(parsedData,null,2)
    return `Current Student Records:\n${formattedData}\n`
    }
    else{
        return 'Student file not found.\n'
    }
}

function addStudent(newStudent){
   let studentList=[]
   if(fs.existsSync(filePath)){
    const data=fs.readFileSync(filePath,'utf8')
    studentList=JSON.parse(data)
   }
   studentList.push(newStudent)
   fs.writeFileSync(filePath,JSON.stringify(studentList,null,2))
   return `Added new student: ${newStudent.name}\n`

}
function updateMarks(studentId,newMarks){
    if(!fs.existsSync(filePath)){
       return 'Student file not found.\n'
    }
    const data=fs.readFileSync(filePath,'utf8')
    const studentList=JSON.parse(data)
    const student=studentList.find(s=>s.id===studentId)
    if(student){
        student.marks=newMarks
        fs.writeFileSync(filePath,JSON.stringify(studentList,null,2))
        return `Updated marks for student ID ${studentId} to ${newMarks}\n`
    }
    return `Student with ID ${studentId} not found.\n`
}

function deleteStudent(studentId){
    if(!fs.existsSync(filePath)){
        return `Student file not found.\n`
    }
    const data=fs.readFileSync(filePath,'utf8')
    const studentList=JSON.parse(data)
const updatedList=studentList.filter(s=>s.id!=studentId)
if(updatedList.length===studentList.length){
    return `No student found with ID ${studentId}\n`
}
fs.writeFileSync(filePath,JSON.stringify(updatedList,null,2))
return `Deleted student with ID ${studentId}\n`
}

module.exports={createStudentFile,readStudents,addStudent,updateMarks,deleteStudent}
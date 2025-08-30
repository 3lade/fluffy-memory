const fs = require('fs');
const path = require('path');
const filePath = path.resolve('users.json');

const initialUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  function createUserFile()
  {
    const data = JSON.stringify(initialUsers, null, 2);
    fs.writeFileSync(filePath, data);
    const successMsg = `User file created.`;
    process.stdout.write(successMsg);
    return successMsg;
  }

  function readUsers()
  {
    if(!fs.existsSync(filePath))
    {
        const errorMsg =  `User file not found.`
        process.stdout.write(errorMsg);
        return errorMsg;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    // // const formattedData = JSON.stringify(parsedData);
    // const successMsg = `Current Users:\n${parsedData}\n`;
    // process.stdout.write(successMsg);
    return parsedData;
  }

  function addUser(newUser)
  {
    if(!fs.existsSync(filePath))
    {
        const errorMsg =  `User file not found.`
        process.stdout.write(errorMsg);
        return errorMsg;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    const addedMsg = `User ${newUser.name} added.`;
    process.stdout.write(addedMsg);
    return addedMsg;
  }

  function deleteUserFile()
  {
    if(!fs.existsSync(filePath))
    {
        const errorMsg =  `No user file to delete.`
        process.stdout.write(errorMsg);
        return errorMsg;
    }
    // const data = fs.read(filePath, 'utf-8');
    // const products = JSON.parse(data);
    fs.unlinkSync(filePath);
    const deleteMsg =  `User file deleted.`
    process.stdout.write(deleteMsg);
    return deleteMsg;
  }


  module.exports={
    createUserFile,
    readUsers,
    addUser,
    deleteUserFile
  }
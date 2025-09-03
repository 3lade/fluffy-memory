
const randomId = require("../utility/randomIdUtility");
const { readData, writeData } = require("../utility/registerHandlers")

const getAllReg = (req, res) => {
    const fileData = readData();
    return res.status(200).json(fileData);
}

const getRegByID = (req, res) => {
    const fileData = readData();
    const regId = req.params.id;
    const foundItem = fileData.find(item => item.id === regId);
    if(!foundItem)
    {
        return res.status(400).json({error: "Id not found"})
    }
    return res.status(200).json(foundItem);
}

const createReg = (req, res) => {
    const {name, email, registeredAt} = req.body;
    console.log(name)

    const newReg = {
        id: randomId(),
        name,
        email,
        registeredAt
    }
    const fileData = readData();
    fileData.push(newReg);
    writeData(fileData);
    return res.status(200).json({id: newReg.id});

}

const updatePutReg = (req, res) => {
    const id = req.params.id;
    const fileData = readData();
    const found = fileData.find(data => data.id === id);
    if(!found)
    {
        return res.status(400).json({error: "Id not found in the Database"})
    }
    const {name, email} = req.body;
    found.name = name;
    found.email = email;

    writeData(fileData);
    return res.status(200).json({message: "DB updated Successfully"});
}

const updatePatchReg = (req, res) => {

}

const deleteReg = (req, res) => {
    const id = req.params.id;
    const fileData = readData();
    const findIndex = fileData.findIndex(data => data.id === id);
    if(findIndex === -1)
    {
        return res.status(400).json({error: "Id not found in the Database"})
    }
    const deleteData = fileData.splice(findIndex,1);
    writeData(fileData);
    return res.status(200).json({message: "Registration deleted successfully"})
}

module.exports = {
    getAllReg,
    getRegByID,
    createReg,
    updatePutReg,
    updatePatchReg,
    deleteReg
}
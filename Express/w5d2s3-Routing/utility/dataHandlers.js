const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../data/webSeries.json');

const readJsonFile = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data):[];
}   

const writeJsonFile = (webSeries) => {
    fs.writeFileSync(filePath, JSON.stringify(webSeries, null, 2), 'utf-8')
}

module.exports={
    readJsonFile, writeJsonFile
}
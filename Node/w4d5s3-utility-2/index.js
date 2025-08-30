const fs = require("fs");
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const gradePath = path.join(__dirname, 'grades.txt');
const summaryPath = path.join(__dirname, 'summary.json')

async function readGrades()
{
    try{
        const data = await readFileAsync(gradePath, 'utf-8');
        return data;
    } catch(error) {
        console.log(`Error reading grades file: ${error}`);
        throw error;
    }
}

function calculateAverages(text)
{
    let data = text.trim().split('\n');
    const summary = {};

    data.forEach((item) => {
        const [name, marks] = item.split(":");

        const array = marks.split(',').map((item) => parseFloat(item));
        const total = array.reduce((acc, curr) => acc + curr, 0);
        const avg = total/array.length;

        summary[name.trim()] = parseFloat(avg.toFixed(2));
    })
    return summary;
}

async function saveSummary(summary)
{
    try {
        const jsonData = JSON.stringify(summary, null, 2);
        await writeFileAsync(summaryPath, jsonData);
        console.log(`Grade summary saved to file: ${summaryPath}`);
    } catch (error) {
        console.log(`Error writing summary file: `, error.message);
    }
}

module.exports={
    readGrades,
    calculateAverages,
    saveSummary
}
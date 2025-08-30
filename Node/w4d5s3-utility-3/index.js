const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.json'); // Fixed typo: __dirnam -> __dirname

async function readInputFile() {
    try {
        const data = await readFileAsync(inputPath, 'utf-8');
        return data;
    } catch(error) {
        console.log(`Error reading input file: ${error}`);
        throw error;
    }
}

function countWords(text) {
    // Handle empty or whitespace-only text
    if (!text || typeof text !== 'string') {
        return {};
    }
    
    // Convert to lowercase, remove punctuation, and split into words
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/) // Split on whitespace
        .filter(word => word.length > 0); // Remove empty strings
    
    // Count word occurrences
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return wordCount;
}

async function saveWordCount(wordCounts) {
    try {
        const jsonData = JSON.stringify(wordCounts, null, 2);
        await writeFileAsync(outputPath, jsonData, 'utf-8');
        console.log(`Word count saved to ${outputPath}`);
    } catch(error) {
        console.log(`Error saving word count: ${error}`);
        throw error;
    }
}

module.exports = {
    readInputFile,
    countWords,
    saveWordCount
};
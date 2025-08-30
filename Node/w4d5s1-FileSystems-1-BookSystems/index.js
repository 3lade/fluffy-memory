const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, 'books.json')

const books = [
    {id: 101, title: "The Alchemist", author: "Paulo Coelho"},
    {id: 102, title: "1984", author: "George Orwell"},
]

function createBookFile()
{
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync(filePath, data);
    const successMsg = 'books.json file created with initial book data.\n';
    process.stdout.write(successMsg);
    return successMsg;
}

function readBooks()
{
    if(!fs.existsSync(filePath))
    {
        return 'books.json file not found.\n';
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const parseData = JSON.parse(data);

    const formattedData = JSON.stringify(parseData, null, 2);
    return `Available Books:\n${formattedData}\n`;

}

module.exports={
    createBookFile,
    readBooks,
}
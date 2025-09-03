const { readJsonFile, writeJsonFile } = require("../utility/dataHandlers");

const GettingWeb = (req, res) => {
    const webData = readJsonFile();
    res.status(200).json(webData);
}


const gettingWebId = (req,res) => {
    const webData = readJsonFile();
    const webId = parseInt(req.params.id);
    const series = webData.find(item => item.id === webId);
    if(!series)
    {
        return res.status(404).json({message:"Webseries Not Found"});
    }
    res.status(200).send(series)
}

const postWeb = (req, res) => {
    const {title, genre, episodes, releaseYear} = req.body;
    if(!title || !genre || !episodes || typeof episodes !== 'number' || !releaseYear || typeof releaseYear !== 'number')
    {
        return res.status(400).json({error:"Title and genre are required"})
    }
    const webData = readJsonFile();
    const newId = webData.length > 0 ? webData[webData.length - 1].id + 1 : 1;
    const newSeries = {
    id: newId,
    title,
    genre,
    episodes,
    // class: className,
    releaseYear
    }

    webData.push(newSeries);
    writeJsonFile(webData);

    res.status(200).json({message:"Web series added", id:newId})
}

module.exports = {GettingWeb, gettingWebId, postWeb}
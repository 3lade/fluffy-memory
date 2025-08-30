const EventEmitter = require("events");
const fs = require("fs");
const path = require('path');

class FileService extends EventEmitter{
    constructor(uploadDir)
    {
        super();
        this.uploadDir = uploadDir;
        if(!fs.existsSync(this.uploadDir))
        {
            fs.mkdirSync(this.uploadDir, {recursive: true});
        }
    }

    uploadFile(fileName, fileContent)
    {
        const filePath = path.join(this.uploadDir, fileName);
        fs.writeFileSync(filePath, fileContent);
        this.emit('fileUploaded', fileName);
        console.log(`File uploaded: ${fileName}`);
    }

    downloadFile(fileName)
    {
        // const filePath = this.uploadDir + fileName;
        const filePath = path.join(this.uploadDir, fileName);

        if(!fs.existsSync(filePath))
        {
            throw new Error(`Error: ${fileName} does not exist.`)
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        this.emit("fileDownloaded", fileName);
        console.log(`File downloaded: ${fileName}`);
        return data;
    }

    streamFileContent(fileName, writableStream)
    {
        // const filePath = this.uploadDir + fileName;
        const filePath = path.join(this.uploadDir, fileName);

        if(!fs.existsSync(filePath))
        {
            throw new Error(`Error: ${fileName} does not exist.`);
        }
        const readData = fs.createReadStream(filePath);
        readData.pipe(writableStream);

        this.emit('fileStreamed', fileName);
        console.log(`Streaming file content: ${fileName}`);
    }

    deleteFile(fileName)
    {
        // const filePath = this.uploadDir + fileName;
        const filePath = path.join(this.uploadDir, fileName);


        fs.unlinkSync(filePath);
        this.emit('fileDeleted', fileName);
        console.log(`File deleted: ${fileName}`)
    }
    
    listFiles()
    {
        const fileNames = fs.readdirSync(this.uploadDir);
        this.emit("filesListed", fileNames);
        console.log(`Listing Files: ${fileNames}`);
        return fileNames;
    }

}

module.exports=FileService;
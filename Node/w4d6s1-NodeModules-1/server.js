
const http = require("http");
  const url = require("url");

  const PORT = 8080;

  let list = ["Alice", "Bob"];
const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const query = parseUrl.query;
    console.log(path);

    if(path === "/students")
    {
        res.statusCode = 200;
        res.end(list.join(', '));
    }

    if(path === "/add")
    {
        const name = query.name;

        if(name)
        {
            list.push(name);
            res.statusCode = 200;
            res.end(`Added student: ${name}`);
        } else {
            res.statusCode = 200;
            res.end("Please provide a name")
        }
    }

    if(path === "/")
    {
        res.statusCode = 200;
        const msg = `
Welcome!
Use /students to see all students.
Use /add?name=StudentName to add a student.
        `
        res.end(msg);
    } 
    // else {
    //     res.statusCode = 404;
    //     res.end("Not Found")
    // }
})

server.listen(PORT, () => {
    console.log(`Connected on: ${PORT}`);
})


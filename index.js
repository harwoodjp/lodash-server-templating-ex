const { resolve } = require('path');
const { readFile, readFileSync } = require('fs');
const http = require('http');
const port = 3000;

const _ = require("lodash");

let ui = _.template(readFileSync('./ui/page.html')),
    player = _.template(readFileSync('./ui/player.html')),
    library = _.template(readFileSync('./ui/library.html')),
    style = _.template(readFileSync('./ui/style.css'));

const requestHandler = (request, response) => {  
    console.log(request.url)
    style = _.template(readFileSync('./ui/style.css')); // DEV only, view changes on refresh     
    response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
    response.end(ui({ style, player, library}))
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err)
    }
    console.log(`Server is listening on ${port}`);
})

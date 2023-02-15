const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (request.url == '/produto') {
        response.end(JSON.stringify({
            message: 'Rota de produto!'
        }))
    }
    else if (request.url == '/usuario') {
        response.end(JSON.stringify({
            message: 'Rota de usuário!'
        }))
    }
    else {
        response.end(JSON.stringify({
            message: 'Rota de qualquer coisa!'
        }))
    }

}).listen(4001, () => console.log("Servidor está rodando na porta 4001."));
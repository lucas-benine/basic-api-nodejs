const express = require('express');

const app = express();

app.get('/primeira-rota', (request, response) => {
    return response.json({
        message: 'Minha primeira rota'
    })
})

app.listen(4002, () => console.log('O servidor está rodando na porta 4002'));
const express = require('express');
const { randomUUID } = require('crypto');

const app = express();

app.use(express.json());

const products = [];

app.post('/insertProduct', (request, response) => {
    const { name, price } = request.body;    
    const product = {
        name: name,
        price: price,
        id: randomUUID(),
    }

    products.push(product);
    return response.json(product);
});

app.get('/findAllProducts', (request, response) => {
    return response.json(products);
});

app.get('/findProduct/:id', (request, response) => {
    const { id } = request.params;
    const product = products.find(p => p.id === (id));
    
    return response.json(product);
});

app.put('/updateProduct/:id', (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;
    const productIndex = products.findIndex((p) => p.id === (id));
    
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }
    return response.json({message: 'Produto alterado com sucesso!'});
});

app.delete('/deleteProduct/:id', (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((p) => p.id === (id));

    products.splice(productIndex, 1);
    return response.json({message: 'Produto deletado com sucesso!'});
});

app.listen(4002, () => console.log('O servidor está rodando na porta 4002'));
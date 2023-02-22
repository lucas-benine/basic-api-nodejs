const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error: ' + err);
    } else {
        products = JSON.parse(data);
    }
});


app.post('/insertProduct', (request, response) => {
    const { name, price } = request.body;    
    const product = {
        name: name,
        price: price,
        id: randomUUID(),
    }

    products.push(product);
    
    updateProductFile();
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
    updateProductFile();
    return response.json({message: 'Produto alterado com sucesso!'});
});

app.delete('/deleteProduct/:id', (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((p) => p.id === (id));

    products.splice(productIndex, 1);
    updateProductFile();
    return response.json({message: 'Produto deletado com sucesso!'});
});

function updateProductFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log('Error ' + err);
        } else {
            console.log('Produto inserido no arquivo!');
        }
    });
}


app.listen(4002, () => console.log('O servidor está rodando na porta 4002'));
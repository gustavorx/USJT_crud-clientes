const express = require("express");

const app = express();
const porta = 5070;
app.use(express.json());

let contador = 0;
const listaProdutos = [];

app.get("/produtos", (req, res) => {
    res.status(200).send(listaProdutos);
});

app.get("/produtos/:id", (req, res) => {
    let produtoProcurado = {};
    listaProdutos.forEach(produto => {
        if (produto.id == req.params.id) {
            produtoProcurado = produto;
        }
    });
    res.status(200).json(produtoProcurado);
});

app.post("/produtos", (req, res) => {
    const novoProduto = req.body;

    listaProdutos.push({
        id: contador += 1,
        ProdNome: novoProduto.ProdNome,
        ProdUnidade: novoProduto.ProdUnidade,
        ProdValorUnit: novoProduto.ProdValorUnit
    });

    res.status(201).send(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    const produtoComDadosNovos = req.body;

    const index = listaProdutos.findIndex(prod => prod.id === parseInt(req.params.id));
    const produtoParaAtualizar = listaProdutos[index];

    produtoParaAtualizar.ProdNome = produtoComDadosNovos.ProdNome;
    produtoParaAtualizar.ProdUnidade = produtoComDadosNovos.ProdUnidade
    produtoParaAtualizar.ProdValorUnit = produtoComDadosNovos.ProdValorUnit

    res.status(204).send();
});

app.delete("/produtos/:id", (req, res) => {
    const idParam = req.params.id;
    const index = listaProdutos.findIndex(prod => prod.id === parseInt(idParam));

    if (index > -1) listaProdutos.splice(index, 1)

    res.status(200).send(listaProdutos);
});

app.listen(porta, (() =>
    console.log(`Microsserviço de produtos iniciado. http://localhost:${porta}`)
));
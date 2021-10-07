const express = require("express");
const axios = require("axios");

const app = express();
const porta = 5050;
app.use(express.json());

let contador = 0;
const listaPedidos = [];

app.get("/pedidos", (req, res) => {
    res.status(200).send(listaPedidos);
});

app.post("/pedidos", async (req, res) => {
    try {
        const novoPedidoRequest = req.body;
        const clienteIdProcurado = novoPedidoRequest.ClienteId;
        const produtoIdProcurado = novoPedidoRequest.ProdutoId;
        let cliente;
        let produto;

        await axios.get(`http://localhost:5060/clientes/${clienteIdProcurado}`)
            .then(response => {
                cliente = response.data
            })
            .catch(erro =>
                res.status(500).send(`Erro ao buscar o cliente ${clienteIdProcurado}: ${erro}`)
            );

        await axios.get(`http://localhost:5070/produtos/${produtoIdProcurado}`)
            .then(response => {
                produto = response.data
            })
            .catch(erro =>
                res.status(500).send(`Erro ao buscar o produto ${produtoIdProcurado}: ${erro}`)
            );

        let pedidoNovo = {
            id: contador += 1,
            Cliente: cliente,
            Produto: produto,
            Data: novoPedidoRequest.Data,
            Endereco: novoPedidoRequest.Endereco
        };

        listaPedidos.push(pedidoNovo);

        res.status(201).send(pedidoNovo);
    } catch (error) {
        res.status(500).send(`Erro ao inserir pedido: ${error}`)
    }
});

app.put("/pedidos/:id", (req, res) => {
    const pedidosComDadosNovos = req.body;

    const index = listaPedidos.findIndex(pedido => pedido.id === parseInt(req.params.id));
    const pedidoParaAtualizar = listaPedidos[index];

    pedidoParaAtualizar.Endereco = pedidosComDadosNovos.Endereco;

    res.status(204).send();
});

app.delete("/pedidos/:id", (req, res) => {
    const idParam = req.params.id;
    const index = listaPedidos.findIndex(pedido => pedido.id === parseInt(idParam));

    if (index > -1) listaPedidos.splice(index, 1)

    res.status(200).send(listaPedidos);
});

app.listen(porta, (() =>
    console.log(`Microsserviço de pedidos iniciado. http://localhost:${porta}`)
));
const express = require("express");

const app = express();
const porta = 5060;
app.use(express.json());

let contador = 0;
const listaClientes = [];

app.get("/clientes", (req, res) => {
    res.status(200).send(listaClientes);
});

app.get("/clientes/:id", (req, res) => {
    let clienteProcurado = {};
    listaClientes.forEach(cliente => {
        if (cliente.id == req.params.id) {
            clienteProcurado = cliente;
        }
    });
    res.status(200).json(clienteProcurado);
});

app.post("/clientes", (req, res) => {
    const novoCliente = req.body;

    listaClientes.push({
        id: contador += 1,
        Nome: novoCliente.Nome,
        Celular: novoCliente.Celular,
    });

    res.status(201).send(novoCliente);
});

app.put("/clientes/:id", (req, res) => {
    const clienteComDadosNovos = req.body;

    const index = listaClientes.findIndex(cliente => cliente.id === parseInt(req.params.id));
    const clienteParaAtualizar = listaClientes[index];

    clienteParaAtualizar.Nome = clienteComDadosNovos.Nome;
    clienteParaAtualizar.Celular = clienteComDadosNovos.Celular

    res.status(204).send();
});

app.delete("/clientes/:id", (req, res) => {
    const idParam = req.params.id;
    const index = listaClientes.findIndex(c => c.id === parseInt(idParam));

    if (index > -1) listaClientes.splice(index, 1)

    res.status(200).send(listaClientes);
});

app.listen(porta, (() =>
    console.log(`Microsserviço de clientes iniciado. http://localhost:${porta}`)
));
// Importa o Express e as rotas dos alunos
const express = require('express');
const alunosRouter = require('./rotas/alunos');

// Cria a aplicação Express e define a porta
const app = express();
const PORT = 3000;

// Middleware interno para converter o corpo da requisição JSON em req.body (Aula 4, Slide 20)
app.use(express.json());

// Rota inicial explicativa
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Gerenciamento de Alunos rodando com sucesso!'
    });
});

// Vincula o módulo de rotas ao prefixo '/alunos' (Aula 4, Slide 33)
app.use('/alunos', alunosRouter);

// Middleware Centralizado para Tratamento de Erros Inesperados (Aula 4, Slides 34-35)
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime a pilha de erros no terminal
    
    if (res.headersSent) {
        return next(err);
    }

    // Retorna HTTP 500 Internal Server Error
    res.status(500).json({
        erro: 'Ocorreu um erro interno no servidor.'
    });
});

// Inicializa o servidor HTTP na porta 3000 (Aula 4, Slide 5)
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
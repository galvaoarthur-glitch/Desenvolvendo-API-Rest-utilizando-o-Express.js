// Importa o Express e o middleware de validação
const express = require('express');
const validarAluno = require('../middleware/validarAluno');

// Cria o objeto Roteador do Express para modularização (Aula 4, Slide 30 e 32)
const router = express.Router();

// 1. Inicializa o array em memória com os registros exigidos
let alunos = [
    { id: 1, nome: 'Ana', curso: 'Computação' },
    { id: 2, nome: 'Pedro', curso: 'ADS' }
];

// 2. 
// geração de IDs únicos sequenciais
let proximoId = 3;

// ROTA: GET /alunos
// Retorna a lista completa ou filtrada por query params (nome e/ou curso)
router.get('/', (req, res) => {
    // Captura parâmetros de busca via URL (?nome=...&curso=...)
    const { 
        nome, curso 
    } = req.query;
    let resultado = alunos;

    // Filtra pelo nome se informado na URL
    if (nome) {
        resultado = resultado.filter(aluno =>
            aluno.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    // Filtra pelo curso se informado na URL
    if (curso) {
        resultado = resultado.filter(aluno =>
            aluno.curso.toLowerCase() === curso.toLowerCase()
        );
    }

    // Retorna HTTP 200 OK com os dados em JSON
    res.status(200).json(resultado);
});

// ROTA: GET /alunos/:id
// Retorna os dados do aluno correspondente ao ID informado

router.get('/:id', (req, res) => {
    // Converte o parâmetro da rota em valor numérico
    const id = parseInt(req.params.id, 10);
    
    // Busca o registro correspondente no array
    const aluno = alunos.find(a => a.id === id);

    // Se o aluno não for encontrado, retorna HTTP 404 Not Found
    if (!aluno) {
        return res.status(404).json({
            erro: 'Aluno não existe.'
        });
    }

    // Retorna HTTP 200 OK e o objeto do aluno
    res.status(200).json(aluno);
});

// ROTA: POST /alunos
// Cadastra um novo aluno no array

router.post('/', validarAluno, (req, res) => {
    const { nome, curso } = req.body;

    // Cria o objeto com ID gerado automaticamente
    const novoAluno = {
        id: proximoId++,
        nome: nome.trim(),
        curso: curso.trim()
    };

    // Insere o aluno no array em memória
    alunos.push(novoAluno);

    // Retorna HTTP 201 Created com o objeto recém-criado
    res.status(201).json(novoAluno);
});

// ROTA: PUT /alunos/:id
// Atualiza o nome e curso de um aluno existente pelo ID

router.put('/:id', validarAluno, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, curso } = req.body;

    // Localiza o aluno
    const aluno = alunos.find(a => a.id === id);

    // Retorna HTTP 404 se não for localizado
    if (!aluno) {
        return res.status(404).json({
            erro: 'Aluno solicitado não existe.'
        });
    }

    // Atualiza as propriedades do aluno
    aluno.nome = nome.trim();
    aluno.curso = curso.trim();

    // Retorna HTTP 200 OK e os dados atualizados
    res.status(200).json(aluno);
});

// ROTA: DELETE /alunos/:id
// Remove um aluno da lista a partir de seu ID

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Procura o índice do aluno no array
    const index = alunos.findIndex(a => a.id === id);

    // Retorna HTTP 404 Not Found caso o aluno não seja encontrado
    if (index === -1) {
        return res.status(404).json({
            erro: 'Aluno não encontrado.'
        });
    }

    // Remove o item do array
    alunos.splice(index, 1);

    // Retorna HTTP 204 No Content sem corpo de resposta
    res.status(204).send();
});

// Exporta o roteador configurado (Aula 4, Slide 32)
module.exports = router;
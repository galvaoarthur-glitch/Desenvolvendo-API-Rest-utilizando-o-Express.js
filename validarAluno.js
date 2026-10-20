// Middleware personalizado para validação de dados do aluno (Aula 4, Slide 28)
function validarAluno(req, res, next) {
    // Extrai nome e curso do corpo da requisição (req.body)
    const { 
        nome, curso 
    } = req.body;

    // Valida se os campos obrigatórios existem, se são strings e se não estão em branco
    if (
        !nome || 
        !curso || 
        typeof nome !== 'string' || 
        nome.trim() === '' || 
        typeof curso !== 'string' || 
        curso.trim() === ''
    ) {
        // Retorna HTTP 400 Bad Request se algum dado obrigatório for omitido ou inválido
        return res.status(400).json({
            erro: 'Nome e curso são obrigatórios e devem ser textos não vazios'
        });
    }

    // Transfere a execução para a próxima etapa (a rota receptora)
    next();
}

// Exporta o middleware para utilização nos roteadores
module.exports = validarAluno;
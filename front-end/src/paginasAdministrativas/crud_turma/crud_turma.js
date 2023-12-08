function opcaoCadastrar() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'block';
    document.getElementById('adicionarAluno').style.display = 'none';
    document.getElementById('removerAluno').style.display = 'none';
}

function opcaoConsulta() {
    document.getElementById('consultar').style.display = 'block';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('adicionarAluno').style.display = 'none';
    document.getElementById('removerAluno').style.display = 'none';
}

function opcaoAlterar() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'block';
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('adicionarAluno').style.display = 'none';
    document.getElementById('removerAluno').style.display = 'none';
}

function opcaoRemover() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'block';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('adicionarAluno').style.display = 'none';
    document.getElementById('removerAluno').style.display = 'none';
}

function opcaoAdicionarAluno() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('adicionarAluno').style.display = 'block';
    document.getElementById('removerAluno').style.display = 'none';
}

function opcaoRemoverAluno() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
    document.getElementById('adicionarAluno').style.display = 'none';
    document.getElementById('removerAluno').style.display = 'block';
}


function inserirColunasDeTurma() {    

    limparTabela();

    const tabela = document.getElementById('tabelaResultado');

    const colunaCodigoTurma = document.createElement('th');
    const colunaDataInicio = document.createElement('th');
    const colunaDataFim = document.createElement('th');
    const colunaNomeCurso = document.createElement('th');

    colunaCodigoTurma.setAttribute('scope', 'col');
    colunaDataInicio.setAttribute('scope', 'col');
    colunaDataFim.setAttribute('scope', 'col');
    colunaNomeCurso.setAttribute('scope', 'col');

    colunaCodigoTurma.textContent = 'Código Da Turma';
    colunaDataInicio.textContent = 'Data Do Início';
    colunaDataFim.textContent = 'Data Do Fim';
    colunaNomeCurso.textContent = 'Nome Do Curso';

    const cabecalho = tabela.querySelector('thead');

    cabecalho.appendChild(colunaCodigoTurma);
    cabecalho.appendChild(colunaDataInicio);
    cabecalho.appendChild(colunaDataFim);
    cabecalho.appendChild(colunaNomeCurso);

}

function inserirColunasDeAluno() {
    limparTabela();

    const tabela = document.getElementById('tabelaResultado');

    const colunaNome = document.createElement('th');
    const colunaCPF = document.createElement('th');
    const colunaMatricula = document.createElement('th');
    const colunaDataNascimento = document.createElement('th');
    const colunaEnderecoEthereum = document.createElement('th');
    const colunaEmail = document.createElement('th');

    colunaNome.setAttribute('scope', 'col');
    colunaCPF.setAttribute('scope', 'col');
    colunaMatricula.setAttribute('scope', 'col');
    colunaDataNascimento.setAttribute('scope', 'col');
    colunaEnderecoEthereum.setAttribute('scope', 'col');
    colunaEmail.setAttribute('scope', 'col');

    colunaNome.textContent = 'Nome';
    colunaCPF.textContent = 'CPF';
    colunaMatricula.textContent = 'Matrícula';
    colunaDataNascimento.textContent = 'Data De Nascimento';
    colunaEnderecoEthereum.textContent = 'Endereço Ethereum';
    colunaEmail.textContent = 'Email';

    const cabecalho = tabela.querySelector('thead');

    cabecalho.appendChild(colunaNome);
    cabecalho.appendChild(colunaCPF);
    cabecalho.appendChild(colunaMatricula);
    cabecalho.appendChild(colunaDataNascimento);
    cabecalho.appendChild(colunaEnderecoEthereum);
    cabecalho.appendChild(colunaEmail);

}

function limparTabela() {
    const tabela = document.getElementById('tabelaResultado');
    const linhas = tabela.querySelector('tbody');
    const cabecalho = tabela.querySelector('thead');

    while(linhas.firstChild) {
        linhas.removeChild(linhas.firstChild);
    }

    cabecalho.innerHTML = '<thead></thead>';
}


async function buscarTodos() {
    try {
        inserirColunasDeTurma();
    
        const resposta = await fetch('http://localhost:3333/turma');
    
        if (!resposta.ok) {
            const res_erro = await resposta.text();
            const erro = JSON.parse(res_erro).message;
            alert('Erro: ' + erro);
            throw erro;
        }

        const dados = await resposta.json();

        mostrarDadosTabelaCursos(dados);
        
    } catch(erro) {        
        console.error(erro);
    }
}

function mostrarDadosTabelaAlunos(dados) {
    const tabela = document.getElementById('tabelaResultado');

    for (const iterator of dados) {
        
        const newRow = tabela.insertRow();

        const cellNome = newRow.insertCell();
        cellNome.appendChild(document.createTextNode(iterator.nome));

        const cellCpf = newRow.insertCell();
        cellCpf.appendChild(document.createTextNode(iterator.cpf));

        const cellMatricula = newRow.insertCell();
        cellMatricula.appendChild(document.createTextNode(iterator.matricula));

        const cellDataNascimento = newRow.insertCell();
        cellDataNascimento.appendChild(document.createTextNode(iterator.dataNascimento.split('T')[0]));

        const cellEnderecoEth = newRow.insertCell();
        cellEnderecoEth.appendChild(document.createTextNode(iterator.endereco_eth));

        const cellEmail = newRow.insertCell();
        cellEmail.appendChild(document.createTextNode(iterator.email));

    }
}

function mostrarDadosTabelaCursos(dados) {
    const tabela = document.getElementById('tabelaResultado');

    for (const iterator of dados) {
        
        const newRow = tabela.insertRow();

        const cellId = newRow.insertCell();
        cellId.appendChild(document.createTextNode(iterator.id));

        const cellDataInicio = newRow.insertCell();
        cellDataInicio.appendChild(document.createTextNode(iterator.dataInicio.split('T')[0]));

        const cellDataFim = newRow.insertCell();
        cellDataFim.appendChild(document.createTextNode(iterator.dataFim.split('T')[0]));

        const cellCursoNome = newRow.insertCell();
        cellCursoNome.appendChild(document.createTextNode(iterator.curso.nome));
    }
}

async function buscarAlunosTurma(evt) {

    evt.preventDefault();
    
    try {
        inserirColunasDeAluno();
        const codigoTurma = document.getElementById('inputCodigoCursoConsultar').value;
    
        const resposta = await fetch(`http://localhost:3333/turma/alunosTurma/${codigoTurma}`);
    
        if (!resposta.ok) {
            const res_erro = await resposta.text();
            const erro = JSON.parse(res_erro).message;
            alert('Erro: ' + erro);
            throw erro;
        }

        const dados = await resposta.json();
        const alunos = dados.students;
        

        mostrarDadosTabelaAlunos(alunos);
        
    } catch(erro) {        
        console.error(erro);
    }
}


function eventoChangeCkbCodigoAlterar(event) {
    const txtCodigo = document.getElementById('inputCodigoTurmaAlterar');
    
    txtCodigo.disabled = ! event.target.checked;
}

function eventoChangeCkbDataInicioAlterar(event) {
    const txtDataInicio = document.getElementById('inputDataInicioAlterar');
    
    txtDataInicio.disabled = ! event.target.checked;
}

function eventoChangeCkbDataFimAlterar(event) {
    const txtDataFim = document.getElementById('inputDataFimAlterar');
    
    txtDataFim.disabled = ! event.target.checked;
}

function eventoChangeCkbCodigoCursoAlterar(event) {
    const txtCodigoCurso = document.getElementById('inputCodigoCursoAlterar');
    
    txtCodigoCurso.disabled = ! event.target.checked;
}


function cadastrarTurma(evento) {
    evento.preventDefault();

    const codigo = document.getElementById('inputIdTurmaCadastrar').value;
    const dataInicio = document.getElementById('inputDataInicioTurmaCadastrar').value;
    const dataFim = document.getElementById('inputDaraFimTurmaCadastrar').value;
    const codigoCurso = document.getElementById('inputIdCursoTurmaCadastrar').value;

    fetch('http://localhost:3333/turma/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            codigoTurma: Number(codigo),
            dataInicio: dataInicio + 'T00:00:00Z',
            dataFim: dataFim + 'T00:00:00Z',
            codigoCurso: Number(codigoCurso),
        })
        
    })
        .then(response => {
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert('Turma Cadastrada Com Sucesso!');
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });

}

async function removerTurma(evento) {
    evento.preventDefault();

    try {

        const codigo = document.getElementById('inputCodigoTurmaRemover').value;

        const resposta = await fetch(`http://localhost:3333/turma/${codigo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },            
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            alert('Erro: ' + JSON.parse(erro).message);
            throw erro;
        }

        alert("Turma Deletada Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }
}

async function alterarTurma() {
    const dadosAlterados = {};

    const codigoAlvo = document.getElementById("inputCodigoTurmaAlvoAlterar").value;

    dadosAlterados.codigoTurmaAlvo = Number(codigoAlvo);

    const novoCodigo = document.getElementById("inputCodigoTurmaAlterar");
    const novaDataInicio = document.getElementById("inputDataInicioAlterar");
    const novaDataFim = document.getElementById("inputDataFimAlterar");
    const novoCodigoCurso = document.getElementById("inputCodigoCursoAlterar");

    if ((! novoCodigo.disabled) && (Number(novoCodigo.value) > 0))
        dadosAlterados.novoCodigoTurma = Number(novoCodigo.value);

    if ((! novaDataInicio.disabled) && (novaDataInicio.value !== ''))
        dadosAlterados.novaDataInicio = novaDataInicio.value + 'T00:00:00.000Z';

    if ((! novaDataFim.disabled) && ((novaDataFim.value) !== ''))
        dadosAlterados.novaDataFim = novaDataFim.value + 'T00:00:00.000Z';

    if ((! novoCodigoCurso.disabled) && (Number(novoCodigoCurso.value) > 0))
        dadosAlterados.novoCodigoCurso = Number(novoCodigoCurso.value);
    
    
    if (Object.keys(dadosAlterados).length === 1) {
        alert('Preencha Os Dados Que Deseja Alterar!')
        return;
    }
    
    
    try {

        const resposta = await fetch('http://localhost:3333/turma/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(dadosAlterados)
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            alert('Erro: ' + JSON.parse(erro).message);
            throw erro;
        }

        alert("Turma Atualizada Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }
}

function adicionarAlunoTurma(evento) {
    evento.preventDefault();

    const codigoTurma = document.getElementById('inputCodigoTurmaAdicionarAluno').value;
    const matriculaAluno = document.getElementById('inputMatriculaAlunoAdicionarAluno').value;

    fetch(`http://localhost:3333/turma/addStudent/${matriculaAluno}/${codigoTurma}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    })
        .then(response => {
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert('Estudante Adicionado Com Sucesso!');
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });

}

function removerAlunoTurma(evento) {
    evento.preventDefault();

    const codigoTurma = document.getElementById('inputCodigoTurmaRemoverAluno').value;
    const matriculaAluno = document.getElementById('inputMatriculaAlunoRemoverAluno').value;

    fetch(`http://localhost:3333/turma/removeStudent/${matriculaAluno}/${codigoTurma}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    })
        .then(response => {
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert('Estudante Removido Com Sucesso!');
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

function main() {    
    
    const ckbCodigo = document.getElementById('ckbCodigoTurmaAlterar');
    const ckbDataInicio = document.getElementById('ckbDataInicioAlterar');
    const ckbDataFim = document.getElementById('ckbDataFimAlterar');
    const ckbCodigoCurso = document.getElementById('ckbCodigoCursoAlterar');

    const formTodosAlunosTurma = document.getElementById('formularioTodosAlunosTurma');
    const formCadastrarTurma = document.getElementById('fomularioCadastrarTurma');
    const formRemoverTurma = document.getElementById('formularioRemoverTurma');
    const formAdicionarAlunoTurma = document.getElementById('formularioAdicionarAlunoTurma');
    const forRemoverAluno = document.getElementById('formularioRemoverAluno');    

    const btnBuscarTodos = document.getElementById('btnBuscasTodos');
    const btnAlterarTurma = document.getElementById('btnAlterarTurma');


    btnBuscarTodos.addEventListener('click', buscarTodos);
    btnAlterarTurma.addEventListener('click', alterarTurma);

    formTodosAlunosTurma.addEventListener('submit', buscarAlunosTurma);
    formCadastrarTurma.addEventListener('submit', cadastrarTurma);
    formRemoverTurma.addEventListener('submit', removerTurma);
    formAdicionarAlunoTurma.addEventListener('submit', adicionarAlunoTurma);
    forRemoverAluno.addEventListener('submit', removerAlunoTurma);
    

    ckbCodigo.addEventListener('change', function (event) { 
        eventoChangeCkbCodigoAlterar(event)
    });

    ckbDataInicio.addEventListener('change', function (event) { 
        eventoChangeCkbDataInicioAlterar(event)
    });

    ckbDataFim.addEventListener('change', function (event) { 
        eventoChangeCkbDataFimAlterar(event)
    });

    ckbCodigoCurso.addEventListener('change', function (event) { 
        eventoChangeCkbCodigoCursoAlterar(event)
    });

    
}


main();
function opcaoConsulta() {
    document.getElementById('consultar').style.display = 'block';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
}

function opcaoAlterar() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'block';
}

function opcaoRemover() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'block';
    document.getElementById('alterar').style.display = 'none';
}


function eventoChangeCkbNomeAlterar(event) {
    const txtNome = document.getElementById('inputNomeAlterar');
    
    txtNome.disabled = ! event.target.checked;
}

function eventoChangeCkbCPFAlterar(event) {
    const txtCpf = document.getElementById('inputCPFAlterar');
    
    txtCpf.disabled = ! event.target.checked;
}

function eventoChangeCkbDataNascimentoAlterar(event) {
    const txtDataNascimento = document.getElementById('inputDataNascimentoAlterar');
    
    txtDataNascimento.disabled = ! event.target.checked;
}

function eventoChangeCkbEnderecoEthereum(event) {
    const txtEnderecoEthereum = document.getElementById('inputEnderecoEthereum');
    
    txtEnderecoEthereum.disabled = ! event.target.checked;
}

function eventoChangeCkbEmailAlterar(event) {
    const txtEmail = document.getElementById('inputEmailAlterar');
    
    txtEmail.disabled = ! event.target.checked;
}

function eventoChangeCkbSenhaAlterar(event) {
    const txtSenha = document.getElementById('inputAlterarSenha');
    
    txtSenha.disabled = ! event.target.checked;
}

async function getTodosAlunos() {
    try {

        const resposta = await fetch('http://localhost:3333/students', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (!resposta.ok) {
            const res_erro = await resposta.text();
            const erro = JSON.parse(res_erro).message;
            alert('Erro: ' + erro);
            throw erro;
        }

        const alunos = await resposta.json();
        
        
        mostrarDadosTabela(alunos);

    } catch(erro) {
        console.error(erro);
    }
}

function limparTabela(tabela) {
    tabela.innerHTML = `
                        <thead>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Matr&iacute;cula</th>
                            <th scope="col">Data De Nascimento</th>
                            <th scope="col">Endere&ccedil;o Ethereum</th>
                            <th scope="col">Email</th>
                        </thead>`;
}

function mostrarDadosTabela(dados) {
    const tabela = document.getElementById('tabelaResultado');

    limparTabela(tabela);

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

async function getAluno(evento) {
    evento.preventDefault();

    try {
        const matricula = document.getElementById('inputMatriculaAluno').value;

        const resposta = await fetch(`http://localhost:3333/students/${matricula}` , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (!resposta.ok) {
            const res_erro = await resposta.text();
            const erro = JSON.parse(res_erro).message;
            alert('Erro: ' + erro);
            throw erro;
        }

        const aluno = await resposta.json();
        
        
        mostrarDadosTabela([aluno]);

    } catch(erro) {
        console.log(erro);
    }
}

async function removerAluno(evento) {
    evento.preventDefault();

    try {

        const matricula = document.getElementById('inputMatriculaRemover').value;

        const resposta = await fetch(`http://localhost:3333/students/${matricula}`, {
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

        alert("Aluno Deletado Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }
}

async function alterarAluno() {
    
    const dadosAlterados = {};

    const matriculaAlvo = document.getElementById('inputMatriculaAlterar').value;
    const nome = document.getElementById('inputNomeAlterar');
    const cpf = document.getElementById('inputCPFAlterar');
    const data = document.getElementById('inputDataNascimentoAlterar');
    const enderecoEth = document.getElementById('inputEnderecoEthereum');
    const email = document.getElementById('inputEmailAlterar');
    const senha = document.getElementById('inputAlterarSenha');

    dadosAlterados.matriculaAlvo = matriculaAlvo;

    if ((! nome.disabled) && (nome.value !== ''))
        dadosAlterados.novoNome = nome.value;

    if ((! cpf.disabled) && (cpf.value !== ''))
        dadosAlterados.novoCpf = cpf.value;

    if ((! data.disabled) && (data.value !== ''))
        dadosAlterados.novaDataNascimento = data.value + 'T00:00:00Z';

    if ((! enderecoEth.disabled) && (enderecoEth.value !== ''))
        dadosAlterados.novoEndereco_eth = enderecoEth.value;

    if ((! email.disabled) && (email.value !== ''))
        dadosAlterados.novoEmail = email.value;

    if ((! senha.disabled) && (senha.value !== ''))
        dadosAlterados.novaSenha = senha.value;

    try {

        const resposta = await fetch('http://localhost:3333/students/updateInstitucional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(dadosAlterados)
        });

        alert("Dados Alterado Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }
}

function main() {

    const ckbNome = document.getElementById('ckbNomeAlterar');
    const ckbCpf = document.getElementById('ckbCPFAlterar');
    const ckbDataNascimento = document.getElementById('ckbDataNascimentoAlterar');
    const enderecoEth = document.getElementById('ckbEnderecoEthereum');
    const ckbEmail = document.getElementById('ckbEmailAlterar');
    const ckbSenha = document.getElementById('ckbSenhaAlterar');

    const btnPegarTodosAluno = document.getElementById('btnPegarTodosAluno');
    const btnAlterarAluno = document.getElementById('btnAlterarAluno');

    const formGetAlunoId = document.getElementById('formularioGetAlunoId');
    const formRemoverAluno = document.getElementById('fomularioRemoverAluno');

    btnPegarTodosAluno.addEventListener('click', getTodosAlunos);
    btnAlterarAluno.addEventListener('click', alterarAluno)

    formGetAlunoId.addEventListener('submit', getAluno);
    formRemoverAluno.addEventListener('submit', removerAluno);

    ckbNome.addEventListener('change', function (event) { 
        eventoChangeCkbNomeAlterar(event)
    });

    ckbCpf.addEventListener('change', function (event) { 
        eventoChangeCkbCPFAlterar(event)
    });

    ckbDataNascimento.addEventListener('change', function (event) { 
        eventoChangeCkbDataNascimentoAlterar(event)
    });

    enderecoEth.addEventListener('change', function (event) { 
        eventoChangeCkbEnderecoEthereum(event)
    });

    ckbEmail.addEventListener('change', function (event) { 
        eventoChangeCkbEmailAlterar(event)
    });

    ckbSenha.addEventListener('change', function (event) { 
        eventoChangeCkbSenhaAlterar(event)
    });
}


main();
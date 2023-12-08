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

    const formGetAlunoId = document.getElementById('formularioGetAlunoId');

    btnPegarTodosAluno.addEventListener('click', getTodosAlunos);

    formGetAlunoId.addEventListener('submit', getAluno);

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
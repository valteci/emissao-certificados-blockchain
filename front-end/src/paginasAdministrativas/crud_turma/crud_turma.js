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

    const cabecalho = tabela.querySelector('thead tr');

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

    const cabecalho = tabela.querySelector('thead tr');

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

    cabecalho.innerHTML = '<thead><th scope="col">#</th></thead>';


}

function buscarTodos() {
    inserirColunasDeTurma();
}

function buscarAlunosTurma(evt) {

    evt.preventDefault();
    inserirColunasDeAluno();
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



function main() {
    document.getElementById('formularioTodosAlunosTurma')
        .addEventListener('submit', buscarAlunosTurma);

    
    const ckbCodigo = document.getElementById('ckbCodigoTurmaAlterar');
    const ckbDataInicio = document.getElementById('ckbDataInicioAlterar');
    const ckbDataFim = document.getElementById('ckbDataFimAlterar');
    const ckbCodigoCurso = document.getElementById('ckbCodigoCursoAlterar');
    

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
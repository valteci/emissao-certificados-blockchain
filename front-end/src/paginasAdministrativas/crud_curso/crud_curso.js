function opcaoCadastrar() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'block';
}

function opcaoConsulta() {
    document.getElementById('consultar').style.display = 'block';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
}

function opcaoAlterar() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
    document.getElementById('alterar').style.display = 'block';
    document.getElementById('cadastrar').style.display = 'none';
}

function opcaoRemover() {
    document.getElementById('consultar').style.display = 'none';
    document.getElementById('remover').style.display = 'block';
    document.getElementById('alterar').style.display = 'none';
    document.getElementById('cadastrar').style.display = 'none';
}


function eventoChangeCkbCodigoAlterar(event) {
    const txtCodigo = document.getElementById('inputCodigoCursoAlterar');
    
    txtCodigo.disabled = ! event.target.checked;
}

function eventoChangeCkbNomeAlterar(event) {
    const txtNome = document.getElementById('inputNomeCursoAlterar');
    
    txtNome.disabled = ! event.target.checked;
}

function eventoChangeCkbCargaHorariaAlterar(event) {
    const txtCargaHoraria = document.getElementById('inputCargaHorariaCursoAlterar');
    
    txtCargaHoraria.disabled = ! event.target.checked;
}

function eventoChangeCkbDescricaoAlterar(event) {
    const txtDescricao = document.getElementById('textAreaDescricaoCursoAlterar');
    
    txtDescricao.disabled = ! event.target.checked;
}

function cadastrarCurso(evento) {

    evento.preventDefault();

    const codigo = document.getElementById('inputIdCursoCadastrar').value;
    const nome = document.getElementById('inputNomeCursoCadastrar').value;
    const cargaHoraria = document.getElementById('inputCargaHorariaCursoCadastrar').value;
    const descricao = document.getElementById('textAreaDescricaoCursoCadastrar').value;
    
    fetch('http://localhost:3333/curso/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            codigoCurso: Number(codigo),
            nome: nome,
            cargaHoraria: Number(cargaHoraria),
            descricao: descricao,
        })
        
    })
        .then(response => {
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert('Curso Criado Com Sucesso!');
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

function limparTabela(tabela) {    
    
    tabela.innerHTML = `<thead>                
                            <th scope="col">C&oacute;digo</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Carga-Hor&aacute;ria</th>
                            <th scope="col">Descri&ccedil;&atilde;o</th>
                        </thead>`
}

function mostrarDadosTabela(dados) {

    const tabela = document.getElementById('tabelaCursos');

    limparTabela(tabela);

    for (const iterator of dados) {
        
        const newRow = tabelaCursos.insertRow();

        const cellId = newRow.insertCell();
        cellId.appendChild(document.createTextNode(iterator.id));

        const cellNome = newRow.insertCell();
        cellNome.appendChild(document.createTextNode(iterator.nome));

        const cellCargaHoraria = newRow.insertCell();
        cellCargaHoraria.appendChild(document.createTextNode(iterator.cargaHoraria));

        const cellDescricao = newRow.insertCell();
        cellDescricao.appendChild(document.createTextNode(iterator.descricao));
    }
}

async function getTodosCursos() {
    
    try {

        const resposta = await fetch('http://localhost:3333/curso');
        const cursos = await resposta.json();        

        mostrarDadosTabela(cursos);                        

    } catch(erro) {
        console.error(erro);
    }

}

async function getCurso(evento) {
    evento.preventDefault();

    try {
        const codigo = document.getElementById('inputCodigoCursoConsultar').value;
        const resposta = await fetch(`http://localhost:3333/curso/${codigo}`);

        if (!resposta.ok) {
            const res_erro = await resposta.text();
            const erro = JSON.parse(res_erro).message;
            alert('Erro: ' + erro);
            throw erro;
        }
    
        const curso = await resposta.json()
        const dados = [curso];            


    } catch(erro) {
        console.error(erro);
    }

}

async function deletarCurso(evento) {
    evento.preventDefault();

    try {

        const codigo = document.getElementById('inputCodigoCursoRemover').value;

        const resposta = await fetch(`http://localhost:3333/curso/${codigo}`, {
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

        alert("Curso Deletado Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }
}

async function atualizarCurso() {

    const dadosAlterados = {};

    const codigoAlvo = document.getElementById("inputCodigoCursoAlvoAlterar").value;

    dadosAlterados.codigoCursoAlvo = Number(codigoAlvo);

    const novoCodigo = document.getElementById("inputCodigoCursoAlterar");
    const novoNome = document.getElementById("inputNomeCursoAlterar");
    const novaCargaHoraria = document.getElementById("inputCargaHorariaCursoAlterar");
    const novaDescricao = document.getElementById("textAreaDescricaoCursoAlterar");

    if ((! novoCodigo.disabled) && (Number(novoCodigo.value) > 0))
        dadosAlterados.novoCodigoCurso = Number(novoCodigo.value);

    if ((! novoNome.disabled) && (novoNome.value !== ''))
        dadosAlterados.novoNome = novoNome.value;

    if ((! novaCargaHoraria.disabled) && (Number(novaCargaHoraria.value) > 0))
        dadosAlterados.novaCargaHoraria = Number(novaCargaHoraria.value);

    if ((! novaDescricao.disabled) && (novaDescricao.value !== ''))
        dadosAlterados.novaDescricao = novaDescricao.value;
    
    
    if (Object.keys(dadosAlterados).length === 1) {
        alert('Preencha Os Dados Que Deseja Alterar!')
        return;
    }
    
    

    try {

        const resposta = await fetch('http://localhost:3333/curso/update', {
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

        alert("Dados Alterado Com Sucesso!");

    } catch(erro) {
        console.error(erro);
    }

}


function main() {

    const ckbCodigo = document.getElementById('ckbCodigoCursoAlterar');
    const ckbNome = document.getElementById('ckbNomeCursoAlterar');
    const ckbCargaHoraria = document.getElementById('ckbCargaHorariaCursoAlterar');
    const ckbDescricao = document.getElementById('ckbDescricaoCursoAlterar');
    
    const formularioCadastrar = document.getElementById('formularioCadastrarCurso');
    const formularioConsultarCurso = document.getElementById('formularioConsultarCurso');
    const formularioDeletar = document.getElementById('formularioDeletar');

    const btnBuscarTodosCursos = document.getElementById('btnBuscarTodosCursos');
    const btnAlterarCurso = document.getElementById('btnAlterarCurso');

    formularioCadastrar.addEventListener('submit', cadastrarCurso);
    formularioConsultarCurso.addEventListener('submit', getCurso);
    formularioDeletar.addEventListener('submit', deletarCurso);


    btnBuscarTodosCursos.addEventListener('click', getTodosCursos);
    btnAlterarCurso.addEventListener('click', atualizarCurso);
    

    ckbCodigo.addEventListener('change', function (event) { 
        eventoChangeCkbCodigoAlterar(event)
    });

    ckbNome.addEventListener('change', function (event) { 
        eventoChangeCkbNomeAlterar(event)
    });

    ckbCargaHoraria.addEventListener('change', function (event) { 
        eventoChangeCkbCargaHorariaAlterar(event)
    });

    ckbDescricao.addEventListener('change', function (event) { 
        eventoChangeCkbDescricaoAlterar(event)
    });

}


main();
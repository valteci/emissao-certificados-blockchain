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
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            
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

async function getTodosCursos() {
    
    try {

        const resposta = await fetch('http://localhost:3333/curso');

        const cursos = await resposta.json()

        const tabela = document.getElementById('tabelaCursos');
        
        limparTabela(tabela);

        for (const iterator of cursos) {
            
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
    const btnBuscarTodosCursos = document.getElementById('btnBuscarTodosCursos');

    formularioCadastrar.addEventListener('submit', cadastrarCurso);
    btnBuscarTodosCursos.addEventListener('click', getTodosCursos);
    

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
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



function main() {

    const ckbCodigo = document.getElementById('ckbCodigoCursoAlterar');
    const ckbNome = document.getElementById('ckbNomeCursoAlterar');
    const ckbCargaHoraria = document.getElementById('ckbCargaHorariaCursoAlterar');
    const ckbDescricao = document.getElementById('ckbDescricaoCursoAlterar');
    

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
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

function main() {

}


main();
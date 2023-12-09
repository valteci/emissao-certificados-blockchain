function opcaoCadastrar() {
    
}

function cadastrarCertificado(evento) {
    evento.preventDefault();

    const codigoCurso = document.getElementById('inputIdCursoCadastrar').value;
    const matriculaAluno = document.getElementById('inputMatriculaAlunoCadastrar').value;
    const dados = document.getElementById('textAreaDescricaoCertificadoCadastrar').value;
    const emitirEmBlockchain = document.getElementById('radioButtonEmitir').checked;

    fetch(`http://localhost:3333/certificado/emitir/blockchain=${emitirEmBlockchain}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            matriculaAluno: matriculaAluno,
            dados: dados,           
            idCurso: Number(codigoCurso)
        })
        
    })
        .then(response => {
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            alert('Certificado Emitido Com Sucesso!');
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

function main() {
    const formCadastrarCertificado = document.getElementById('fomularioCadastrarCertificado');

    formCadastrarCertificado.addEventListener('submit', cadastrarCertificado);
}


main();
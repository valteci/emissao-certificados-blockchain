function opcaoCadastrar() {
    
}

function cadastrarCertificado(evento) {
    evento.preventDefault();
    document.getElementById('informacoesBlockchain').style.display = 'none';

    const loader = document.getElementById('loader');
    
    loader.style.display = 'block';

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
            loader.style.display = 'none'
            if (!response.ok) {
                response.text().then((erro)=>{
                    alert('Erro: ' + JSON.parse(erro).message);
                })
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            
            alert('Certificado Emitido Com Sucesso!');

            if (emitirEmBlockchain) {
                const elemento = document.getElementById('informacoesBlockchain');
                elemento.style.display = 'block';

                response.json()
                    .then(dados => {
                        const h4 = document.getElementById('enderecoContrato');
                        h4.textContent = 'Edereço Do Contrato: ' + dados.enderecoContrato;

                        const link = document.getElementById('linkBlockchain');
                        link.setAttribute('href', dados.url);

                    })
            }

            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
            loader.style.display = 'none'
        });
}

function main() {
    const formCadastrarCertificado = document.getElementById('fomularioCadastrarCertificado');

    formCadastrarCertificado.addEventListener('submit', cadastrarCertificado);
}


main();
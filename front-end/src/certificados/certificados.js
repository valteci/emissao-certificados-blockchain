async function verificarCertificado() {
    
}

async function getPublicKey() {
    const response = await fetch('http://localhost:3333/certificado/publicKey');
    const json = await response.json();
    return json.publicKey;
}

function showPublicKey() {
    getPublicKey()
        .then(publicKey => {
            document.getElementById('publicKey').textContent = 
                'Chave Pública da Instituição: ' + publicKey;
        })
        .catch(err => {
            alert('Não foi possível carregar a chave pública da instituição');
        })
}

document.getElementById('formularioEnderecoContrato')
    .addEventListener('submit', verificarCertificado);

showPublicKey();

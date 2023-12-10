async function verificarCertificado(evento) {
    document.getElementById('invalido').style.display = 'none';
    document.getElementById('valido').style.display = 'none';
    evento.preventDefault();

    try {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';

        const enderecoContrato = document.getElementById('inputEnderecoCertificado').value;
        const resposta = await fetch(`http://localhost:3333/certificado/verify/${enderecoContrato}`);

        if (!resposta.ok) {
            const erro = await resposta.text();
            alert('Erro: ' + JSON.parse(erro).message);
            throw erro;
        }

        const dados = await resposta.json();

        if (dados.isValid) {
            document.getElementById('valido').style.display = 'block';
            document.getElementById('link').setAttribute(
                'href',
                `https://sepolia.etherscan.io/address/${enderecoContrato}#readContract`)
        }
        else {
            document.getElementById('invalido').style.display = 'block';
        }

        document.getElementById('loader').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';

    } catch(erro)  {
        console.log(erro);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
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

function main() {
    document.getElementById('formularioEnderecoContrato')
    .addEventListener('submit', verificarCertificado);

    showPublicKey();
}

main();

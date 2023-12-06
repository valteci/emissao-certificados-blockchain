function opcaoDadosAluno() {    
    document.getElementById('alterarDadosAluno').style.display = 'block';
    document.getElementById('certificadosAluno').style.display = 'none';
}

function opcaoCertificadosAluno() {
    document.getElementById('alterarDadosAluno').style.display = 'none';
    document.getElementById('certificadosAluno').style.display = 'block';
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

function adicionarEventos() {
    const ckbNome = document.getElementById('ckbNomeAlterar');
    const ckbCpf = document.getElementById('ckbCPFAlterar');
    const ckbDataNascimento = document.getElementById('ckbDataNascimentoAlterar');
    const enderecoEth = document.getElementById('ckbEnderecoEthereum');
    const ckbEmail = document.getElementById('ckbEmailAlterar');

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
}

async function getAluno() {
    
    try {
        
        const resposta = fetch('http://localhost:3333/students/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        const dadosAluno = (await resposta).json();

        return dadosAluno;


    } catch(erro) {
        console.error(erro);
    }

    /* fetch('http://localhost:3333/students/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(response => {
            if (!response)
                throw new Error(`HTTP error! status: ${response.status}`);

                return response.json();
        })
        .then(dadosAluno => {
            dados = dadosAluno;
        })
        .catch(erro => {
            console.error('Erro ao processar a resposta: ', erro);
        }) */
}

async function main() {
    
    adicionarEventos();
    const dadosAluno = await getAluno();

}


main();
let cursos = {

}

function copyPrivateKeyToClipboard() {
    const pk = document.getElementById('chavePrivada');
    
    pk.select();
    navigator.clipboard.writeText(pk.value)
        .then(() => {

            const botaoCopy = document.getElementById('btnCopiarChavePrivada');
            botaoCopy.style.background = 'green';
            botaoCopy.textContent = 'copiado ✔️';

            const animacao = () => {
                botaoCopy.style.background = '#0b5ed7';
                botaoCopy.textContent = 'copiar';
            }

            setTimeout(animacao, 500);
        })
        .catch(err => {
            alert('Não foi possível copiar o texto para a Área de Transferência');
        })
}

function copyAddressToClipboad() {
    const endereco = document.getElementById('endereco');

    endereco.select();
    navigator.clipboard.writeText(endereco.value)
    .then(() => {
        const botaoCopy = document.getElementById('btnCopiarEndereco');
            botaoCopy.style.background = 'green';
            botaoCopy.textContent = 'copiado ✔️';

            const animacao = () => {
                botaoCopy.style.background = '#0b5ed7';
                botaoCopy.textContent = 'copiar';
            }

            setTimeout(animacao, 500);
    })
    .catch(err => {
        alert('Não foi possível copiar o texto para a Área de Transferência');
    })

}


async function carregarCursos() {

    const response = await fetch('http://localhost:3333/curso');
    const json = await response.json();
    
    cursos = json;

    const select = document.getElementById('comboboxCurso');

    Object.keys(cursos).forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        select.appendChild(option);
    })
}


function enviarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById('inputNome').value;
    const cpf = document.getElementById('inputCpf').value;
    const email = document.getElementById('inputEmail').value;
    const data = document.getElementById('inputDataNascimento').value;
    const senha = document.getElementById('inputSenha').value;
    const enderecoEth = document.getElementById('inputEnderecoEthereum').value;
    const curso = document.getElementById('comboboxCurso').value;
            
    const codigoCurso = cursos[curso];
    const dataCompleta = `${data}T00:00:00Z`;
    const anoAtual = new Date().getFullYear().toString();
    const matricula = `${cpf}${anoAtual}${codigoCurso}`;
    
    fetch('http://localhost:3333/Auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matricula: matricula,
            password: senha,
            nome: nome,
            email: email,
            cpf: cpf,
            dataNascimento: dataCompleta, // Substitua por uma data ISO-8601 válida, ex: "1990-01-01T00:00:00Z"
            endereco_eth: enderecoEth
        })
        
    })
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            
            return response.json();
        })
        .then(data => {                                    

            window.location.href = './redirecionamento/redirecionamento.html';
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

document.getElementById('btnEnviarForm').addEventListener('click', enviarFormulario);
carregarCursos();
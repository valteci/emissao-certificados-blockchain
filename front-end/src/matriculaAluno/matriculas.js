let cursos = {

}

function limparFormulario() {
    
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
    console.log('esta funcionando!');
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
            
            alert("Cadastro realizado com sucesso!");
            console.log('Cadastro realizado com sucesso', data);

            document.getElementById('meuFormulario').reset();
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

document.getElementById('meuFormulario').addEventListener('submit', enviarFormulario);
carregarCursos();
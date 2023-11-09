const cursos = {

}

function carregarCursos() {
    cursos['Programação Python'] = 1;
    cursos['Inteligência Artificial'] = 2;
    cursos['Desenvolvimento Web'] = 3;
    cursos['Arduino'] = 4;


    

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

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const data = document.getElementById('dataNascimento').value;
    const senha = document.getElementById('senha').value;
    const enderecoEth = document.getElementById('enderecoEth').value;
    const curso = document.getElementById('comboboxCurso').value;        
    
    const dataCompleta = `${data}T00:00:00Z`;
    const anoAtual = new Date().getFullYear().toString();
    const matricula = `${cpf}${anoAtual}${curso}`;
    
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
            console.log('Cadastro realizado com sucesso', data);
            
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
}

document.getElementById('meuFormulario').addEventListener('submit', enviarFormulario);
carregarCursos();
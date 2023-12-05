

function signin(evento) {
    
    evento.preventDefault();

    const txtEmail = document.getElementById('inputEmail');
    const txtSenha = document.getElementById('inputSenha');

    const email = txtEmail.value;
    const senha = txtSenha.value;

    if (senha === '') {
        alert('Preencha Sua Senha!');
        return;
    }

    if (email === '') {
        alert('Preencha Seu Email!');
        return;
    }

    
    fetch('http://localhost:3333/Auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: senha
        })
        
    })
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            
            return response.json();
        })
        .then(data => {                                    

            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao processar a resposta: ', error);
        });
    
}

function main() {

    const formLogin = document.getElementById('formLogin');

    formLogin.addEventListener('submit', function (evento) {
        signin(evento);
    });

}

main();
const inpEmail = document.querySelector('#inpEmail')
const inpSenha = document.querySelector('#inpSenha')
var btnEnviar = document.querySelector("#btn");
var acc = false;

inpEmail.value = "gere@gmail.com"

inpSenha.value = "senha123"

function logar() {

    var dados = {
        email: inpEmail.value,
        senha: inpSenha.value
    }


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };


    fetch("http://localhost:3000/login/validar", options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)

            if ((dados.email == data.email) && (dados.senha == data.senha)) {
                acc = true;
            }

            if (acc == true) {
                alert("acesso permitido");
                localStorage.setItem('User', data.cargo);
                window.location.href = "../home/index.html";
            } else {
                alert("acesso negado");
            }
        })
}
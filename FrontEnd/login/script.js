const inpEmail = document.querySelector('#inpEmail')
const inpSenha = document.querySelector('#inpSenha')
var btnEnviar = document.querySelector("#btn");
var acc = false;

btnEnviar.addEventListener("click", ()=>{
fetch("http://localhost:3000/login/validar")
.then((response) => {
    return response.json();
})
    .then((data) => {
        data.forEach(info => {
            if((inpEmail.value == info.email) && (inpSenha.value == info.senha)) {
                acc = true;
            }
        })
        if(acc == true){
            alert("acesso permitido");
            window.location.href = "../Posts/index.html";
        } else {
            alert("acesso negado");
        }
    })
})


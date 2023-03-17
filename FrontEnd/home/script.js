const item = document.querySelector('.item')
const itemList = document.querySelector('.item-list')
var userId = localStorage.getItem('userID');
var aux = null;



fetch('http://localhost:3000/login/readId/' + userId)
    .then(resp => { return resp.json() })
    .then(data => {
        console.log(data[0].cargo)
        if (data[0].cargo == "operario") {
            aux = 0;
        } else
            aux = 1;
            localStorage.setItem('cargo', aux);
    })


function Frota() {
    console.log(aux)
    if (aux == 1) {
        window.location.href = '../frotas/index.html'
    } else {
        alert("acesso não permitido")
    }
}

function Motorista() {
    if (aux == 1)
        window.location.href = '../motoristas/index.html'
    else
        alert("acesso não permitido")
}
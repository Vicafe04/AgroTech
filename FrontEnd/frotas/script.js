const lista = document.querySelector(".list");
const itemlista = document.querySelector(".item-list");
const inpModel = document.querySelector("#inpMarca");
const inpMarca = document.querySelector("#inpModelo");
const inpPlaca = document.querySelector("#inpPlaca");

function load() {
    fetch("http://localhost:3000/frota/read")
        .then(resp => { return resp.json() })
        .then(frota => {
            frota.forEach(e => {
                let item = itemlista.cloneNode(true);
                item.classList.remove("model");
                item.querySelector(".marca").innerHTML = 'Marca: ' + e.marca;
                item.querySelector(".modelo").innerHTML = 'Modelo: ' + e.modelo;
                item.querySelector(".placa").innerHTML = 'Placa: ' + e.placa;
                item.querySelector("#delBTN").setAttribute("onclick", `del('${e.id}')`);
                e.manutencao.forEach(desc => {
                    item.querySelector("#descBTN").setAttribute("onclick", `modalDesc('${desc.descricao}')`);
                })
                lista.appendChild(item);
            })
        })
}

function add() {
    var dados = {
        modelo: inpModel.value,
        marca: inpMarca.value,
        placa: inpPlaca.value
    }
    console.log(inpModel.value)
    console.log(inpMarca.value)
    console.log(inpPlaca.value)


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };
    fetch("http://localhost:3000/frota/create", options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200)
                window.location.reload()
            else
                console.log(resp)
            alert("Item já está cadastrado.");
        })
        .catch(err => console.error(err));
}

function del(id) {
    if (confirm("Confirma a exclusão do veículo id: " + id)) {
        const options = {
            method: 'DELETE'
        };
        fetch("http://localhost:3000/frota/delete/" + id, options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 200) {
                    window.location.reload();
                }
            })
            .catch(err => alert("Erro ao enviar dados, Erro:" + err));
    }
}

function modalDesc(desc) {
    console.log(desc)
    document.querySelector(".desc").innerHTML = desc;
}
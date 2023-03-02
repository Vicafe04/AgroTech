const lista = document.querySelector(".list")
const itemlista = document.querySelector(".item-list")


function load() {
    fetch("http://localhost:3000/frota/read")
        .then(resp => { return resp.json() })
        .then(frota => {
            console.log(frota)

            frota.forEach(e => {
                let item = itemlista.cloneNode(true);
                item.classList.remove("model");
                item.querySelector(".marca").innerHTML = 'Marca: ' + frota.marca;
                item.querySelector(".modelo").innerHTML = 'Modelo: ' + frota.modelo;
                item.querySelector(".placa").innerHTML = 'Placa: ' + frota.placa;
                lista.appendChild(item);
            })
        })
}
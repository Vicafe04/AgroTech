const list = document.querySelector(".list")
const itemList = document.querySelector(".item-list")
const list2 = document.querySelector(".list2")
const itemList2 = document.querySelector(".item-list2")

const inpIdFrot = document.querySelector(".idFrot")
const volunteerBTN = document.querySelector("#volunteerBTN")

fetch("http://localhost:3000/servico/read")
    .then(resp => { return resp.json() })
    .then(data => {
        load(data);
    })

function load(data) {
    data.forEach(servicos => {
        if ((servicos.Frota[0] == null) || (servicos.motorista[0] == null)) {
            let item = itemList2.cloneNode(true);
            item.classList.remove("model");
            item.querySelector(".imgDelivery").src = "../../Docs/img/delivery.png";
            item.querySelector(".id").innerHTML = "Id: " + servicos.id;
            item.querySelector(".destino").innerHTML = "Destino: " + servicos.descricao;
            item.querySelector(".dataSaida").innerHTML = "Data de saida: " + servicos.data_saida.split('T')[0];
            item.querySelector(".dataRetorno").innerHTML = "Data de retorno: " + servicos.retorno.split('T')[0];
            // item.querySelector("#volunteerBTN").setAttribute("onclick", `volunteerFunc('${servicos.id}')`);
            list2.appendChild(item);
        } else {
            let item = itemList.cloneNode(true);
            item.classList.remove("model");
            item.querySelector(".imgDelivery").src = "../../Docs/img/delivery.png";
            item.querySelector(".id").innerHTML = "Id: " + servicos.id;
            item.querySelector(".destino").innerHTML = "Destino: " + servicos.descricao;
            item.querySelector(".motorista").innerHTML = "Motorista: " + servicos.motorista[0].nome;
            item.querySelector(".veiculo").innerHTML = "Veiculo: " + servicos.Frota[0].marca + servicos.Frota[0].modelo;
            item.querySelector(".placa").innerHTML = "Placa: " + servicos.Frota[0].placa;
            item.querySelector(".dataSaida").innerHTML = "Data de saida: " + servicos.data_saida.split('T')[0];
            item.querySelector(".dataRetorno").innerHTML = "Data de retorno: " + servicos.retorno.split('T')[0];
            list.appendChild(item);

        }

    })


}

function volunteerFunc(id) {
    const idServico = id.parentNode.querySelector(".id").innerHTML.split(" ")[1];
    const inpIdFunc = id.parentNode.querySelector(".idFunc");
    const inpIdFrot = id.parentNode.querySelector(".idFrot");
    console.log(idServico)

    let dados = {
        servicoId: Number(idServico)
    }

    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }

    fetch(`http://localhost:3000/motorista/update/${inpIdFunc.value}`, options)
        .then(resp => { return resp.json() })
        .then(data => console.log(data))

    //-------------------------------------------------------------------------------------------------------------------

    fetch("http://localhost:3000/frota/read")
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data[0])
        })
}
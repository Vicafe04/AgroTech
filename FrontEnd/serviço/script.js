const list = document.querySelector(".list")
const itemList = document.querySelector(".item-list")

fetch("http://localhost:3000/servico/read")
    .then(resp => { return resp.json() })
    .then(data => {
        load(data);
    })

function load(data) {
    data.forEach(servicos => {
        let item = itemList.cloneNode(true);
        item.classList.remove("model");
        item.querySelector(".imgDelivery").src = "../../Docs/img/delivery.png"
        item.querySelector(".destino").innerHTML = "Destino:" + "<br/>" + servicos.descricao
        item.querySelector(".motorista").innerHTML = "Motorista:" + "<br/>" + servicos.motorista[0].nome
        item.querySelector(".veiculo").innerHTML = "Veiculo:" + "<br/>" + servicos.Frota[0].marca + servicos.Frota[0].modelo
        item.querySelector(".placa").innerHTML = "Placa:" + "<br/>" + servicos.Frota[0].placa
        item.querySelector(".dataSaida").innerHTML = "Data de saida:" + "<br/>" + servicos.data_saida.split('T')[0];
        item.querySelector(".dataRetorno").innerHTML = "Data de retorno:" + "<br/>" + servicos.retorno.split('T')[0];

        list.appendChild(item);
    })
}
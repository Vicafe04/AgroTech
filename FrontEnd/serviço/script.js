const list = document.querySelector(".list")
const itemList = document.querySelector(".item-list")
const list2 = document.querySelector(".list2")
const itemList2 = document.querySelector(".item-list2")



var userCargo = localStorage.getItem('cargo');



fetch("http://localhost:3000/servico/read")
    .then(resp => { return resp.json() })
    .then(data => {
        load(data);
    })

function load(data) {
    data.forEach(servicos => {

        let item = itemList.cloneNode(true);
        item.classList.remove("model");
        item.querySelector(".imgDelivery").src = "../../Docs/img/delivery.png";
        item.querySelector(".id").innerHTML = "Id: " + servicos.id;
        item.querySelector(".destino").innerHTML = "Destino: " + servicos.descricao;
        item.querySelector(".motorista").innerHTML = "Motorista: " + servicos.motorista[0].nome;
        item.querySelector(".veiculo").innerHTML = "Veiculo: " + servicos.Frota[0].marca + " " + servicos.Frota[0].modelo;
        item.querySelector(".placa").innerHTML = "Placa: " + servicos.Frota[0].placa;
        item.querySelector(".dataSaida").innerHTML = "Data de saida: " + servicos.data_saida.split('T')[0];
        item.querySelector(".dataRetorno").innerHTML = "Data de retorno: " + servicos.retorno.split('T')[0];
        list.appendChild(item);

    })
}

function volunteerFunc(id) {
    const inpIdFunc = document.querySelector(".idFunc")
    const inpIdFrot = document.querySelector(".idFrot")

    let dados = {
        servicoId: Number(id)
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

    fetch(`http://localhost:3000/frota/update/${inpIdFrot.value}`, options)
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data)
        })
}

function criarServico() {
    const inpDestino = document.querySelector(".inpDestino")
    const inpDataSaida = document.querySelector(".inpDataSaida")
    const inpDataRetorno = document.querySelector(".inpDataRetorno")
    if (userCargo == 1) {
        var dados = {
            descricao: inpDestino.value,
            data_saida: inpDataSaida.value,
            retorno: inpDataRetorno.value,
        }
    
    
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        };
        fetch("http://localhost:3000/servico/create", options)
            .then(resp => resp.json())
            .then(data=> {
                if(data.id) {
                    volunteerFunc(data.id)
                }else {
                    alert("Falha ao cadastrar");
                }
                // if (resp == 200)
                //     window.location.reload()
                // else
                //     console.log(resp)
                // alert("Item já está cadastrado.");
            })
            .catch(err => console.error(err));
    } else {
        alert("Esta ação não é permitida no seu cargo")
    }
}
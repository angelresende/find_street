function consultar(){
    let cep = document.getElementById("cep").value;
    let url =  `https://viacep.com.br/ws/${cep}/json/`;
    //console.log(url);

    $.ajax({
        url: url,
        type: "GET",
        success: function(response){
            console.log(response);               
        }
    })
}

var street = [];
adress = () => {
    let itens = JSON.parse(localStorage.getItem('street'));
    var containerAdress = document.getElementById('enderecos-tbody');
    containerAdress.innerHTML = "";
    if(itens != null) {
        itens.map((response) => {
            containerAdress.innerHTML += `
                <tr>
                <td>${response.cep}</td>
                <td>${response.logradouro}</td>
                <td>${response.bairro}</td>
                <td>´${response.localidade}./.${response.uf}´</td>                   
                <td class="product-remove"><a href="#" onclick="removeCart('${response.cep}')">Excluir</a></td>
                </tr>
            `;
        });
    } else {
        containerAdress.innerHTML = `
        <p id="start-wrapper" class="text-center text-muted">
          Você ainda nao buscou nenhum endereço, utilize o campo CEP para
          iniciar a busca.
        </p>
        `;
    }
};


function removeCart(id) {
    let itens = JSON.parse(localStorage.getItem('street'));
    var remove = itens.filter(function(el) {
        return el.id != id;
    });
    localStorage.removeItem('street');
    if(remove.length > 0) {
        localStorage.setItem('street', JSON.stringify(remove));
    }
    cart();
}
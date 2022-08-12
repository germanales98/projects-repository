document.addEventListener('DOMContentLoaded', function () {
    /* A traves de la funcion Fectch se realiza una peticion a la URL donde se encuentran los productos. */
    fetch(`${PRODUCTS_URL}101.json`)
        /* Recogemos la promesa en un then, esto va a recibir una respuesta("res")
        Esta respuesta llega en formato String y la parseamos con el metodo json() */
        .then(res => res.json())
        /* Esto a su vez devuelve otra promesa, que son los productos dentro del objeto "data" donde vamos a trabajar */
        .then(data => {
            /* Se crea la variable "divProductsList", donde se guarda el id de un div, en este caso "prod-list-container" donde se mostrara la lista de productos en html. */
            let divProductsList = document.getElementById('prod-list-container');
            /* A continuación se crea una estructura for, donde se recorre el arreglo de los productos "data.products", esto va a suceder
            hasta que la variable i sea menor a la cantidad de objetos que tiene el arreglo "data.products.length."
            Por cada iteracion de la estructura for, se agrega a la variable divProductsList una plantilla con los datos
            deseados de los productos que imprimiremos con innerHTML. */
            for (let i = 0; i < data.products.length; i++) {
                /* console.log(data.products[i].name); */
                divProductsList.innerHTML += `
            <div onclick="setCatID(${data.products[i].id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${data.products[i].image}" alt="${data.products[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h4>
                            <small class="text-muted">${data.products[i].soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${data.products[i].description}</p>
                    </div>
                </div>
            </div>
            `
            }
        });
});
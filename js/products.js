let divProductsList = document.getElementById('prod-list-container');
let btnSortAsc = document.getElementById('sortAsc');
let btnSortDesc = document.getElementById('sortDesc');
let btnSortByRel = document.getElementById('sortByRel');
let inputMin = document.getElementById('rangeFilterCountMin');
let inputMax = document.getElementById('rangeFilterCountMax');
let btnRangeFilterCount = document.getElementById('rangeFilterCount');
let btnClearRangeFilter = document.getElementById('clearRangeFilter');
let catID = JSON.parse(localStorage.getItem("catID"));
let inputSearch = document.querySelector('#search');
let min = undefined;
let max = undefined;
let productsArray = [];
let productsArrayOriginal = [];
let catNameArray = [];

//Mostrar el usuiaro en la sección nav
function showUserName() {
    let nameUser = document.getElementById('nameUser');
    let userNormal = localStorage.getItem("nameUser");
    let userGoogle = localStorage.getItem("userGoogle");

    if (userNormal === null) {
        nameUser.innerHTML += `${userGoogle}`
    } else {
        nameUser.innerHTML += `${userNormal}`
    }
}
showUserName();
//Funcion para que el identificador se guarde en el almacenamiento local y se redirija a product-info.html
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

function showTitle() {
    let pCatName = document.getElementById('catName');
    pCatName.innerHTML += `
         <b>${catNameArray}</b>
     `
}

/* A continuación se crea una estructura for, donde se recorre el arreglo de los productos "data.products", esto va a suceder
hasta que la variable i sea menor a la cantidad de objetos que tiene el arreglo "data.products.length."
Por cada iteracion de la estructura for, se agrega a la variable divProductsList una plantilla con los datos
deseados de los productos que imprimiremos con innerHTML. */
function showProducts() {

    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {
        let products = productsArray[i];

        if (((min == undefined) || (min != undefined && parseInt(products.cost) >= min)) &&
            ((max == undefined) || (max != undefined && parseInt(products.cost) <= max))) {

            htmlContentToAppend += `
     <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
         <div class="row">
             <div class="col-3">
                 <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
             </div>
             <div class="col">
                 <div class="d-flex w-100 justify-content-between">
                     <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                     <small class="text-muted">${products.soldCount} vendidos</small>
                 </div>
                 <p class="mb-1">${products.description}</p>
             </div>
         </div>
     </div>
     `
            divProductsList.innerHTML = htmlContentToAppend;
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    /* A traves de la funcion Fectch se realiza una peticion a la URL donde se encuentran los productos. */
    fetch(`${PRODUCTS_URL}${catID}.json`)
        /* Recogemos la promesa en un then, esto va a recibir una respuesta("res")
        Esta respuesta llega en formato String y la parseamos con el metodo json() */
        .then(res => res.json())
        /* Esto a su vez devuelve otra promesa, que son los productos dentro del objeto "data" donde vamos a trabajar */
        .then(data => {
            productsArrayOriginal = data.products;
            productsArray = data.products;
            catNameArray = data.catName;
            showProducts();
            showTitle();
        });
    //Mostrar productos por su precio de forma Asc
    btnSortAsc.addEventListener('click', function () {
        productsArray.sort((a, b) => {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
        showProducts();
    });
    //Mostrar productos por su precio de forma Des
    btnSortDesc.addEventListener('click', function () {
        productsArray.sort((a, b) => {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
        showProducts();
    });
    //Mostrar productos por su precio de forma Rel
    btnSortByRel.addEventListener('click', function () {
        productsArray.sort((a, b) => {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
        showProducts();
    });
    //Boton para borrar los filtros
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        inputMin.value = "";
        inputMax.value = "";

        min = undefined;
        max = undefined;

        showProducts();
    });
    //Mostrar productos segun un rango de precio
    btnRangeFilterCount.addEventListener('click', function () {
        min = inputMin.value;
        max = inputMax.value;

        if ((min != undefined) && (min != "") && (parseInt(min)) >= 0) {
            min = parseInt(min);
        }
        else {
            min = undefined;
        }

        if ((max != undefined) && (max != "") && (parseInt(max)) >= 0) {
            max = parseInt(max);
        }
        else {
            max = undefined;
        }

        showProducts();
    });
    //Buscador de productos
    inputSearch.addEventListener('keyup', e => {
        productsArray = productsArrayOriginal.filter(prod => prod.name.toLowerCase().includes(inputSearch.value.toLowerCase()) || prod.description.toLowerCase().includes(inputSearch.value.toLowerCase()));
        showProducts();
    });

    document.getElementById("closeSession").addEventListener("click", function () {
        sessionStorage.removeItem("user");
        localStorage.clear();
        location.reload();
    });
});
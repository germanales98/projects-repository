let divProdInfoList = document.getElementById('prod-info-container');
let divCarouselImg = document.getElementById('carousel-img');
let prodID = JSON.parse(localStorage.getItem("ProdID"));
let divcommentList = document.getElementById('comment-list');
let formSendComment = document.getElementById('send-comment');
const container = document.querySelector('.rating');
const items = container.querySelectorAll('.rating-item')
let fecha = new Date();
let dia = fecha.getDate();
let mes = fecha.getMonth() + 1;
let anio = fecha.getFullYear();
let hora = fecha.getHours();
let minutes = fecha.getMinutes();
let second = fecha.getSeconds();
let fechaTotal = `${anio}-${mes}-${dia} ${hora}:${minutes}:${second}`;
let prodInfoArray = [];
let prodInfoImgArray = [];
let prodComments = [];

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

// A traves de la funcion showProdInfo(), podemosobtener toda la informacion necesaria de la informacion de los productos.
function showProdInfo() {
    let htmlContentToAppend = "";
    let htmlContentToAppendNew = "";

    htmlContentToAppend = `
        <div class="text-start p-5">
            <h2>${prodInfoArray.name}</h2>
            <hr class="my-4">

            <div class="text-start col">
                <p class="mb-4"><strong>Precio</strong><br>${prodInfoArray.currency} ${prodInfoArray.cost}</br></p>
            </div>
            <div class="text-start col">
                <p class="mb-4"><strong>Descripción</strong><br>${prodInfoArray.description}</br></p>
            </div>
            <div class="text-start col">
                <p class="mb-4"><strong>Categoria</strong><br>${prodInfoArray.category}</br></p>
            </div>
            <div class="text-start col">
                <p class="mb-4"><strong>Cantidad vendidos</strong><br>${prodInfoArray.soldCount}</br></p>
            </div>
            <div class="text-center col">
                <h4><strong>Imágenes ilustrativas</strong></h4>
            </div>
        </div>
        `
    divProdInfoList.innerHTML = htmlContentToAppend;

    htmlContentToAppendNew = `
        <div class="carousel-item active">
            <img id="first-img" src="${prodInfoImgArray[0]}" class="d-block w-50" alt="...">
        </div>
        <div class="carousel-item">
            <img id="second-img" src="${prodInfoImgArray[1]}" class="d-block w-50" alt="...">
        </div>
        <div class="carousel-item">
            <img id="third-img" src="${prodInfoImgArray[2]}" class="d-block w-50" alt="...">
        </div>
        <div class="carousel-item">
            <img id="quarter-img" src="${prodInfoImgArray[3]}" class="d-block w-50" alt="...">
        </div>
    `
    divCarouselImg.innerHTML = htmlContentToAppendNew;
}

// A traves de la funcion showComments(), podemos obtener todos los comentarios de dichos productos.
function showComments() {
    htmlContentToAppend = "";
    let star = "";

    for (let i = 0; i < prodComments.length; i++) {
        let comment = prodComments[i];

        if (comment.score === 1) { star = `<span class="fa fa-star checked"></span>` }
        else if (comment.score === 2) { star = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>` }
        else if (comment.score === 3) { star = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>` }
        else if (comment.score === 4) { star = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>` }
        else if (comment.score === 5) { star = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>` };

        htmlContentToAppend += `
        <li class="list-group-item">
            <h6><b>${comment.user}</b> ` + ` - ` + ` ${comment.dateTime}  ` + ` - ` + ` ${star}</h6>
            <p>${comment.description}</p>
        </li>`
        divcommentList.innerHTML = htmlContentToAppend;
    }

}

document.addEventListener('DOMContentLoaded', function (e) {
    // Fetch para acceder a la json de los comentarios, a traves de su identificador.
    fetch(`${PRODUCT_INFO_COMMENTS_URL}${prodID}.json`)
        .then(res => res.json())
        .then(data => {
            prodComments = data;
            showComments();
        });
    // Fetch para acceder al jaso de la informacion de los productos, a traves de su identificador.
    fetch(`${PRODUCT_INFO_URL}${prodID}.json`)
        .then(res => res.json())
        .then(data => {
            prodInfoArray = data;
            prodInfoImgArray = data.images;
            showProdInfo();
        });
    // Funcion para que el usuario elija las estrellas de puntuacion que quiere darle al producto.
    container.onclick = e => {
        const elClass = e.target.classList;
        // cambia la calificación si el usuario hace clic en una estrella diferente
        if (!elClass.contains('active')) {
            items.forEach( // restablecer la clase activa en la estrella
                item => item.classList.remove('active')
            );
            elClass.add('active'); // agregar clase activa a la estrella en la que se hizo clic
            stars = e.target.getAttribute("data-rate");
        }
    };
// Envio del formulario tipo submit con el comentario y se muestra en pantalla.
    formSendComment.addEventListener("submit", function (e) {

        e.preventDefault();

        let opinion = document.getElementById('opinion');
        let comentario = opinion.value;
        let usuario = "";

        if (comentario === "") {
            alert("Comentario vacio, complete para continuar.");
        } else if (localStorage.getItem("nameUser") === null) {
            usuario = localStorage.getItem("userGoogle");

            prodComments.push(
                { product: prodID, score: parseInt(stars), description: `${comentario}`, user: `${usuario}`, dateTime: `${fechaTotal}` });
        } else {
            usuario = localStorage.getItem("nameUser");

            prodComments.push(
                { product: prodID, score: parseInt(stars), description: `${comentario}`, user: `${usuario}`, dateTime: `${fechaTotal}` });
        }

        document.getElementById('opinion').value = "";

        showComments();
    });

    document.getElementById("closeSession").addEventListener("click", function () {
        sessionStorage.removeItem("user");
        localStorage.clear();
        location.reload();
    });

});
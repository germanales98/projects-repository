document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    showUserName();
    
    /* Se crea esta pequeña funcion, con la finalidad de cerrar sesión en el sitio, remover el item de sessionStorage y redirigir al usuario al login. */
    document.getElementById("closeSession").addEventListener("click", function () {
        sessionStorage.removeItem("user");
        localStorage.clear();
        location.reload();
    });
});

function showUserName() {
    let nameUser = document.getElementById('nameUser');
    let userNormal = localStorage.getItem("nameUser");
    let userGoogle = localStorage.getItem("userGoogle");

    console.log(userGoogle);
    console.log(userNormal);

    if (userNormal === null) {
        nameUser.innerHTML += `${userGoogle}`
    } else {
        nameUser.innerHTML += `${userNormal}`
    }
}
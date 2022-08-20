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
    /* Se crea esta pequeña funcion, con la finalidad de cerrar sesión en el sitio, remover el item de sessionStorage y redirigir al usuario al login. */
    document.getElementById("closeSession").addEventListener("click", function () {
        sessionStorage.removeItem("user");
        window.location = "login.html"
    });
});
const form = document.getElementById('content-form');
const email = document.getElementById('floatingInput');
const pass = document.getElementById('floatingPassword');
const alertMessage = document.getElementById('alertMessage');

form.addEventListener('submit', e => {
    /* evitarse que un texto invalido entre en un campo de formulario mediante preventDefault() */
    e.preventDefault();
    checkForm();
});

function checkForm() {
    /* Asignamos el valor a emailValue y passValue */
    const emailValue = email.value;
    const passValue = pass.value;
    /* Dentro del if se compara que los valor de dichas constantes no esten vacios, si eso pasa se muetra la siguiente
    plantilla con un error en pantalla. de lo contrario se le pasa sessionStorage en id(user) y un valor(true) y se redirecciona a el index */
    if (emailValue === '' || passValue === '') {
        alertMessage.innerHTML += `
        <div class="alert-danger text-center" role="alert">
            <p class="alert-heading">Complete los campos para continuar</p>
        </div>
        `
    } else {
        sessionStorage.setItem("user", "true");
        window.location = "index.html";
    }
}
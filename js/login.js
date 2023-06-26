let formularioRegister = document.querySelector(".formulario--register");
let formularioLogin = document.querySelector(".formulario--login");



const btnRegister = document.getElementById("btnRegistrarse");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");



let contenedorLoginRegister = document.querySelector(".contenedor-login-register");
let cajaTraseraRegister = document.querySelector(".caja-trasera-register");
let cajaTraseraLogin = document.querySelector(".caja-trasera-login");

const usuarioLogin = document.getElementById("usuarioLogin");
const contraseniaLogin = document.getElementById("contraseniaLogin");


const nombre = document.getElementById("nombreRegistro");
const correoRegistro = document.getElementById("correoRegistro");
const usuarioRegistro = document.getElementById("usuarioRegistro");
const contraseniaRegistro = document.getElementById("contraseniaRegistro");

const iniciarSesion = () => {
  const datosRegistrados = JSON.parse(localStorage.getItem("datos"));
  if (
    datosRegistrados &&
    usuarioLogin.value === datosRegistrados.usuario &&
    contraseniaLogin.value === datosRegistrados.contrasenia
  ) {
    window.location.href = "../index.html";
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los datos ingresados son incorrectos',
    })
  }
};

const register = () => {
  const datos = {
    nombre: nombre.value,
    correoRegistro: correoRegistro.value,
    usuario: usuarioRegistro.value,
    contrasenia: contraseniaRegistro.value
  };

  localStorage.setItem("datos", JSON.stringify(datos));
 
};

formularioLogin.addEventListener("submit", (e) =>{
  e.preventDefault();
  iniciarSesion();
});

formularioRegister.addEventListener("submit", (e) =>{
  e.preventDefault();
  register();
  cambiarFormLogin();
});

function cambiarFormRegister(){
  formularioRegister.style.display = "block";
  formularioLogin.style.display = "none";
  if (contenedorLoginRegister) {
  contenedorLoginRegister.style.left = "410px";
  };
  if (cajaTraseraRegister) {
  cajaTraseraRegister.style.opacity = "0";
  };
  if (cajaTraseraLogin) {
  cajaTraseraLogin.style.opacity = "1";
  };
};



function cambiarFormLogin(){
  formularioRegister.style.display = "none";
  formularioLogin.style.display = "block";
  if (contenedorLoginRegister) {
    contenedorLoginRegister.style.left = "10px";
  };
  if (formularioLogin) {
    formularioLogin.style.display = "block";
  };
  if (cajaTraseraRegister) {
    cajaTraseraRegister.style.opacity = "1";
  };
  if (cajaTraseraLogin) {
    cajaTraseraLogin.style.opacity = "0";
  };
};

btnRegister.addEventListener("click", cambiarFormRegister);
btnIniciarSesion.addEventListener("click", cambiarFormLogin);



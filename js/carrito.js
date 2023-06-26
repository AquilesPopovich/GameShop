const hacerCarrito = () => {
  containerModal.innerHTML = "";
  containerModal.style.display = "flex";
  const headerModal = createHeaderModal();
  containerModal.append(headerModal);
  const carritoVacio = document.createElement("div");

  if(carrito.length === 0){
    carritoVacio.innerHTML = `<p id="carritoVacio" class="carrito-vacio">Tu carrito esta vacio</p>`
    const conteo = function (){
      setTimeout(function () {
        Swal.fire({
          title: 'Vas a comprar pa?'
        });
      }, 15000);
    };
    conteo();
  };

  carrito.forEach((producto) => {
    const contentCarrito = createContentModal(producto);
    containerModal.append(contentCarrito);

    const restar = contentCarrito.querySelector(".restar");
    restar.addEventListener("click", (e) => {
      if (producto.cantidad === 1) {
        eliminarProducto(e);
      } else {
        producto.cantidad--;
        hacerCarrito();
      }
    });

    const sumar = contentCarrito.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      producto.cantidad++;
      hacerCarrito();
    });

    const eliminar = contentCarrito.querySelector(".borrar-producto");
    eliminar.addEventListener("click", (e) => {
      eliminarProducto(e);
    });
  });

  const total = carrito.reduce((acumu, prod) => acumu + prod.precio * prod.cantidad, 0);
  const precioTotal = createPrecioTotal(total);
  containerModal.append(precioTotal);
  containerModal.append(carritoVacio);
};

const createHeaderModal = () => {
  const headerModal = document.createElement("div");
  headerModal.className = "header-modal";
  headerModal.innerHTML = `
    <h1 class="header-modal-title">Carrito</h1>
    `;
  const buttonModal = document.createElement("h1");
  buttonModal.innerText = "x";
  buttonModal.className = "header-modal-button";
  buttonModal.addEventListener("click", () => {
    containerModal.style.display = "none";
  });
  headerModal.append(buttonModal);
  return headerModal;
};

const createContentModal = (producto) => {
  const contentCarrito = document.createElement("div");
  contentCarrito.className = "content-modal";
  
  contentCarrito.innerHTML = `
    <img src="${producto.img}">
    <h3 class="carrito-nombre">${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <button id="${producto.id}" class="restar">-</button>
    <p class="cantidad-prod">Cantidad: ${producto.cantidad}</p>
    <button class="sumar">+</button>
    <p>Total: ${producto.cantidad * producto.precio}</p>
    <span id="${producto.id}" class="borrar-producto">❌</span>
    `;
    return contentCarrito
  
};


const createPrecioTotal = (total) => {
  const precioTotal = document.createElement("div");
  const botonVaciar = document.createElement("button");
  const botonContinuarCompra = document.createElement("button");

  precioTotal.className = "total-content";

  botonVaciar.id = "vaciar";
  botonVaciar.className = "vaciar-carrito";
  botonVaciar.textContent = "Vaciar Carrito";
  botonVaciar.style.display = carrito.length > 0 ? "block" : "none";

  botonContinuarCompra.id = "continuarCompra";
  botonContinuarCompra.className = "continuar-compra";
  botonContinuarCompra.textContent = "Continuar Compra";
  botonContinuarCompra.style.display = carrito.length > 0 ? "block" : "none";
  precioTotal.innerHTML = `
    total a pagar: $${total}
  `;

precioTotal.appendChild(botonVaciar);
precioTotal.appendChild(botonContinuarCompra);

botonContinuarCompra.addEventListener("click", () => {
  const usuarioLS = localStorage.getItem('datos');

  if (usuarioLS) {
    const datos = JSON.parse(usuarioLS);
    Swal.fire({
      icon: 'success',
      title: 'Compra Realizada!',
      text: 'Te mandaremos un correo electrónico confirmando tu compra'
    });
    carrito.length = [];
    contadorCarrito();
    guardarLocal();
    hacerCarrito();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Necesitas iniciar sesión para continuar la compra'
    });
  }
});

  botonVaciar.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn-confirmar-vaciar',
        cancelButton: 'btn-cancelar-vaciar'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Quieres vaciar tu carrito?',
      text: "Si lo vacias todos tus productos se perderan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, lo quiero vaciar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );

        carrito.length = [];
        contadorCarrito();
        guardarLocal();
        hacerCarrito();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  });

  return precioTotal;
};

const eliminarProducto = (e) => {
  const id = e.target.id;
  const indice = carrito.findIndex((p) => p.id === id);
  carrito.splice(indice, 1);
  contadorCarrito();
  guardarLocal();
  hacerCarrito();
};

const getCantidadCarritoElement = () => {
  return document.getElementById("cantidadCarrito");
};

const hideCantidadCarrito = (cantidadCarrito) => {
  cantidadCarrito.style.display = "none";
};

const showCantidadCarrito = (cantidadCarrito, carritoLength) => {
  cantidadCarrito.style.display = "block";
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};


  

verCarrito.addEventListener("click", hacerCarrito);
contadorCarrito();


  


  


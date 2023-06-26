let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const form = document.querySelector(".search-bar");
const input = document.querySelector("#buscador");
const verCarrito = document.getElementById("verCarrito");
const containerModal = document.getElementById("containerModal");

const contenidoTienda = document.getElementById("contenidoTienda");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let productos = [];

class Producto {
	constructor(id, cantidad, url, nombre, categoria, precio, moneda) {
		this.id = id;
		this.cantidad = cantidad;
		this.url = url;
		this.nombre = nombre;
		this.categoria = categoria;
		this.precio = precio;
		this.moneda = moneda;
	}
}

const producto1 = new Producto(
	"1",
	1,
	"https://http2.mlstatic.com/D_NQ_NP_2X_662444-MLA41254447964_032020-F.webp",
	"Auriculares gamer inalámbricos Pro TKL",
	"auriculares",
	200,
	"USD",
);
const producto2 = new Producto(
	"2",
	1,
	"https://http2.mlstatic.com/D_NQ_NP_2X_677271-MLA43704202937_102020-F.webp",
	"Teclado gamer SteelSeries Apex Pro TKL",
	"teclados",
	300,
	"USD",
);
const producto3 = new Producto(
	"3",
	1,
	"https://http2.mlstatic.com/D_NQ_NP_2X_806340-MLA51423594714_092022-F.webp",
	"Notebook gamer Asus Rog Strix G15 G513RM",
	"laptop",
	650,
	"USD",
);
const producto4 = new Producto(
	"4",
	1,
	"https://i.ebayimg.com/images/g/tyAAAOSwUCVkSKnp/s-l400.jpg",
	"Auriculares estéreo dinámicos de estudio",
	"auriculares",
	60,
	"USD",
);

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let inputTexto = document.getElementById("buscador");
	let buscador = inputTexto.value;
	console.log(buscador);
	let productosFiltrados = productos.filter((producto) =>
		producto.nombre.toLowerCase().includes(buscador.toLowerCase()),
	);

	contenidoTienda.innerHTML = "";
	renderizarProductos(productosFiltrados);
});

const renderizarProductos = (productos) => {
	productos.forEach((producto) => {
		let content = document.createElement("div");
		content.className = "cards";
		content.innerHTML = `
       
       <img src="${producto.url}">
       <h3>${producto.nombre}</h3>
       <p class="precios">${producto.moneda} ${producto.precio}</p>
      
       `;
		if (contenidoTienda) {
			contenidoTienda.append(content);
		}
		let comprar = document.createElement("button");
		comprar.innerText = "Agregar al carrito";
		comprar.className = "comprar";
		content.append(comprar);

		comprar.addEventListener("click", () => {
			const repeat = carrito.some((repeatProducto) => repeatProducto.id === producto.id);

			if (repeat) {
				carrito.map((produ) => {
					if (produ.id === producto.id) {
						produ.cantidad++;
					}
				});
			} else {
				carrito.push({
					id: producto.id,
					img: producto.url,
					nombre: producto.nombre,
					precio: producto.precio,
					cantidad: producto.cantidad,
				});
			}
			contadorCarrito();
			console.log(carrito);
			guardarLocal();
		});
	});
};

renderizarProductos(productos);

const contadorCarrito = () => {
	const cantidadCarrito = getCantidadCarritoElement();
	const carritoLength = carrito.length;

	if (carritoLength === 0) {
		hideCantidadCarrito(cantidadCarrito);
	} else {
		showCantidadCarrito(cantidadCarrito, carritoLength);
	}

	console.log(cantidadCarrito);
};

const guardarLocal = () => {
	localStorage.setItem("carrito", JSON.stringify(carrito));
};







   


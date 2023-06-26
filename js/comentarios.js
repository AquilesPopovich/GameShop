const apiComentarios = "https://jsonplaceholder.typicode.com/posts/1/comments";
const contenidoComentarios = document.getElementById("contenidoComentarios");

fetch(apiComentarios)
    .then(respuesta => respuesta.json())
    .then(datos => {
        mostrarComentarios(datos);
    })
    .catch(error => console.log(error));

function mostrarComentarios(datos) {
    datos.forEach(comentario => {
        const comentarioTotal = document.createElement("div")
        comentarioTotal.classList.add("comentarios-total")
        const correoUsuario = document.createElement("a");
        correoUsuario.href = "mailto:" + comentario.email;
        correoUsuario.innerText = comentario.email;
        correoUsuario.classList.add("correo-usuario");
        comentarioTotal.appendChild(correoUsuario);

        const comentarioUsuario = document.createElement("p");
        comentarioUsuario.innerText = comentario.body;
        comentarioUsuario.classList.add("comentario-usuario");
        comentarioTotal.appendChild(comentarioUsuario);
        contenidoComentarios.appendChild(comentarioTotal);
    });
}

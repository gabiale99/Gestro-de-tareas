const formulario = document.querySelector("form");
const textoError = document.querySelector("#error");
const inputTexto = document.querySelector("#text");
const contenedorTareasVacias = document.querySelector("#container-tarea");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputTexto.value == "") {
    textoError.classList.add("error-no");
    textoError.classList.remove("error");
  } else {
    textoError.classList.remove("error-no");
    textoError.classList.add("error");
    contenedorTareasVacias.classList.remove("container-tarea");
    contenedorTareasVacias.classList.add("container-tareas-off");
  }
});

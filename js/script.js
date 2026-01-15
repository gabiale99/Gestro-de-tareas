const btnAgregar = document.querySelector("#agregar");
const textoError = document.querySelector("#error");
const inputTexto = document.querySelector("#text");
const contenedorTareasVacias = document.querySelector("#container-tarea");
const formulario = document.querySelector("form");

const numeroTotal = document.querySelector("#total");
const numeroPendiente = document.querySelector("#pendientes");
const numeroCompletadas = document.querySelector("#completadas");

const tareas = [];

let tareasTotales = 0;
let tareasPendientes = 0;
let tareasCompletadas = 0;

function actualizarContadores() {
  numeroTotal.textContent = tareasTotales;
  numeroPendiente.textContent = tareasPendientes;
  numeroCompletadas.textContent = tareasCompletadas;
  spanContadoDePendientes.textContent = `(${tareasPendientes})`;
}

const tituloSeccion = document.createElement("h2");
tituloSeccion.textContent = "Pendientes ";
formulario.after(tituloSeccion);

const spanContadoDePendientes = document.createElement("span");
spanContadoDePendientes.textContent = `(0)`;
tituloSeccion.append(spanContadoDePendientes);

function crearSVG(tag, atributos = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (let attr in atributos) {
    el.setAttribute(attr, atributos[attr]);
  }

  return el;
}

const svgEditar = crearSVG("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon icon-tabler icon-tabler-pencil",
});

svgEditar.append(
  crearSVG("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
  crearSVG("path", {
    d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
  }),
  crearSVG("path", { d: "M13.5 6.5l4 4" })
);

const svgEliminar = crearSVG("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon svg-eliminar icon-tabler icon-tabler-trash",
});

svgEliminar.append(
  crearSVG("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
  crearSVG("path", { d: "M4 7l16 0" }),
  crearSVG("path", { d: "M10 11l0 6" }),
  crearSVG("path", { d: "M14 11l0 6" }),
  crearSVG("path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" }),
  crearSVG("path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" })
);

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputTexto.value.trim() === "") {
    textoError.classList.add("error-no");
    textoError.classList.remove("error");
    return;
  }

  textoError.classList.remove("error-no");
  textoError.classList.add("error");
  contenedorTareasVacias.classList.remove("container-tarea");
  contenedorTareasVacias.classList.add("container-tareas-off");

  tareasTotales++;
  tareasPendientes++;
  actualizarContadores();

  const nuevaTarea = inputTexto.value;
  tareas.push(nuevaTarea);

  spanContadoDePendientes.textContent = `(${tareasPendientes})`;

  const contenedorDeTarea = document.createElement("div");
  contenedorDeTarea.className = "container-tarea";
  tituloSeccion.after(contenedorDeTarea);

  const contenedorTextoTarea = document.createElement("div");
  contenedorTextoTarea.className = "container-text-tarea";
  contenedorDeTarea.append(contenedorTextoTarea);

  const input = document.createElement("input");
  input.type = "checkbox";
  contenedorTextoTarea.append(input);

  input.addEventListener("change", () => {
    if (input.checked) {
      tareasCompletadas++;
      tareasPendientes--;
      nombreDeLaTarea.style.textDecoration = "line-through";
    } else {
      tareasCompletadas--;
      tareasPendientes++;
      nombreDeLaTarea.style.textDecoration = "none";
    }
    actualizarContadores();
  });

  const nombreDeLaTarea = document.createElement("p");
  nombreDeLaTarea.textContent = nuevaTarea;
  input.after(nombreDeLaTarea);

  const contenedorSvg = document.createElement("div");
  contenedorSvg.className = "container-svg";
  contenedorTextoTarea.after(contenedorSvg);

  const editar = svgEditar.cloneNode(true);
  contenedorSvg.append(editar);

  const eliminar = svgEliminar.cloneNode(true);
  editar.after(eliminar);
  eliminar.addEventListener("click", () => {
    contenedorDeTarea.remove();
    tareasCompletadas--;
    tareasTotales--;
    actualizarContadores();
  });

  inputTexto.value = "";
});

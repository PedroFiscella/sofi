// ---------- Código de acceso ----------
const CODIGO_SECRETO = "12/08/25";
const CLAVE_SESION = "ruleta-acceso-ok";

const pantallaCandado = document.getElementById("pantallaCandado");
const contenidoApp = document.getElementById("contenidoApp");
const formCandado = document.getElementById("formCandado");
const inputCodigo = document.getElementById("inputCodigo");
const candadoError = document.getElementById("candadoError");
const tarjetaCandado = document.querySelector(".tarjeta-candado");

function desbloquear(){
  sessionStorage.setItem(CLAVE_SESION, "true");
  pantallaCandado.classList.add("oculto");
  contenidoApp.classList.remove("oculto");
  inicializarApp();
}

formCandado.addEventListener("submit", (e) => {
  e.preventDefault();
  const intento = inputCodigo.value.trim();

  if (intento === CODIGO_SECRETO){
    desbloquear();
  } else {
    candadoError.hidden = false;
    tarjetaCandado.classList.remove("tiembla");
    void tarjetaCandado.offsetWidth; // reinicia la animación
    tarjetaCandado.classList.add("tiembla");
    inputCodigo.value = "";
    inputCodigo.focus();
  }
});

// ---------- Contador de tiempo juntos ----------
// 12 de agosto de 2025, 16:15 (mes en JS empieza en 0, por eso agosto es el 7)
const FECHA_INICIO = new Date(2025, 7, 12, 16, 15, 0);

function actualizarContadorTiempo(){
  if (!contadorTiempo) return;

  const ahora = new Date();
  const diferenciaMs = ahora - FECHA_INICIO;

  if (diferenciaMs < 0){
    contadorTiempo.textContent = "La cuenta todavía no arrancó 💗";
    return;
  }

  const segundosTotales = Math.floor(diferenciaMs / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  contadorTiempo.textContent =
    `Llevamos ${dias} días, ${horas}h ${minutos}m ${segundos}s juntos 💗`;
}

// ---------- Carta sorpresa ----------
// Editá este texto con el mensaje que quieras dejarle a Sofi.
// Podés usar saltos de línea normales, se van a respetar.
const MENSAJE_CARTA = `Amor,

Sos lo mejor que me paso, Todos los dias me hace muy feliz saber que me despierto y sos mi novia, Siempre pense que no iba a encontrar a alguien que me quiera tanto como yo lo hago, Y aunque se que no todo es color de rosas siempre, con vos me gustan tambien los dias grises o negros, Y es que no me imagino un dia sin vos independientemente de todo lo que pase, No dejes de amarme porque yo nunca lo voy a hacer, Sos tan especial que me hace dudar si merezco estar con vos, Pero intento mejorar un poco todos los dias.

Gracias por ser mi novia este año y los que vienen, Prometo amarte lo que me queda de vida y mucho mas 💗

(pd: La idea es ir agregando cartitas y fotitos hasta llenar toda la pagina, Espero te vaya gustando)`;

let botonSobre, modalCarta, cerrarCarta, cartaContenido;
let gridGaleria, modalFoto, imagenAmpliada, cerrarFoto, fotoAnterior, fotoSiguiente;
let fotosGaleria = [];
let indiceFotoActual = 0;

function actualizarFotoModal(){
  const img = fotosGaleria[indiceFotoActual];
  imagenAmpliada.src = img.src;
  imagenAmpliada.alt = img.alt;
}

function abrirFoto(indice){
  indiceFotoActual = indice;
  actualizarFotoModal();
  modalFoto.hidden = false;
}

function irFotoAnterior(){
  indiceFotoActual = (indiceFotoActual - 1 + fotosGaleria.length) % fotosGaleria.length;
  actualizarFotoModal();
}

function irFotoSiguiente(){
  indiceFotoActual = (indiceFotoActual + 1) % fotosGaleria.length;
  actualizarFotoModal();
}

function inicializarGaleriaYCarta(){
  botonSobre = document.getElementById("botonSobre");
  modalCarta = document.getElementById("modalCarta");
  cerrarCarta = document.getElementById("cerrarCarta");
  cartaContenido = document.getElementById("cartaContenido");

  gridGaleria = document.getElementById("gridGaleria");
  modalFoto = document.getElementById("modalFoto");
  imagenAmpliada = document.getElementById("imagenAmpliada");
  cerrarFoto = document.getElementById("cerrarFoto");
  fotoAnterior = document.getElementById("fotoAnterior");
  fotoSiguiente = document.getElementById("fotoSiguiente");

  cartaContenido.textContent = MENSAJE_CARTA;

  botonSobre.addEventListener("click", () => {
    botonSobre.classList.add("abierto");
    setTimeout(() => {
      modalCarta.hidden = false;
    }, 280);
  });

  cerrarCarta.addEventListener("click", () => {
    modalCarta.hidden = true;
    botonSobre.classList.remove("abierto");
  });

  modalCarta.addEventListener("click", (e) => {
    if (e.target === modalCarta){
      modalCarta.hidden = true;
      botonSobre.classList.remove("abierto");
    }
  });

  fotosGaleria = Array.from(gridGaleria.querySelectorAll(".item-galeria img"));

  gridGaleria.querySelectorAll(".item-galeria").forEach((item, indice) => {
    item.addEventListener("click", () => abrirFoto(indice));
  });

  fotoAnterior.addEventListener("click", irFotoAnterior);
  fotoSiguiente.addEventListener("click", irFotoSiguiente);

  cerrarFoto.addEventListener("click", () => {
    modalFoto.hidden = true;
  });

  modalFoto.addEventListener("click", (e) => {
    if (e.target === modalFoto){
      modalFoto.hidden = true;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modalFoto.hidden) return;
    if (e.key === "ArrowLeft") irFotoAnterior();
    if (e.key === "ArrowRight") irFotoSiguiente();
    if (e.key === "Escape") modalFoto.hidden = true;
  });
}

// ---------- Datos iniciales ----------
const CATEGORIAS = {
  comida: {
    titulo: "Opciones de comida",
    defecto: ["Pizza", "Sushi", "Milanesas", "Hamburguesas", "Empanadas", "Tacos", "Ensalada", "Pastas", "Sopitas chinas"]
  },
  planes: {
    titulo: "Opciones de plan",
    defecto: ["Ver una peli", "Jugar algo", "Caminar", "Salir a tomar algo", "Merendar", "Cocinar alguna recete(ig)"]
  },
  lugar: {
    titulo: "Opciones de lugar",
    defecto: ["Centro", "Casa mia", "Casa tuya", "Algún bar", "Cafeteria", "Parque"]
  },
  sio: {
    titulo: "¿Sí o no?",
    defecto: ["Sí", "No"]
  }
};

const PALETA = ["#F2789E", "#E8B34D", "#B08CC9", "#F2B6C6", "#D85585", "#C9A6E0"];

const CLAVE_STORAGE = (cat) => `ruleta-${cat}`;

// ---------- Estado ----------
let categoriaActual = "comida";
let opciones = [];
let rotacionActual = 0; // radianes
let girando = false;
let intervaloContador = null;

// ---------- Elementos (se buscan recién cuando la app se inicializa) ----------
let canvas, ctx, botonGirar, tabs, tituloCategoria, contadorOpciones;
let formOpcion, inputOpcion, listaOpciones, pistaVacia;
let modalResultado, textoResultado, cerrarModal, aceptarModal;
let canvasConfeti, ctxConfeti, contadorTiempo;

function inicializarApp(){
  canvas = document.getElementById("ruleta");
  ctx = canvas.getContext("2d");
  botonGirar = document.getElementById("girar");
  tabs = document.querySelectorAll(".tab");
  tituloCategoria = document.getElementById("tituloCategoria");
  contadorOpciones = document.getElementById("contadorOpciones");
  formOpcion = document.getElementById("formOpcion");
  inputOpcion = document.getElementById("nuevaOpcion");
  listaOpciones = document.getElementById("listaOpciones");
  pistaVacia = document.getElementById("pistaVacia");
  modalResultado = document.getElementById("modalResultado");
  textoResultado = document.getElementById("textoResultado");
  cerrarModal = document.getElementById("cerrarModal");
  aceptarModal = document.getElementById("aceptarModal");
  canvasConfeti = document.getElementById("confeti");
  ctxConfeti = canvasConfeti.getContext("2d");
  contadorTiempo = document.getElementById("contadorTiempo");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => cambiarCategoria(tab.dataset.cat));
  });

  formOpcion.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarOpcion(inputOpcion.value);
    inputOpcion.value = "";
    inputOpcion.focus();
  });

  botonGirar.addEventListener("click", girar);
  cerrarModal.addEventListener("click", ocultarModal);
  aceptarModal.addEventListener("click", ocultarModal);
  modalResultado.addEventListener("click", (e) => {
    if (e.target === modalResultado) ocultarModal();
  });
  window.addEventListener("resize", ajustarTamanoConfeti);

  cambiarCategoria(categoriaActual);

  actualizarContadorTiempo();
  if (intervaloContador) clearInterval(intervaloContador);
  intervaloContador = setInterval(actualizarContadorTiempo, 1000);

  inicializarGaleriaYCarta();
}

// ---------- Persistencia ----------
function cargarOpciones(cat){
  const guardadas = localStorage.getItem(CLAVE_STORAGE(cat));
  if (guardadas){
    try {
      const parseadas = JSON.parse(guardadas);
      if (Array.isArray(parseadas) && parseadas.length) return parseadas;
    } catch (e) { /* si falla, usamos las de defecto */ }
  }
  return [...CATEGORIAS[cat].defecto];
}

function guardarOpciones(){
  localStorage.setItem(CLAVE_STORAGE(categoriaActual), JSON.stringify(opciones));
}

// ---------- Dibujo de la ruleta ----------
function dibujarRuleta(){
  const radio = canvas.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(radio, radio);
  ctx.rotate(rotacionActual);
  ctx.translate(-radio, -radio);

  if (opciones.length === 0){
    ctx.beginPath();
    ctx.arc(radio, radio, radio - 4, 0, Math.PI * 2);
    ctx.fillStyle = "#FBDCE7";
    ctx.fill();
    ctx.restore();
    return;
  }

  const anguloPorOpcion = (Math.PI * 2) / opciones.length;

  opciones.forEach((opcion, i) => {
    const inicio = i * anguloPorOpcion;
    const fin = inicio + anguloPorOpcion;

    ctx.beginPath();
    ctx.moveTo(radio, radio);
    ctx.arc(radio, radio, radio - 4, inicio, fin);
    ctx.closePath();
    ctx.fillStyle = PALETA[i % PALETA.length];
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(radio, radio);
    ctx.rotate(inicio + anguloPorOpcion / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 16px Karla, sans-serif";
    const textoAcortado = opcion.length > 18 ? opcion.slice(0, 17) + "…" : opcion;
    ctx.fillText(textoAcortado, radio - 22, 0);
    ctx.restore();
  });

  ctx.restore();

  // círculo central decorativo
  ctx.beginPath();
  ctx.arc(radio, radio, 22, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "#5A2A44";
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ---------- Lista de opciones (panel lateral) ----------
function renderizarLista(){
  listaOpciones.innerHTML = "";

  opciones.forEach((opcion, i) => {
    const li = document.createElement("li");
    li.className = "item-opcion";

    const punto = document.createElement("span");
    punto.className = "chip-color";
    punto.style.background = PALETA[i % PALETA.length];

    const texto = document.createElement("span");
    texto.textContent = opcion;

    const borrar = document.createElement("button");
    borrar.type = "button";
    borrar.setAttribute("aria-label", `Quitar ${opcion}`);
    borrar.textContent = "✕";
    borrar.addEventListener("click", () => quitarOpcion(i));

    li.append(punto, texto, borrar);
    listaOpciones.appendChild(li);
  });

  contadorOpciones.textContent = opciones.length;
  pistaVacia.classList.toggle("oculta", opciones.length >= 2);
  botonGirar.disabled = opciones.length < 2;
}

function agregarOpcion(texto){
  const limpio = texto.trim();
  if (!limpio) return;
  opciones.push(limpio);
  guardarOpciones();
  renderizarLista();
  dibujarRuleta();
}

function quitarOpcion(indice){
  opciones.splice(indice, 1);
  guardarOpciones();
  renderizarLista();
  dibujarRuleta();
}

// ---------- Cambio de categoría ----------
function cambiarCategoria(cat){
  categoriaActual = cat;
  opciones = cargarOpciones(cat);
  tituloCategoria.textContent = CATEGORIAS[cat].titulo;

  tabs.forEach(tab => {
    const activa = tab.dataset.cat === cat;
    tab.setAttribute("aria-selected", activa ? "true" : "false");
  });

  rotacionActual = 0;
  renderizarLista();
  dibujarRuleta();
}

// ---------- Animación de giro ----------
function facilitarSalida(t){
  return 1 - Math.pow(1 - t, 3);
}

function girar(){
  if (girando || opciones.length < 2) return;
  girando = true;
  botonGirar.disabled = true;

  const indiceGanador = Math.floor(Math.random() * opciones.length);
  const anguloPorOpcion = (Math.PI * 2) / opciones.length;
  const centroGanador = indiceGanador * anguloPorOpcion + anguloPorOpcion / 2;

  const anguloPuntero = (3 * Math.PI) / 2;

  const margen = anguloPorOpcion * 0.3;
  const desvio = (Math.random() * margen * 2) - margen;

  const vueltasExtra = 5 + Math.floor(Math.random() * 2);
  let rotacionObjetivo = anguloPuntero - centroGanador - desvio + Math.PI * 2 * vueltasExtra;

  const rotacionInicial = rotacionActual;
  const diferencia = rotacionObjetivo - (rotacionInicial % (Math.PI * 2));
  const rotacionFinal = rotacionInicial + diferencia;

  const duracion = 4200;
  const inicio = performance.now();

  function animar(ahora){
    const transcurrido = ahora - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    const suavizado = facilitarSalida(progreso);

    rotacionActual = rotacionInicial + (rotacionFinal - rotacionInicial) * suavizado;
    dibujarRuleta();

    if (progreso < 1){
      requestAnimationFrame(animar);
    } else {
      girando = false;
      botonGirar.disabled = opciones.length < 2;
      mostrarResultado(opciones[indiceGanador]);
    }
  }

  requestAnimationFrame(animar);
}

// ---------- Modal de resultado ----------
function mostrarResultado(opcion){
  textoResultado.textContent = opcion;
  modalResultado.hidden = false;
  lanzarConfeti();
}

function ocultarModal(){
  modalResultado.hidden = true;
}

// ---------- Confeti ----------
let particulasConfeti = [];
let animandoConfeti = false;

function ajustarTamanoConfeti(){
  if (!canvasConfeti) return;
  canvasConfeti.width = window.innerWidth;
  canvasConfeti.height = window.innerHeight;
}

function lanzarConfeti(){
  ajustarTamanoConfeti();
  particulasConfeti = [];
  const cantidad = 90;
  const centroX = window.innerWidth / 2;

  for (let i = 0; i < cantidad; i++){
    particulasConfeti.push({
      x: centroX + (Math.random() - 0.5) * 120,
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -9 - 4,
      gravedad: 0.28,
      tamano: Math.random() * 7 + 4,
      color: PALETA[Math.floor(Math.random() * PALETA.length)],
      rotacion: Math.random() * Math.PI,
      velocidadRotacion: (Math.random() - 0.5) * 0.3,
      vida: 0
    });
  }

  if (!animandoConfeti){
    animandoConfeti = true;
    requestAnimationFrame(animarConfeti);
  }
}

function animarConfeti(){
  ctxConfeti.clearRect(0, 0, canvasConfeti.width, canvasConfeti.height);

  let algunaViva = false;

  particulasConfeti.forEach(p => {
    p.vida++;
    p.vx *= 0.99;
    p.vy += p.gravedad;
    p.x += p.vx;
    p.y += p.vy;
    p.rotacion += p.velocidadRotacion;

    if (p.y < canvasConfeti.height + 20 && p.vida < 220){
      algunaViva = true;
      ctxConfeti.save();
      ctxConfeti.translate(p.x, p.y);
      ctxConfeti.rotate(p.rotacion);
      ctxConfeti.fillStyle = p.color;
      ctxConfeti.fillRect(-p.tamano / 2, -p.tamano / 2, p.tamano, p.tamano * 0.6);
      ctxConfeti.restore();
    }
  });

  if (algunaViva){
    requestAnimationFrame(animarConfeti);
  } else {
    animandoConfeti = false;
    ctxConfeti.clearRect(0, 0, canvasConfeti.width, canvasConfeti.height);
  }
}

// ---------- Chequeo de sesión (va al final para que todo lo de arriba ya exista) ----------
if (sessionStorage.getItem(CLAVE_SESION) === "true"){
  desbloquear();
}

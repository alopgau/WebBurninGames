"use strict";

/**
 * Asigna un enlace de redirección a un elemento de juego según su id.
 * Cuando el usuario hace click en el elemento, se le redirige
 * a la página oficial del juego correspondiente.
 *
 * @param {HTMLElement} juego - Elemento del DOM que representa un juego.
 */
const cargarHrefJuego = (juego) => {
  switch (juego.getAttribute("id")) {
    case "0":
      juego.addEventListener("click", () => {
        window.location.href =
          "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch-2/Hyrule-Warriors-La-era-del-destierro-2789659.html?srsltid=AfmBOoryhSGJioh5-0_hFfstbhmhxc7gD_xGct0OGVKUCyTSBEqiThBp";
      });
      break;

    case "1":
      juego.addEventListener("click", () => {
        window.location.href = "https://www.inazuma.jp/victory-road/es/";
      });
      break;

    case "2":
      juego.addEventListener("click", () => {
        window.location.href =
          "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/Leyendas-Pokemon-Z-A-2533423.html?srsltid=AfmBOoqdYbEkZ1BOu8Ka4EzMSmiFLcfTGnLTlwOIfEK446FKyfyuOItE";
      });
      break;

    case "3":
      juego.addEventListener("click", () => {
        window.location.href =
          "https://es.bandainamcoent.eu/little-nightmares/little-nightmares-iii";
      });
      break;

    default:
      break;
  }
};

/**
 * Inicializa los enlaces de todos los elementos con la clase `.juego`.
 *
 * - Comprueba si existen elementos con la clase `.juego`.
 * - Asigna un id numérico incremental a cada uno.
 * - Llama a {@link cargarHrefJuego} para asociar el evento de click
 *   que redirige a la página correspondiente del juego.
 *
 * @returns {void}
 */
const hrefJuegos = () => {
  if (!document.querySelector(".juego")) return;

  const juegos = document.querySelectorAll(".juego");

  // Asigna un id a cada juego según su posición
  for (let index = 0; index < juegos.length; index++) {
    juegos[index].setAttribute("id", index);
  }

  // Añade el evento de redirección a cada juego
  for (const juego of juegos) {
    cargarHrefJuego(juego);
  }
};

/**
 * Obtiene y agrupa todos los elementos del DOM necesarios
 * para el funcionamiento del menú hamburguesa.
 *
 * @returns {Object} Objeto con las referencias a los elementos del menú.
 * @property {HTMLElement|null} boton - Botón que abre el menú hamburguesa.
 * @property {HTMLElement|null} luna - Icono del modo oscuro.
 * @property {HTMLElement|null} sol - Icono del modo claro.
 * @property {HTMLElement|null} desplegable - Contenedor del menú desplegable.
 * @property {HTMLElement|null} main - Elemento <main> de la página.
 * @property {HTMLElement|null} cabecera - Cabecera principal.
 * @property {HTMLElement|null} seccionLogo - Sección del logo dentro de la cabecera.
 * @property {HTMLElement|null} botonAtras - Botón para cerrar el menú.
 */

const obtenerElementosMenu = () => {
  return {
    boton: document.querySelector(".boton__menú__hamburguesa"),
    luna: document.querySelector(".luna"),
    sol: document.querySelector(".sol"),
    desplegable: document.querySelector(".oculto"),
    main: document.querySelector("main"),
    cabecera: document.querySelector(".cabecera"),
    seccionLogo: document.querySelector(".cabecera__logo"),
    botonAtras: document.querySelector(".menu__desplegable__boton__atras"),
  };
};

/**
 * Abre el menú hamburguesa y aplica los cambios visuales necesarios
 * como ocultar iconos, hacer el fondo semitransparente y bloquear el scroll.
 *
 * @param {Object} el - Objeto con los elementos del menú.
 */

const abrirMenu = (el) => {
  el.desplegable.classList.replace("oculto", "menu__desplegable--desplegado");
  el.boton.classList.replace("boton__menú__hamburguesa", "oculto");

  if (el.luna.classList.contains("visible")) {
    el.luna.classList.replace("visible", "oculto")
  } else {
    el.luna.classList.add("oculto");
  }
  if (el.sol.classList.contains("visible")) {
    el.sol.classList.replace("visible", "oculto");

  } else {
    el.sol.classList.add("oculto");
  }

  el.main.classList.toggle("semitransparente");
  el.seccionLogo.classList.toggle("semitransparente");

  document.body.style.overflow = "hidden";

  el.cabecera.classList.replace("cabecera", "cabecera--semitransparente");
};

/**
 * Restaura el icono correcto del modo de color
 * dependiendo de si el sitio está en modo claro u oscuro.
 *
 * @param {HTMLElement} luna - Icono de la luna (modo oscuro).
 * @param {HTMLElement} sol - Icono del sol (modo claro).
 */

const restaurarIconoModo = (luna, sol) => {

  if (document.body.classList.contains("modo__oscuro")) {
    sol.classList.replace("oculto", "visible");
  } else {
    luna.classList.replace("oculto", "visible");
  }
};

/**
 * Cierra el menú hamburguesa y restaura el estado visual
 * original de la página.
 *
 * @param {Object} elemento - Objeto con los elementos del menú.
 */

const cerrarMenu = (elemento) => {
  document.body.style.overflow = "";

  elemento.desplegable.classList.replace("menu__desplegable--desplegado", "oculto");

  restaurarIconoModo(elemento.luna, elemento.sol);

  elemento.seccionLogo.classList.toggle("semitransparente");

  elemento.main.classList.toggle("semitransparente");

  elemento.boton.classList.replace("oculto", "boton__menú__hamburguesa");

  elemento.cabecera.classList.replace("cabecera--semitransparente", "cabecera");
};

/**
 * Inicializa la funcionalidad del menú hamburguesa
 * añadiendo los eventos necesarios para abrir y cerrar el menú.
 *
 * @returns {void}
 */

const menuHamburguesa = () => {
  const elementos = obtenerElementosMenu();

  elementos.boton.addEventListener("click", () => abrirMenu(elementos));

  elementos.botonAtras.addEventListener("click", () =>
    cerrarMenu(elementos)
  );
};

const detectarModoSistema = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("modo__oscuro");
  } else {
    document.body.classList.add("modo__claro")
  }
};

/**
 * Alterna entre el modo claro y el modo oscuro de la página.
 * 
 * Cambia la clase del <body> entre `modo__claro` y `modo__oscuro`
 * y actualiza la visibilidad de los iconos de luna y sol
 * para reflejar el modo activo.
 *
 * @returns {void}
 */

const toggleModo = () => {

  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");

  if (document.body.classList.contains("modo__claro")) {
    document.body.classList.replace("modo__claro", "modo__oscuro")
    sol.classList.add("oculto")
  } else {
    document.body.classList.replace("modo__oscuro", "modo__claro")
    sol.classList.add("visible")
    luna.classList.add("oculto")
  }


  luna.classList.toggle("visible");
  luna.classList.toggle("oculto");

  sol.classList.toggle("visible");
  sol.classList.toggle("oculto");
};

/**
 * Inicializa los eventos que permiten cambiar entre
 * modo claro y modo oscuro.
 *
 * Añade un listener de click a los iconos de luna y sol
 * para ejecutar la función {@link toggleModo}.
 *
 * @returns {void}
 */

const aplicarSwitchModo = () => {
  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");

  luna.addEventListener("click", toggleModo);
  sol.addEventListener("click", toggleModo);
};
/**
 * Recorre todos los elementos del DOM con la clase `.juego`,
 * extrae la información de cada uno y genera un array de objetos
 * con sus datos.
 *
 * Después guarda ese array en el `localStorage` bajo la clave
 * `"datosLanzamientos"` en formato JSON.
 *
 * Datos almacenados por cada juego:
 * - Número del juego según su posición
 * - URL de la portada
 * - Nombre del juego
 * - Plataformas disponibles
 * - Fecha de lanzamiento
 *
 * @returns {void}
 */
const crearJSONJuegos = () => {

  let contador = 0
  const juegos = document.querySelectorAll(".juego");
  const datosJuego = Array.from(juegos).map((juego) => {

    contador++
    const numJuego = contador
    const nombreJuego = juego.querySelector(".titulo__juego").textContent;
    const fechaJuego = juego.querySelector(".fecha__juego").getAttribute("datetime");
    const plataformasJuego = juego.querySelector(".plataforma__juego").textContent;
    const portadaJuego = juego.querySelector(".portada__juego").getAttribute("src");

    return { numJuego, portadaJuego, nombreJuego, plataformasJuego, fechaJuego };
  });
  localStorage.setItem("datosLanzamientos", JSON.stringify(datosJuego));
};

/**
 * Inicializa la página de reseñas.
 *
 * - Carga los juegos almacenados en `localStorage`.
 * - Los clasifica en juegos próximos o disponibles según su fecha.
 * - Los renderiza en sus secciones correspondientes.
 * - Recupera los juegos guardados por el usuario (favoritos o esperados).
 * - Añade los eventos para poder agregar o eliminar juegos de las listas.
 *
 * @returns {void}
 */

const cargarPaginaResenas = () => {

  /**
   * Obtiene los juegos almacenados en localStorage
   * bajo la clave `datosLanzamientos`.
   *
   * @returns {Array<Object>} Array de juegos almacenados.
   */

  const obtenerJuegos = () => {
    const datos = localStorage.getItem("datosLanzamientos");
    return datos ? JSON.parse(datos) : [];
  };

  /**
   * Crea un elemento HTML que representa un juego.
   *
   * @param {Object} juego - Datos del juego.
   * @param {number} juego.numJuego - Identificador del juego.
   * @param {string} juego.portadaJuego - URL de la portada.
   * @param {string} juego.nombreJuego - Nombre del juego.
   * @param {string} juego.plataformasJuego - Plataformas disponibles.
   * @returns {HTMLElement} Elemento `<article>` que representa el juego.
   */

  const crearElementoJuego = (juego) => {
    const article = document.createElement("article");
    article.classList.add("juego");
    article.dataset.numJuego = juego.numJuego;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = juego.portadaJuego;
    img.alt = `Portada de ${juego.nombreJuego}`;
    img.classList.add("portada__juego");

    const titulo = document.createElement("figcaption");
    titulo.classList.add("titulo__juego");
    titulo.textContent = juego.nombreJuego;

    const plataformas = document.createElement("p");
    plataformas.classList.add("plataforma__juego");
    plataformas.textContent = juego.plataformasJuego;

    figure.append(img, titulo, plataformas);
    article.append(figure);

    return article;
  };

  /**
   * Comprueba si un juego es próximo según su fecha de lanzamiento.
   *
   * @param {string} fechaJuego - Fecha de lanzamiento del juego.
   * @returns {boolean} `true` si el juego aún no ha salido.
  */

  const esJuegoProximo = (fechaJuego) => {
    return new Date(fechaJuego) > Date.now();
  };

  /**
   * Renderiza un juego en la sección correspondiente
   * según si es próximo o ya disponible.
   *
   * @param {Object} juego - Datos del juego.
   * @param {HTMLElement} proximos - Contenedor de juegos próximos.
   * @param {HTMLElement} disponibles - Contenedor de juegos disponibles.
   */

  const renderizarJuego = (juego, proximos, disponibles) => {
    const elemento = crearElementoJuego(juego);

    if (esJuegoProximo(juego.fechaJuego)) {
      proximos.append(elemento);
    } else {
      disponibles.append(elemento);
    }
  };

  /**
   * Renderiza juegos almacenados en localStorage en una sección concreta.
   *
   * @param {string} datos - Clave del localStorage donde se guardan los juegos.
   * @param {HTMLElement} destino - Contenedor donde se insertarán los juegos.
   * @param {string} claseEstado - Clase CSS que indica el estado del juego (favorito, esperado).
   * @returns {void}
   */

  const pintarLocalStorage = (datos, destino, claseEstado) => {

    const seccionProximos = document.querySelector(".seccion__hype");
    const seccionDisponibles = document.querySelector(".seccion__disponibles");
    const seccionEsperados = document.querySelector(".seccion__tusesperados");
    const seccionFavoritos = document.querySelector(".seccion__favoritos");

    if (!seccionDisponibles || !seccionProximos || !seccionEsperados || !seccionFavoritos) return;
    if (!localStorage.getItem(datos)) return;

    const juegosLS = obtenerDatosLS(datos);

    juegosLS.forEach((juego) => {
      const elemento = crearElementoJuego({
        numJuego: juego.numJuego,
        portadaJuego: juego.portadaJuego,
        nombreJuego: juego.tituloJuego,
        plataformasJuego: juego.plataformasJuego
      });

      const original = document.querySelector(`[data-num-juego="${juego.numJuego}"]`);
      if (original) original.classList.add(claseEstado);


      const copia = crearCopiaJuego(elemento, claseEstado);

      destino.append(copia);


      copia.addEventListener("click", () =>
        eliminarJuego(copia, datos, juego.numJuego, claseEstado, original)
      );
    });
  };

  /**
   * Renderiza todos los juegos almacenados en `datosLanzamientos`
   * y los distribuye entre las secciones de próximos y disponibles.
   *
   * @returns {void}
   */

  const pintarJuegos = () => {
    if (!document.querySelector("seccion__hype") || !document.querySelector("seccion__disponibles")) return;
    const proximos = document.querySelector(".seccion__hype");
    const disponibles = document.querySelector(".seccion__disponibles");

    if (!localStorage.getItem("datosLanzamientos") || !proximos) return;

    const juegos = obtenerJuegos();

    juegos.forEach((juego) =>
      renderizarJuego(juego, proximos, disponibles)
    );
  };
  pintarJuegos();
  pintarLocalStorage("juegosDisponibles", document.querySelector(".seccion__favoritos"), "favorito");
  pintarLocalStorage("juegosProximos", document.querySelector(".seccion__tusesperados"), "esperado");

  if (!document.querySelector("seccion__hype") || !document.querySelector("seccion__disponibles")) return;
  const seccionProximos = document.querySelector(".seccion__hype");
  const seccionDisponibles = document.querySelector(".seccion__disponibles");
  const proximos = seccionProximos.querySelectorAll(".juego")
  const disponibles = seccionDisponibles.querySelectorAll(".juego")


  proximos.forEach((juego) => {
    juego.addEventListener(("click"), () => agregarJuego(juego, document.querySelector(".seccion__tusesperados"), "juegosProximos", "esperado"));
  });
  disponibles.forEach((juego) => {
    juego.addEventListener(("click"), () => agregarJuego(juego, document.querySelector(".seccion__favoritos"), "juegosDisponibles", "esperado"))
  });
};


/**
 * Obtiene datos almacenados en localStorage y los convierte a objeto.
 *
 * @param {string} clave - Clave del localStorage donde se guardan los datos.
 * @returns {Array<Object>} Array de objetos almacenados o array vacío si no existen datos.
 */

const obtenerDatosLS = (clave) => {
  return JSON.parse(localStorage.getItem(clave) || "[]");
};


/**
 * Guarda datos en localStorage convirtiéndolos a JSON.
 *
 * @param {string} clave - Clave bajo la que se almacenarán los datos.
 * @param {Array<Object>} datos - Datos que se desean guardar.
 * @returns {void}
**/

const guardarDatosLS = (clave, datos) => {
  localStorage.setItem(clave, JSON.stringify(datos));
};

/**
 * Extrae la información de un elemento de juego del DOM
 * y la convierte en un objeto con sus datos.
 *
 * @param {HTMLElement} elemento - Elemento HTML que representa un juego.
 * @returns {Object} Datos del juego.
 * @property {string} numJuego - Identificador del juego.
 * @property {string} portadaJuego - URL de la portada del juego.
 * @property {string} tituloJuego - Título del juego.
 * @property {string} plataformasJuego - Plataformas disponibles.
 */

const extraerDatosJuego = (elemento) => {
  return {
    numJuego: elemento.dataset.numJuego,
    portadaJuego: elemento.querySelector(".portada__juego").src,
    tituloJuego: elemento.querySelector(".titulo__juego").textContent,
    plataformasJuego: elemento.querySelector(".plataforma__juego").textContent
  };
};

/**
 * Crea una copia de un elemento de juego del DOM.
 *
 * La copia se utiliza normalmente para mostrar el juego
 * en secciones como favoritos o esperados.
 *
 * @param {HTMLElement} juego - Elemento original del juego.
 * @param {string} [clase] - Clase adicional que indica el estado del juego.
 * @returns {HTMLElement} Elemento clonado del juego.
 */

const crearCopiaJuego = (juego, clase) => {
  const copia = juego.cloneNode(true);
  copia.classList.add("eliminable");
  if (clase) copia.classList.add(clase);
  return copia;
};

/**
 * Elimina un juego del DOM y del localStorage.
 *
 * Muestra una confirmación al usuario antes de eliminar el juego.
 * También elimina la clase de estado del juego original si existe.
 *
 * @param {HTMLElement} elemento - Elemento del juego que se eliminará.
 * @param {string} claveLS - Clave del localStorage donde está almacenado el juego.
 * @param {string|number} filtroId - Identificador del juego que se eliminará.
 * @param {string} claseOriginal - Clase que indica el estado del juego.
 * @param {HTMLElement} [juegoOriginal] - Elemento original del juego en la lista principal.
 * @returns {void}
 */


const eliminarJuego = (elemento, claveLS, filtroId, claseOriginal, juegoOriginal) => {
  if (confirm("¿Seguro que quieres eliminar este juego?")) {
    elemento.remove();
  }


  let datos = obtenerDatosLS(claveLS);
  datos = datos.filter((it) => it.numJuego !== filtroId);

  guardarDatosLS(claveLS, datos);

  if (juegoOriginal) juegoOriginal.classList.remove(claseOriginal);
};

/**
 * Agrega un juego a una sección específica y lo guarda en localStorage.
 *
 * Evita duplicados comprobando si el juego ya existe en la sección destino
 * o si ya tiene la clase de estado aplicada.
 *
 * @param {HTMLElement} juego - Elemento original del juego.
 * @param {HTMLElement} seccionDestino - Sección donde se añadirá la copia del juego.
 * @param {string} claveLS - Clave del localStorage donde se guardará el juego.
 * @param {string} claseEstado - Clase CSS que indica el estado del juego (favorito, esperado).
 * @returns {void}
 */

const agregarJuego = (
  juego,
  seccionDestino,
  claveLS,
  claseEstado
) => {

  const juegoYaCopiado = seccionDestino.querySelector(`[data-num-juego="${juego.getAttribute("data-num-juego")}"]`)
  if (juego.classList.contains(claseEstado)) return;
  if (juegoYaCopiado) return;
  const copia = crearCopiaJuego(juego);
  const datos = extraerDatosJuego(copia);

  seccionDestino.append(copia);

  juego.classList.add(claseEstado);

  const lista = obtenerDatosLS(claveLS);
  lista.push(datos);
  guardarDatosLS(claveLS, lista);

  copia.addEventListener("click", () =>
    eliminarJuego(copia, claveLS, datos.numJuego, claseEstado, juego)
  );
};

/*
* Inicializa la validación del formulario de contacto y newsletter.
*
* - Valida los campos de nombre, email, asunto y mensaje.
* - Valida el email del formulario de newsletter.
* - Muestra mensajes de error cuando los datos no son válidos.
* - Activa o desactiva los botones de envío según el estado de validación.
*
* La validación se ejecuta en los eventos `blur` e `input`.
*
* @returns {void}
*/

const validacionFormulario = () => {
  if (!document.querySelector(".seccion__contacto")) return;

  const inputEmail = document.querySelector("#email");
  const inputNombre = document.querySelector("#nombre");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputNewsletter = document.querySelector("#newsletter");
  const botonEnviar = document.querySelector(".formulario__boton--grande");
  const botonEnviarNewsletter = document.querySelector(".formulario__boton");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const estadoValidacion = {
    email: false,
    nombre: false,
    asunto: false,
    mensaje: false,
  };
  let newsletter = false

  /**
   * Valida un input del formulario según su tipo.
   *
   * @param {Event} e - Evento generado por el input.
   * @returns {void}
   */

  const validarInput = (e) => {
    const valor = e.target.value.trim();
    const campoId = e.target.id;


    if (campoId === "mensaje") {
      if (valor.length < 4) {
        mostrarError(e.target, "El campo debe tener un minimo de 4 caracteres");
        estadoValidacion.mensaje = false;
      } else {
        limpiarError(e.target);
        estadoValidacion.mensaje = true;
      }
    }

    if (campoId === "asunto" || campoId === "nombre") {
      if (valor.length < 3) {
        mostrarError(e.target, "El campo debe tener un minimo de 3 caracteres");
        estadoValidacion[campoId] = false;
      } else {
        limpiarError(e.target);
        estadoValidacion[campoId] = true;
      }
    }


    if (e.target.id === "email") {
      if (!regexEmail.test(valor)) {
        mostrarError(e.target, "Email no válido");
        estadoValidacion[campoId] = false;
      } else {
        limpiarError(e.target);
        estadoValidacion[campoId] = true;
      }
    }
    if (e.target.id === "newsletter") {
      if (!regexEmail.test(valor)) {
        mostrarError(e.target, "Email no válido");
        newsletter = false;
      } else {
        limpiarError(e.target);
        newsletter = true;
      }
    }
    verificarEstadoBoton();
  }


  /**
   * Comprueba el estado de validación del formulario
   * y habilita o deshabilita los botones de envío.
   *
   * @returns {void}
   */

  const verificarEstadoBoton = () => {
    const todosValidos = Object.values(estadoValidacion).every(valor => valor === true);

    if (todosValidos) {
      botonEnviar.disabled = false;
      botonEnviar.classList.remove('boton-desactivado');
    } else {
      botonEnviar.disabled = true;
      botonEnviar.classList.add('boton-desactivado');
    }
    if (newsletter) {
      botonEnviarNewsletter.disabled = false;
      botonEnviarNewsletter.classList.remove('boton-desactivado');
    } else {
      botonEnviarNewsletter.disabled = true;
      botonEnviarNewsletter.classList.add('boton-desactivado');
    }
  }

  /**
   * Muestra un mensaje de error debajo de un input.
   *
   * @param {HTMLElement} input - Campo del formulario donde se mostrará el error.
   * @param {string} mensaje - Texto del mensaje de error.
   * @returns {void}
   */

  const mostrarError = (input, mensaje) => {
    limpiarError(input);

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error__formulario");

    input.parentElement.append(error);
  }

  /**
   * Elimina el mensaje de error de un input si existe.
   *
   * @param {HTMLElement} input - Campo del formulario del que se eliminará el error.
   * @returns {void}
   *
   */

  const limpiarError = (input) => {
    const alerta = input.parentElement.querySelector(".error__formulario");
    if (alerta) {
      alerta.remove();
    }
  }


  [inputEmail, inputNombre, inputAsunto, inputMensaje, inputNewsletter].forEach(input => {
    input.addEventListener("blur", validarInput);
    input.addEventListener("input", validarInput);
  });

  botonEnviar.disabled = true;
  botonEnviar.classList.add('boton-desactivado');
  botonEnviarNewsletter.disabled = true;
  botonEnviarNewsletter.classList.add('boton-desactivado');
}




const main = () => {
  if (!localStorage.getItem("datosLanzamientos") && document.querySelector(".juego")) {
    crearJSONJuegos();
  }
  hrefJuegos();
  detectarModoSistema();
  aplicarSwitchModo();
  menuHamburguesa();
  cargarPaginaResenas();
  validacionFormulario();
};
main();
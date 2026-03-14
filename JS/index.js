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

const restaurarIconoModo = (luna, sol) => {

  if (document.body.classList.contains("modo__oscuro")) {
    sol.classList.replace("oculto", "visible");
  } else {
    luna.classList.replace("oculto", "visible");
  }
};

const cerrarMenu = (el) => {
  document.body.style.overflow = "";

  el.desplegable.classList.replace("menu__desplegable--desplegado", "oculto");

  restaurarIconoModo(el.luna, el.sol);

  el.seccionLogo.classList.toggle("semitransparente");

  el.main.classList.toggle("semitransparente");

  el.boton.classList.replace("oculto", "boton__menú__hamburguesa");

  el.cabecera.classList.replace("cabecera--semitransparente", "cabecera");
};

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

const aplicarSwitchModo = () => {
  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");

  luna.addEventListener("click", toggleModo);
  sol.addEventListener("click", toggleModo);
};

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

const cargarPaginaResenas = () => {
  const obtenerJuegos = () => {
    const datos = localStorage.getItem("datosLanzamientos");
    return datos ? JSON.parse(datos) : [];
  };

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

  const esJuegoProximo = (fechaJuego) => {
    return new Date(fechaJuego) > Date.now();
  };

  const renderizarJuego = (juego, proximos, disponibles) => {
    const elemento = crearElementoJuego(juego);

    if (esJuegoProximo(juego.fechaJuego)) {
      proximos.append(elemento);
    } else {
      disponibles.append(elemento);
    }
  };

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
  const pintarJuegos = () => {
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

const obtenerDatosLS = (clave) => {
  return JSON.parse(localStorage.getItem(clave) || "[]");
};

const guardarDatosLS = (clave, datos) => {
  localStorage.setItem(clave, JSON.stringify(datos));
};

const extraerDatosJuego = (elemento) => {
  return {
    numJuego: elemento.dataset.numJuego,
    portadaJuego: elemento.querySelector(".portada__juego").src,
    tituloJuego: elemento.querySelector(".titulo__juego").textContent,
    plataformasJuego: elemento.querySelector(".plataforma__juego").textContent
  };
};

const crearCopiaJuego = (juego, clase) => {
  const copia = juego.cloneNode(true);
  copia.classList.add("eliminable");
  if (clase) copia.classList.add(clase);
  return copia;
};

const eliminarJuego = (elemento, claveLS, filtroId, claseOriginal, juegoOriginal) => {
  if (confirm("¿Seguro que quieres eliminar este juego?")) {
    elemento.remove();
  }


  let datos = obtenerDatosLS(claveLS);
  datos = datos.filter((it) => it.numJuego !== filtroId);

  guardarDatosLS(claveLS, datos);

  if (juegoOriginal) juegoOriginal.classList.remove(claseOriginal);
};

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

  const mostrarError = (input, mensaje) => {
    limpiarError(input);

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error__formulario");

    input.parentElement.append(error);
  }

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
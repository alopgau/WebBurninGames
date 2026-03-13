"use strict";
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

const hrefJuegos = () => {
  if (!document.querySelector(".juego")) return;
  const juegos = document.querySelectorAll(".juego");
  for (let index = 0; index < juegos.length; index++) {
    juegos[index].setAttribute("id", index);
  }
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
    article.classList.add("copia__juego");
    article.dataset.numJuego = juego.idJuego;

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
  anadirEventoResenas()
};
const anadirEventoResenas = () => {
  if (!document.querySelector(".copia__juego")) return;
  const seccionEsperados = document.querySelector(".seccion__tusesperados");
  const seccionFavoritos = document.querySelector(".seccion__favoritos");
  const seccionProximos = document.querySelector(".seccion__hype");
  const seccionDisponibles = document.querySelector(".seccion__disponibles");
  const juegosProximos = seccionProximos.querySelectorAll(".copia__juego");
  const juegosDisponibles = seccionDisponibles.querySelectorAll(".copia__juego");
  if (localStorage.getItem("datosFavoritos")) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("datosFavoritos"))
    const juegos = cargarJuegoDesdeJSON(favoritosGuardados, "favorito_ls");
    juegos.forEach((juego) => {
      juego.classList.add("eliminable")
      seccionFavoritos.append(juego)
    })
  }
  if (localStorage.getItem("datosEsperados")) {
    const esperadosGuardados = JSON.parse(localStorage.getItem("datosFavoritos"))
    const juegos = cargarJuegoDesdeJSON(esperadosGuardados, "esperado__ls")
    juegos.forEach((juego) => {
      juego.classList.add("eliminable")
      seccionEsperados.append(juego)
      if (confirm("¿Seguro que quieres eliminar este juego de tus esperados?")) {
        copia.remove()
        juego.classList.remove("favorito")
      }
    })
  }

  const datosEsperados = JSON.parse(localStorage.getItem("datosEsperados") || "[]")
  juegosProximos.forEach((juego) => {
    juego.addEventListener("click", () => {
      if (!juego.classList.contains("esperado")) {
        const copia = juego.cloneNode(true)
        seccionEsperados.append(copia)
        juego.classList.add("esperado")
        copia.classList.add("eliminable")
        const portadaJuego = copia.querySelector(".portada__juego").getAttribute("src")
        const tituloJuego = copia.querySelector(".titulo__juego").textContent
        const plataformasJuego = copia.querySelector(".plataforma__juego").textContent
        const datosJuego = { portadaJuego, tituloJuego, plataformasJuego }
        localStorage.setItem("datosEsperados", JSON.stringify(datosEsperados))
        datosEsperados.push(datosJuego)
        copia.addEventListener("click", () => {
          if (confirm("¿Seguro que quieres eliminar este juego de tus esperados?"))
            copia.remove()
          juego.classList.remove("esperado")
        })
      }

    })
  })


  let datosFavoritos = JSON.parse(localStorage.getItem("datosFavoritos") || "[]")
  juegosDisponibles.forEach((juego) => {
    const numJuego = juego.getAttribute("data-numJuego")
    juego.addEventListener("click", () => {
      if (!juego.classList.contains("favorito")) {
        const copia = juego.cloneNode(true)
        seccionFavoritos.append(copia)
        copia.classList.add("eliminable")
        juego.classList.add("favorito")
        const portadaJuego = copia.querySelector(".portada__juego").getAttribute("src")
        const tituloJuego = copia.querySelector(".titulo__juego").textContent
        const plataformasJuego = copia.querySelector(".plataforma__juego").textContent
        const datosJuego = { numJuego, portadaJuego, tituloJuego, plataformasJuego }
        datosFavoritos.push(datosJuego)
        localStorage.setItem("datosFavoritos", JSON.stringify(datosFavoritos))
        copia.addEventListener(("click"), () => {
          if (confirm("¿Seguro que quieres eliminar este juego de tus favoritos?")) {
            const FavoritosAux = JSON.parse(localStorage.getItem("datosFavoritos") || "[]")
            copia.remove()
            datosFavoritos = FavoritosAux.filter((it) => numJuego !== it.numJuego)
            localStorage.setItem("datosFavoritos", JSON.stringify(datosFavoritos))
            juego.classList.remove("favorito")
          }
        })
      }
    })
  })
}



const cargarJuegoDesdeJSON = (json, clase) => {
  const listaJuegos = []
  json.forEach((juego) => {
    const articleJuego = document.createElement("article");
    const nombreJuego = document.createElement("figcaption");
    nombreJuego.classList.add("titulo__juego");
    nombreJuego.textContent = `${juego.tituloJuego}`;

    const figureJuego = document.createElement("figure");

    articleJuego.classList.add("copia__juego");
    const portadaJuego = document.createElement("img");
    portadaJuego.setAttribute("src", juego.portadaJuego);
    articleJuego.setAttribute("id", juego.idJuego);
    portadaJuego.setAttribute("alt", `Portada de ${juego.nombreJuego}`);

    portadaJuego.classList.add("portada__juego");
    const plataformasJuego = document.createElement("p");
    plataformasJuego.classList.add("plataforma__juego");
    plataformasJuego.textContent = `${juego.plataformasJuego}`;
    articleJuego.append(figureJuego);
    articleJuego.classList.add(clase)
    figureJuego.append(portadaJuego, nombreJuego, plataformasJuego);
    articleJuego.addEventListener("click", () => {
      if (articleJuego.classList.contains("favorito__ls")) {
        if (confirm("¿Seguro que quieres eliminar este juego de tus favoritos?")) {
          articleJuego.remove()
        }
      } else {
        if (confirm("¿Seguro que quieres eliminar este juego de tus esperados?")) {
          articleJuego.remove()
        }
      }
    })
    listaJuegos.push(articleJuego)
  })
  return listaJuegos
}

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
  debugger
  cargarPaginaResenas();
  validacionFormulario();
};
main();
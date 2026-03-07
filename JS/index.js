"use strict";
let modoOscuro = false;
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
const menuHamburguesa = () => {
  const boton = document.querySelector(".boton__menú__hamburguesa");
  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");
  const desplegable = document.querySelector(".oculto");
  const main = document.querySelector("main");
  const cabecera = document.querySelector(".cabecera");
  const seccionLogo = document.querySelector(".cabecera__logo");
  boton.addEventListener("click", () => {
    desplegable.classList.replace("oculto", "menu__desplegable--desplegado");
    boton.classList.replace("boton__menú__hamburguesa", "oculto");
    luna.classList.replace("visible", "oculto");
    sol.classList.replace("visible", "oculto");
    main.classList.toggle("semitransparente");
    seccionLogo.classList.toggle("semitransparente");
    document.body.style.overflow = "hidden";
    cabecera.classList.replace("cabecera", "cabecera--semitransparente");
  });
  const botonAtrasHamburguesa = document.querySelector(
    '.menu__desplegable__boton__atras'
  );
  botonAtrasHamburguesa.addEventListener('click', () => {
    main.classList.toggle('semitransparente');
    document.body.style.overflow = '';
    desplegable.classList.replace('menu__desplegable--desplegado', 'oculto');
    if (modoOscuro) {
      luna.classList.replace('oculto', 'visible');
    } else {

      sol.classList.replace('oculto', 'visible');
    }
    seccionLogo.classList.toggle('semitransparente');
    boton.classList.replace('oculto', 'boton__menú__hamburguesa');
    cabecera.classList.replace('cabecera--semitransparente', 'cabecera');
  });
};

const AnadirEventoSwitchModo = (elemento) => {
  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    modoOscuro = true;
    sol.classList.add("oculto");
    luna.classList.add("visible");
  } else {
    luna.classList.add("oculto");
    sol.classList.add("visible");
  }
  elemento.addEventListener("click", () => {
    const todos = document.querySelectorAll("*");
    if (modoOscuro) {
      todos.forEach((it) => {
        if (it != luna && it != sol) {
          it.classList.add("modo__claro");
          it.classList.remove("modo__oscuro");
        }
      });
      modoOscuro = false;
      luna.classList.replace("visible", "oculto");
      sol.classList.replace("oculto", "visible");
    } else {
      todos.forEach((it) => {
        if (it != sol && it != luna) {
          it.classList.add("modo__oscuro");
          it.classList.remove("modo__claro");
        }
      });
      modoOscuro = true;
      sol.classList.replace("visible", "oculto");
      luna.classList.replace("oculto", "visible");
    }
  });
};

const SwitchModo = () => {
  const luna = document.querySelector(".luna");
  const sol = document.querySelector(".sol");
  AnadirEventoSwitchModo(luna);
  AnadirEventoSwitchModo(sol);
};

const crearJSONJuegos = () => {

  // Función que crea un JSON (guardado en localStorage) con toda la información de los juegos en la página lanzamientos

  const juegos = document.querySelectorAll(".juego");
  const datosJuego = Array.from(juegos).map((juego) => {
    const idJuego = juego.getAttribute("id");
    const nombreJuego = juego.querySelector(".titulo__juego").textContent;
    const fechaJuego = juego.querySelector(".fecha__juego").getAttribute("datetime");
    const plataformasJuego = juego.querySelector(".plataforma__juego").textContent;
    const portadaJuego = juego.querySelector(".portada__juego").getAttribute("src");
    return { idJuego, portadaJuego, nombreJuego, plataformasJuego, fechaJuego };
  });
  localStorage.setItem("datosLanzamientos", JSON.stringify(datosJuego));
};

const cargarPaginaResenas = () => {

  // Función que carga los juegos de la página lanzamientos en la página reseñas accediendo al localStorage

  if (!localStorage.getItem("datosLanzamientos")) return;

  const juegosProximos = document.querySelector(".seccion__hype");
  const juegosDisponibles = document.querySelector(".seccion__disponibles");
  const juegos = JSON.parse(localStorage.getItem("datosLanzamientos"));
  juegos.forEach((juego) => {
    const articleJuego = document.createElement("article");
    const nombreJuego = document.createElement("figcaption");
    nombreJuego.classList.add("titulo__juego");
    nombreJuego.textContent = `${juego.nombreJuego}`;
    const figureJuego = document.createElement("figure");

    articleJuego.classList.add("copia__juego");
    const portadaJuego = document.createElement("img");
    portadaJuego.setAttribute("src", juego.portadaJuego);
    portadaJuego.setAttribute("alt", `Portada de ${juego.nombreJuego}`);
    portadaJuego.classList.add("portada__juego");
    const plataformasJuego = document.createElement("p");
    plataformasJuego.classList.add("plataforma__juego");
    plataformasJuego.textContent = `${juego.plataformasJuego}`;
    articleJuego.append(figureJuego);
    figureJuego.append(portadaJuego, nombreJuego, plataformasJuego);

    if (new Date(juego.fechaJuego) > Date.now()) {
      juegosProximos.append(articleJuego);
    } else {
      juegosDisponibles.append(articleJuego);
    }
  });
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

  juegosProximos.forEach((juego) => {
    juego.addEventListener("click", () => {
      if (!juego.classList.contains("esperado")) {
        const copia = juego.cloneNode(true)
        seccionEsperados.append(copia)
        juego.classList.add("esperado")
      }

    })
  })
  juegosDisponibles.forEach((juego) => {
    juego.addEventListener("click", () => {
      if (!juego.classList.contains("favorito")) {
        const copia = juego.cloneNode(true)
        seccionFavoritos.append(copia)
        juego.classList.add("favorito")
      }
    })
  })
}


const main = () => {
  if (!localStorage.getItem("datosLanzamientos") && document.querySelector(".juego")) {
    crearJSONJuegos();
  }
  hrefJuegos();
  menuHamburguesa();
  SwitchModo();
  cargarPaginaResenas();

};
main();
"use strict"
let modoOscuro = false
const cargarHrefJuego = (juego) => {
    switch (juego.getAttribute("id")) {
        case "0":
            juego.addEventListener("click", () => {
                window.location.href = "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch-2/Hyrule-Warriors-La-era-del-destierro-2789659.html?srsltid=AfmBOoryhSGJioh5-0_hFfstbhmhxc7gD_xGct0OGVKUCyTSBEqiThBp"
            })
            break;
            case "1":
                juego.addEventListener("click", () => {
                    window.location.href = "https://www.inazuma.jp/victory-road/es/"
                })
                break;
                case "2":
                    juego.addEventListener("click", () => {
                        window.location.href = "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/Leyendas-Pokemon-Z-A-2533423.html?srsltid=AfmBOoqdYbEkZ1BOu8Ka4EzMSmiFLcfTGnLTlwOIfEK446FKyfyuOItE"
                    })
                    break;
                    case "3":
                        juego.addEventListener("click", () => {
                            window.location.href = "https://es.bandainamcoent.eu/little-nightmares/little-nightmares-iii"
                        })
                        break;
                        
                        
                        default:
                            break;
                        }
                        
                    }
                    
                    const hrefJuegos = () => {
                        const juegos = document.querySelectorAll(".juego")
                        for (let index = 0; index < juegos.length; index++) {
                            juegos[index].setAttribute("id",index);
                        }
                        for (const juego of juegos) {
                            cargarHrefJuego(juego)
                        }
                    }
                    const menuHamburguesa = () => {
                        const boton = document.querySelector(".boton__menú__hamburguesa")
                        const luna = document.querySelector(".luna")
                        const sol = document.querySelector(".sol")
                        const desplegable = document.querySelector(".oculto")
                        const main = document.querySelector("main")
                        const cabecera = document.querySelector(".cabecera")
    const seccionLogo = document.querySelector(".cabecera__logo")
    boton.addEventListener("click", () => {
        desplegable.classList.replace("oculto", "menu__desplegable--desplegado")
        boton.classList.replace("boton__menú__hamburguesa","oculto")
        luna.classList.replace("luna","oculto")
        sol.classList.replace("sol","oculto")
        main.classList.toggle("semitransparente")
        seccionLogo.classList.toggle("semitransparente")
        document.body.style.overflow = "hidden"
        cabecera.classList.replace("cabecera","cabecera--semitransparente")
        
    }
)
const botonAtrasHamburguesa = document.querySelector(".menu__desplegable__boton__atras")
botonAtrasHamburguesa.addEventListener("click", () => {
    main.classList.toggle("semitransparente")
    document.body.style.overflow = ""
    desplegable.classList.replace("menu__desplegable--desplegado","oculto")
    luna.classList.replace("oculto","luna")
    seccionLogo.classList.toggle("semitransparente")
    boton.classList.replace("oculto", "boton__menú__hamburguesa")
    cabecera.classList.replace("cabecera--semitransparente","cabecera")
})}

const AnadirEventoSwitchModo = (elemento) => {
    const luna = document.querySelector(".luna")
    const sol = document.querySelector(".sol")
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
     modoOscuro = true
     sol.classList.add("oculto")
     luna.classList.add("visible")
    } else {
        luna.classList.add("oculto")
        sol.classList.add("visible")

    }
elemento.addEventListener("click", () => {
    const todos = document.querySelectorAll("*")
    if (modoOscuro) {
        todos.forEach((it) => {
            if (it != luna && it != sol) {
            it.classList.add("modo__claro")
            it.classList.remove("modo__oscuro")
            }
        })
        modoOscuro = false
        luna.classList.replace("visible","oculto")
        sol.classList.replace("oculto","visible")
        
    } else {
        todos.forEach((it) => {
            if (it != sol && it != luna) {
                it.classList.add("modo__oscuro")
                it.classList.remove("modo__claro")
            }
        })
        modoOscuro = true
        sol.classList.replace("visible","oculto")
        luna.classList.replace("oculto","visible")
    }
})
}

const SwitchModo = ()  => {
    const luna = document.querySelector(".luna")
    const sol = document.querySelector(".sol")
    AnadirEventoSwitchModo(luna)
    AnadirEventoSwitchModo(sol)
    
}

function main() {
    hrefJuegos()
    menuHamburguesa()
    SwitchModo()
}
main()


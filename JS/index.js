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

const HrefJuegos = () => {
    const juegos = document.querySelectorAll(".juego")
    for (let index = 0; index < juegos.length; index++) {
        juegos[index].setAttribute("id",index);
    }
    for (const juego of juegos) {
                    cargarHrefJuego(juego)
                    }
                }
const MenuHamburguesa = () => {
    const boton = document.querySelector(".boton__menú__hamburguesa")
    const luna = document.querySelector(".luna")
    const desplegable = document.querySelector(".oculto")
    const main = document.querySelector("main")
    const cabecera = document.querySelector(".cabecera")
    const elementosCabecera = cabecera.children
    boton.addEventListener("click", () => {
        if (desplegable.classList.contains("oculto")) {
            desplegable.classList.replace("oculto", "menu__desplegable--desplegado")
            boton.classList.replace("boton__menú__hamburguesa","oculto")
            luna.classList.replace("luna","oculto")
            cabecera.classList.toggle("semitransparente")
            main.classList.toggle("semitransparente")
            document.body.style.overflow = "hidden"
            for (let index = 1; index < elementosCabecera.length; index++) {
               const element = array[index];
               element.classList.toggle("semitransparente")
               
            }
        }
    })
    const botonAtrasHamburguesa = document.querySelector(".menu__desplegable__boton__atras")
    botonAtrasHamburguesa.addEventListener("click", () => {
        cabecera.classList.toggle("semitransparente")
        main.classList.toggle("semitransparente")
        document.body.style.overflow = ""
        desplegable.classList.replace("menu__desplegable--desplegado","oculto")
        luna.classList.replace("oculto","luna")
        boton.classList.replace("oculto", "boton__menú__hamburguesa")
        for (let index = 1; index < elementosCabecera.length; index++) {
           const element = array[index];
           element.classList.toggle("semitransparente")
        

    }})
}

function main() {
    HrefJuegos()
    MenuHamburguesa()
}
main()


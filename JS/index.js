function cargarHrefJuego(juego) {
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

function HrefJuegos() {
    const juegos = document.querySelectorAll(".juego")
    for (let index = 0; index < juegos.length; index++) {
        juegos[index].setAttribute("id",index);
    }
    for (const juego of juegos) {
                    cargarHrefJuego(juego)
                    }
                }
function main() {
    HrefJuegos()
}
main()


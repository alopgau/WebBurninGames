const juegos = document.querySelectorAll(".juego")
for (let index = 0; index < juegos.length; index++) {
     juegos[index].setAttribute("id",index);
}
for (const juego of juegos) {
    switch (juego.getAttribute("id")) {
        case "0":
            juego.addEventListener("click", () => {
                window.location.href = "https://www.google.com"
            })
            break;
    
        default:
            break;
    }
    
}

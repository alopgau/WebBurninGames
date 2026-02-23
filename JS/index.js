
console.log(document);
console.log(document.querySelector(".cabecera"));
console.log(document.querySelectorAll(".cabecera__menu__lista--elemento"));
const div = document.createElement("div")
const footer = document.querySelector("footer")
footer.prepend(div)
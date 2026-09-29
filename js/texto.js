const textos = [
    "Desarrollador Python",
    "Analísta de Datos Jr",
    "Ingeniero en Sistemas Computacionales",
    "Backend Developer"
];

let indice = 0;
const texto = document.getElementById("texto");

texto.textContent = textos[0];

setInterval(() => {
    texto.style.opacity = 0;

    setTimeout(() => {
        indice = (indice + 1) % textos.length;
        texto.textContent = textos[indice];
        texto.style.opacity = 1;
    }, 500);

}, 2500);
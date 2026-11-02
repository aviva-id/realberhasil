console.log("JavaScript berhasil dijalankan!");
const hero = document.querySelector(".hero");

const images = [
    "reference/background halaman.jpg",
    "reference/bk 2.jpg",
    "reference/bk 3.jpg",

];

let index = 0;

setInterval(() => {
    index++;

    if (index >= images.length) {
        index = 0;
    }

    hero.style.backgroundImage = `
        linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
        ),
        url("${images[index]}")
    `;
}, 5000);
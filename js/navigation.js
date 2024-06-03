const piano = new Audio("./assets/audio/piano.mp3");
const musicButton = document.querySelector(".music");

const playbtn = document.querySelector("#home .play");
const shopbtn = document.querySelector("#home .shop");
const shopreturn = document.querySelector("#shop .shoptitle button");
const garagereturn = document.querySelector(".garagetitle button");
const garagebtn = document.querySelector("#home .garage");
const divintro = document.querySelector("#gameintro");
const divmain = document.querySelector("#main");
const container = document.querySelector("#gameintro .container");
const gamereturn = document.querySelector("#game .lostbox");

let music = false;
piano.loop = true;

const intro = () => {
    divintro.style.display = 'flex';
    setTimeout(() => {
        container.style.boxShadow = '0 0 100vw 100vw #55ff5575';
        container.style.filter = 'blur(100px)';
    }, 1300);
    setTimeout(() => {
        divmain.style.display = 'flex';
        setTimeout(() => {
            divintro.style.opacity = '0';
        }, 100);
        setTimeout(() => {
            divintro.style.display = 'none';
        }, 600);
    }, 1800);
}

window.addEventListener("DOMContentLoaded", () => {
    const ifreturn = Number(localStorage.getItem("return")) || 0;
    if (ifreturn === 0) {
        setTimeout(() => {
            location.hash = "";
        }, 250);
    } else {
        setTimeout(() => {
            playbtn.click();
            localStorage.setItem("return", 0);
        }, 250);
    }
});

playbtn.addEventListener("click", () => {
    location.hash = "#game";
    intro();
});

shopbtn.addEventListener("click", () => {
    location.hash = "#shop";
});

shopreturn.addEventListener("click", () => {
    location.hash = "";
});

garagereturn.addEventListener("click", () => {
    location.href = "";
});

garagebtn.addEventListener("click", () => {
    location.hash = "#garage";
});

gamereturn.addEventListener("click", () => {
    localStorage.setItem("return", 1);
    location.href = "";
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 2000) {
        isMobile();
    } else if (window.innerWidth < 900) {
        isMobile();
    } else {
        location.href = location.hash;
    }
});

musicButton.addEventListener("click", () => {
    if (!music) {
        piano.play();
        musicButton.style.backgroundColor = "#00000050";
        music = true;
    } else {
        piano.pause();
        musicButton.removeAttribute("style");
        music = false;
    }
});
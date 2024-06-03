let options = document.querySelectorAll(".container div .select");
let selectCar = document.querySelectorAll("#garage .container img");
const rankview = document.querySelector("#home .rank");
const initSelect = localStorage.getItem("select") || 0;

let rank = localStorage.getItem("rank") || "./assets/rank/level0.png";
let lastpower = localStorage.getItem("lastpower") || 0;
rankview.src = rank;

const updateRank = (img) => {
    rank = `./assets/rank/${img}.png`;
    localStorage.setItem("rank", rank);
}

const saveButton = (i) => {
    options.forEach(option => {
        option.removeAttribute("style");
        option.disabled = false;
    });

    if (options[i]) {
        Object.assign(options[i].style, {
            filter: 'brightness(.25)',
            cursor: 'default'
        });
        options[i].disabled = true;
    }

    localStorage.setItem("select", i);

    if (selectCar[i]) {
        let thecar = selectCar[i].src.split("/");
        thecar = thecar[thecar.length - 1];

        const carPower = Number(thecar.split("car")[1].split(".")[0]);

        if (carPower === 2 && carPower > lastpower) {
            updateRank("level1");
        } else if (carPower === 3 && carPower > lastpower) {
            updateRank("level2");
        } else if (carPower === 4 && carPower > lastpower) {
            updateRank("level3");
        } else if (carPower === 5 && carPower > lastpower) {
            updateRank("level4");
        }

        if (carPower > lastpower) {
            lastpower = carPower;
            localStorage.setItem("lastpower", lastpower);
        }

        localStorage.setItem("mycar", thecar);
    }
}

const updateG = () => {
    options = document.querySelectorAll(".container div .select");
    selectCar = document.querySelectorAll("#garage .container img");

    options.forEach((option, i) => {
        option.addEventListener("click", () => {
            saveButton(i);
        });
    });
}

const click = (init) => {
    options[init].click();
}

setTimeout(() => {
    click(initSelect);
}, 1000);

updateG();
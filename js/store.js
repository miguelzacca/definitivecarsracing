const cars = document.querySelectorAll("#shop .container button");
const carValues = document.querySelectorAll("#shop .container input");
const homepointsS = document.querySelectorAll(".points-box #homepoints");
const carCard = document.querySelectorAll("#shop .container div.car");
const garageContainer = document.querySelector("#garage .container");
let moneyS = localStorage.getItem("money") || 0;

const updateMoney = (i) => {
    moneyS = moneyS - Number(carValues[i].value);
    localStorage.setItem("money", moneyS);

    homepointsS.forEach(element => {
        element.textContent = moneyS.toString().padStart(5, "0");
    });
}

const disableButton = (car) => {
    Object.assign(car.style, {
        filter: 'brightness(.25)',
        cursor: 'not-allowed'
    });
    car.disabled = true;
}

const permission = () => {
    moneyS = localStorage.getItem("money") || 0;

    cars.forEach(car => {
        car.removeAttribute("style");
        car.disabled = false;
    });

    cars.forEach((car, i) => {
        if (Number(carValues[i].value) > moneyS) {
            disableButton(car);
        }
    });
}

const updateGarage = (i) => {
    const clone = carCard[i];
    clone.style.animation = 'remove .5s linear';

    setTimeout(() => {
        clone.querySelector("button").remove();
        clone.innerHTML += `
            <buttom class="select">Select</button>
        `;
        garageContainer.appendChild(clone);
        updateG();
        permission();
    }, 500);
}

cars.forEach((car, i) => {
    car.addEventListener("click", () => {
        if (moneyS >= Number(carValues[i].value)) {
            disableButton(car);
            localStorage.setItem(i, true);
            updateMoney(i);
            updateGarage(i);
        }
    });
});

cars.forEach((car, i) => {
    if (localStorage.getItem(i)) {
        disableButton(car);
        updateGarage(i);
    }
});

window.addEventListener("hashchange", () => {
    if (location.hash === "#shop") {
        permission();
    }
});
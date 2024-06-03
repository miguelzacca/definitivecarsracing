const infinitemoney = "money";
let keys = "";

window.addEventListener("keydown", (e) => {
    let add = false;

    for (const el of infinitemoney) {
        if (el === e.key) {
            add = true;
        }
    }

    if (add) {
        if (keys.length < infinitemoney.length) {
            keys += e.key;
        } else {
            keys = `${e.key}`;
        }
    
        if (keys === infinitemoney) {
            localStorage.setItem("money", 1000000);
            location.reload();
        }

        add = false;
    }
});

const deletemoney = "delete";
let keysDel = "";

window.addEventListener("keydown", (e) => {
    let add = false;

    for (const el of deletemoney) {
        if (el === e.key) {
            add = true;
        }
    }

    if (add) {
        if (keysDel.length < deletemoney.length) {
            keysDel += e.key;
        } else {
            keysDel = `${e.key}`;
        }
    
        if (keysDel === deletemoney) {
            localStorage.clear();
            location.reload();
        }

        add = false;
    }
});
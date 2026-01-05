let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Résultat P1");
    }, 3000);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Résultat P2");
    }, 1500);
});

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Résultat P3");
    }, 2300);
});

Promise.all([p1, p2, p3]).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

console.log("Fin");
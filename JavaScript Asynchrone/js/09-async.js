let resolveAfter = function(time) {
    let name = `resolveAfter ${time} seconds`;
    console.log("Start ", name);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name);
            console.log("end ", name);
        });
    });
}

let getTime = () => Date.now() % 10000;

async function departSequentiel() {
    console.log("=== Début séquentiel ", getTime());

    const lente = await resolveAfter(5);
    console.log("lente " + getTime());

    const rapide = await resolveAfter(1);
    console.log("rapide " + getTime());

    console.log("=== Fin séquentiel ", getTime());
}

departSequentiel();
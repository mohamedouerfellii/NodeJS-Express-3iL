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

    const lente = resolveAfter(5);
    const rapide = resolveAfter(1);

    console.log("\t" + await lente + " " + getTime());
    console.log("\t" + await rapide + " " +  getTime());

    console.log("=== Fin simultanée ", getTime());
}

departSequentiel();
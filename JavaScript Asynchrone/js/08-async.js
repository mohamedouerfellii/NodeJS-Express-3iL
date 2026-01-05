console.log("Début");

async function run() {
    let user = await getUserInfo();
    console.log("Après await ", user);
}

run();

console.log("Fin");

function getUserInfo() {
    return new Promise((resolve, reject) => {
        console.log("Requete Ajax");
        $.getJSON('data.php', function(data) {
            if(data.role != "admin") reject(new Error("Erreur données"));
            resolve(data);
        });
    });
}
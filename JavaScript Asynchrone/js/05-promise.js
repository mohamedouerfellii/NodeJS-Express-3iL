console.log("- Début du programme");
let user;

getUserInfo().then(user => {
    console.log("Données user ", user);
}).catch(error => {
    console.error("Erreur ", error.message);
});

console.log("- Fin du programme ");

function getUserInfo(callback) {
    return new Promise((resolve, reject) => {
        console.log("Requete Ajax");
        $.getJSON('data.php', function(data) {
            if(data.role != "admin") reject(new Error("Erreur données"));
            resolve(data);
        });
    });
}
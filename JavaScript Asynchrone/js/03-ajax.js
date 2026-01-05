console.log("- Début du programme");
let user = getUserInfo();

console.log("- Fin du programme ", user);

function getUserInfo() {
    let user = null;

    console.log("Requete Ajax");

    $.getJSON('data.php', function(data) {
       user = data;
        console.log("Données reçues ", user);
    });

    return user;
}
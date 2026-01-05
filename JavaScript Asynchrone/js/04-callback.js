console.log("- Début du programme");
let user;

getUserInfo((data) => {
    console.log("Données reçues ", data);
    user = data;
});

console.log("- Fin du programme ", user);

function getUserInfo(callback) {
    console.log("Requete Ajax");
    $.getJSON('data.php', function(data) {
        callback(data);
    });
    return user;
}
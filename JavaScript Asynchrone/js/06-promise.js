getProfDeWeb().then(
    (user) => {
        console.log("Prof de web ", user);
        return getLanguages();
    }
).then((languages) => {
    console.log("Languages ", languages);
}).catch(error => {
    console.error("Erreur ", error.message);
});

function getProfDeWeb() {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
           console.log("Fin Timeout 1");
           resolve({nom: 'Ouerfelli', prenom: 'Mohamed', bureau:220});
       }, 2000);
    });
}

function getLanguages() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fin Timeout 2");
            resolve(['Java','JavaScript', 'TypeScript']);
        }, 1500);
    });
}

console.log("Fin");
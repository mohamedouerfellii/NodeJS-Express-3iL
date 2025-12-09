const axios = require('axios');

axios.get('http://localhost:8090/data.php')
    .then((response) => {
        console.log("Heure : ", response.data);
    }).catch((error) => {
    console.log("Erreur : ", error);
});
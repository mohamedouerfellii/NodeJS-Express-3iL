const conv = require('./conversation');
const { produit } = require('./calcul');
const demo = require('demo');

conv.direBonjour();

console.log(conv.auteur);
conv.auteur = "Mohsen";
console.log(conv.auteur);

console.log(produit(5,6));
demo.trait();
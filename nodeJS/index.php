<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
  <h1>Formulaire POST</h1>
  <form action="http://localhost:8080/demo/formulaire" method="POST">
    <label for="nom">Nom :</label>
    <input id="nom" name="nom" type="text">
    <label for="prenom">Prénom :</label>
    <input id="prenom" name="prenom" type="text">
    <button>Envoyer</button>
  </form>
</body>
</html>
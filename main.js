const tableau = document.getElementById("table-body");
const prenom = document.getElementById("user-FirstName");
const nom = document.getElementById("user-Name");
const email = document.getElementById("user-Email");
const telephone = document.getElementById("num-telephone");
const addBtn = document.getElementById("add");
const editBtn = document.getElementById("edit");
const Form = document.getElementsByTagName("form");
// Fournit une valeur par défaut "" si localStorage.getItem("user") renvoie null
const savedData = localStorage.getItem("user") ?? "[]"; // La valeur par défaut est un tableau vide en JSON
// Parse la chaîne JSON en un tableau d'objets
const userData = JSON.parse(savedData);

// Fonction pour afficher les données existantes dans `localStorage` dans le tableau
function loadSavedData() {
  userData.forEach((user) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${user.Prenom}</td><td>${user.Nom}</td><td>${user.Email}</td><td>${user.Telephone}</td>`;
    tableau?.appendChild(row);
  });
}

// Appel de la fonction pour afficher les données déjà présentes
loadSavedData();
console.table(userData);

if (Form && prenom && nom && email && telephone && tableau && addBtn) {
  Form[0].addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log("hello world");
    const newUser = {
      Prenom: prenom.value,
      Nom: nom.value,
      Email: email.value,
      Telephone: telephone.value,
    };

    // Créer une nouvelle ligne et ajouter l'utilisateur au tableau HTML
    let row = document.createElement("tr");
    row.innerHTML = `<td>${newUser.Prenom}</td><td>${newUser.Nom}</td><td>${newUser.Email}</td><td>${newUser.Telephone}</td>`;
    tableau?.appendChild(row);

    // Vider les champs de formulaire après ajout
    prenom.value = "";
    nom.value = "";
    email.value = "";
    telephone.value = "";

    // Ajouter le nouvel utilisateur à `userData` et mettre à jour `localStorage`
    userData.push(newUser);
    localStorage.setItem("user", JSON.stringify(userData));
    console.table(userData);
  });
}

// function affichage() {
// console.log("hello world");
// userData.push(
//   { Prenom: prenom },
//   { Nom: nom },
//   { Email: email },
//   { Telephone: telephone }
// );
// if (tableau) {
//   userData.forEach((element) => {
//     let row = document.createElement("tr");
//     row.innerHTML = `<td>${element.Prenom}</td><td>${element.Nom}</td><td>${element.Email}</td><td>${element.Telephone}</td>`;
//     tableau?.appendChild(row);
//   });
// }
// }

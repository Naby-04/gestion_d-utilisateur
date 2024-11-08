const tableau = document.getElementById("table-body");
const PrenomInput = document.getElementById("user-FirstName");
const NomInput = document.getElementById("user-Name");
const EmailInput = document.getElementById("user-Email");
const TelephoneInput = document.getElementById("num-telephone");
const addBtn = document.getElementById("addbtn");
const editBtn = document.getElementById("edit");
const rowEdit = document.getElementById("editbtn");
const suppbtn = document.getElementById("supptbtn");
const Form = document.getElementsByTagName("form");

// Fournit une valeur par défaut "" si localStorage.getItem("user") renvoie null
const savedData = localStorage.getItem("users") ?? "[]"; // La valeur par défaut est un tableau vide en JSON

// Parse la chaîne JSON en un tableau d'objets
var usersData = JSON.parse(savedData);

// Appelle updateTableau() lorsque la page est chargée
document.addEventListener("DOMContentLoaded", updateTableau);

// fonction pour mettre a jour le tableau
function updateTableau() {
  // Vide le tableau
  tableau.innerHTML = "";
  console.table(usersData);
  usersData.forEach((user, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-index", index); // Assigne l'index comme identifiant unique
    row.innerHTML = `
  <!-- affichage du prenom -->
  <td>${user.Prenom}</td>
  <!-- affichage du nom -->
  <td>${user.Nom}</td>
  <!-- affichage de l'email -->
  <td>${user.Email}</td>
  <!-- affichage du numero de telephone -->
  <td>${user.Telephone}</td>
  <!-- affichage des boutons -->
  <td class="d-flex justify-content-around">
     <button onclick="editUser(${index})" id="editbtn" class="me-2" data-index="${index}">Modifier</button>
     <button onclick="suppUser(${index})" id="supptbtn" data-index="${index}">Supprimer</button>
  </td>
  `;
    tableau.appendChild(row);
  });
}

let currentEditIndex = null; // Variable globale pour stocker l'index de l'utilisateur en cours de modification

// Fonction pour ajouter ou modifier un utilisateur en fonction du contexte
Form[0].addEventListener("submit", function addUser(e) {
  e.preventDefault();

  const user = {
    Prenom: PrenomInput.value,
    Nom: NomInput.value,
    Email: EmailInput.value,
    Telephone: TelephoneInput.value,
  };

  if (currentEditIndex === null) {
    // Ajouter un nouvel utilisateur
    usersData.push(user);
  } else {
    // Mettre à jour l'utilisateur existant
    usersData[currentEditIndex] = user;
  }

  // Sauvegarder dans localStorage et mettre à jour le tableau
  localStorage.setItem("users", JSON.stringify(usersData));
  updateTableau();

  // Réinitialiser le formulaire et les boutons
  resetForm();
});

// Fonction pour remplir le formulaire avec les informations d'un utilisateur pour édition
function editUser(index) {
  const user = usersData[index];
  if (user) {
    // Remplir les champs avec les données existantes
    PrenomInput.value = user.Prenom;
    NomInput.value = user.Nom;
    EmailInput.value = user.Email;
    TelephoneInput.value = user.Telephone;

    // Sauvegarder l'index de l'utilisateur en cours de modification
    currentEditIndex = index;

    // Afficher le bouton "Enregistrer" et masquer le bouton "Ajouter"
    addBtn.style.display = "none";
    editBtn.style.display = "block";
  }
}
// Fonction pour enregistrer les modifications d'un utilisateur
function editUpdate() {
  if (currentEditIndex !== null) {
    // Mettre à jour les informations de l'utilisateur en cours de modification
    usersData[currentEditIndex] = {
      Prenom: PrenomInput.value,
      Nom: NomInput.value,
      Email: EmailInput.value,
      Telephone: TelephoneInput.value,
    };

    // Sauvegarder les modifications dans le localStorage
    localStorage.setItem("users", JSON.stringify(usersData));

    // Mettre à jour l'affichage du tableau
    updateTableau();

    // Réinitialiser le formulaire et l'affichage des boutons
    resetForm();
  }
}

// fonction pour supprimer un user
function suppUser(index) {
  usersData.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(usersData));
  updateTableau();
}

// Fonction pour réinitialiser le formulaire et les boutons
function resetForm() {
  // Réinitialiser les champs de saisie
  PrenomInput.value = "";
  NomInput.value = "";
  EmailInput.value = "";
  TelephoneInput.value = "";

  // Réinitialiser l'affichage des boutons
  addBtn.style.display = "block";
  editBtn.style.display = "none";

  // Réinitialiser l'index en cours de modification
  currentEditIndex = null;
}

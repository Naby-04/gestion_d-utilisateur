const tableau = document.getElementById("table-body");
const PrenomInput = document.getElementById("user-FirstName");
const NomInput = document.getElementById("user-Name");
const EmailInput = document.getElementById("user-Email");
const TelephoneInput = document.getElementById("num-telephone");
const addBtn = document.getElementById("add");
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

// fonction pour ajouter des utilisateurs
Form[0].addEventListener("submit", function addUser(e) {
  e.preventDefault();
  const user = {
    Prenom: PrenomInput.value,
    Nom: NomInput.value,
    Email: EmailInput.value,
    Telephone: TelephoneInput.value,
  };
  // Ajouter l'utilisateur au tableau
  usersData.push(user);
  localStorage.setItem("users", JSON.stringify(usersData));
  updateTableau();

  // Vider les champs de formulaire après ajout
  PrenomInput.value = "";
  NomInput.value = "";
  EmailInput.value = "";
  TelephoneInput.value = "";
});

// fonction pour supprimer un user
function suppUser(index) {
  usersData.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(usersData));
  updateTableau();
}

// fonction pour modifier les infos d'un utilisateur
function editUser(index) {
  console.table(usersData); // Pour voir si le tableau est rempli correctement
  console.table(usersData[index]); // Pour vérifier l'élément que tu veux modifier

  if (
    usersData[index] &&
    PrenomInput &&
    NomInput &&
    EmailInput &&
    TelephoneInput
  ) {
    PrenomInput.value = usersData[index].Prenom;
    NomInput.value = usersData[index].Nom;
    EmailInput.value = usersData[index].Email;
    TelephoneInput.value = usersData[index].Telephone;
  } else {
    console.log("Utilisateur non trouvé à l'index", index);
  }
  addBtn.style.display = "none";
  editBtn.style.display = "block";
}

// fonction pour metre a jour le tableau apres les modifications
function editUpdate(index) {
  // Mettre à jour les données dans le tableau
  usersData[index].Prenom = PrenomInput.value;
  usersData[index].Nom = NomInput.value;
  usersData[index].Email = EmailInput.value;
  usersData[index].Telephone = TelephoneInput.value;

  // Sauvegarder les modifications dans le localStorage
  localStorage.setItem("users", JSON.stringify(usersData));

  // Mettre à jour le tableau pour afficher les nouvelles données
  updateTableau();

  // Vider les champs de formulaire après ajout
  PrenomInput.value = "";
  NomInput.value = "";
  EmailInput.value = "";
  TelephoneInput.value = "";

  addBtn.style.display = "block";
  editBtn.style.display = "none";
}

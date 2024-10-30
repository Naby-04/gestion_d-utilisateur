const tableau = document.getElementById("table-body");
const prenom = document.getElementById("user-FirstName");
const nom = document.getElementById("user-Name");
const email = document.getElementById("user-Email");
const telephone = document.getElementById("num-telephone");
const addBtn = document.getElementById("add");
const editBtn = document.getElementById("edit");
const Form = document.getElementsByTagName("form");
const userData = [];

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
    userData.push(newUser);
    console.table(userData);
    userData.forEach((element) => {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${element.Prenom}</td><td>${element.Nom}</td><td>${element.Email}</td><td>${element.Telephone}</td>`;
      tableau?.appendChild(row);
    });
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

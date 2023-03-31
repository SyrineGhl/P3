const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById("submitFormLogin");
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  /**
   * RECUPERATION DES INPUT POUR FORMULAIRE DE CONNEXION
   */
  const information = new FormData(form);
  const payload = new URLSearchParams(information);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
    },

    body: payload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //entre dans la page model
      if (data.userId == 1) {
        //recupre le token dans le localStorage
        localStorage.setItem("token", data.token);
        //lien ver la page model
        location.href = "./index.html";
      } else {
        /**
         * AFFICHER SI ERREUR
         */
        error.innerText = " Erreur dans l’identifiant ou le mot de passe";
        document.getElementById("email").value = null;
        document.getElementById("password").value = null;

        //efface le message
        function msgdelet() {
          error.innerText = "";
        }
        setTimeout(msgdelet, 50000);
      }
    })

    .catch((err) => console.log(err));
});

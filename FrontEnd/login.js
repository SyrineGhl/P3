//recuperation des elements form 
const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-fetch");
const error = document.querySelector(".error");
const email = document.querySelector("#email");
const password = document.querySelector("#password");



/**
 * 
 * @param {string} eventForm connexion 
 */
async function onSubmit(eventForm) {
   eventForm.preventDefault();
            //données de l'utilisateur
            let user = {
                email: "sophie.bluel@test.tld",
                password: "S0phie" 
                // email: email.value,
                // password: password.value 
            }
            //recuperation des données API
            let response = await fetch("http://localhost:5678/api/users/login", {
               method: "POST",
               headers: {
               "Content-Type": "application/json;charset=utf-8",
               },
               body: JSON.stringify(user),
    });
    let result = await response.json();

    // si les identifiants sont justes
    if (response.status === 200) {
        localStorage.setItem("token", result.token);
        window.location.replace(`index.html`);
    // sinon, si les identifiants sont faux
    } else if (response.status === 404 || response.status === 401) {
        form.email.value = "";
        form.password.value = "";
        alert("Erreur dans l’identifiant ou le mot de passe");
    }
};
form.addEventListener("submit", onSubmit);

        
   


const buttonAll = document.getElementById("buttonAll");
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");


 /**
 * @param {String} displayWorks Recuperation de tout les projets via api avec requête GET
 */

function displayWorks() {
  fetch("http://localhost:5678/api/works").then((res) => {
  //si reponse ok  
  if (res.ok) {
    //alors données converties en json
      res.json().then((data) => {
        console.log( data);
        document.querySelector(".gallery").innerHTML = "";
        // et bouclées pour créer des cartes html avec fonction info
        for (let i = 0; i <= data.length - 1; i++) {
          generateWorks(data[i]);
        }
      });
    }
  });
}


//supprime le projet en envoyant une requete delete au serveur
function deleteProject(id) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/Json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())

    .catch((error) => console.log("il y a un probleme" + error));
}



//si clé id est dans stockage local 
if (localStorage.getItem("id")) {
  let categoryId = JSON.parse(localStorage.getItem("id"));
//elle est recupere et convertie en tableau par json.parse
  for (let id of categoryId) {
    //boucle for of pour chaque element du tableau
    deleteProject(id);
    //apres suppression de tous les projets 
    displayWorks();
    console.log("le ID ", id);
  }

  localStorage.removeItem("id");
  //cle id supprimé du stockage local avec method removeitem
}


//creation de card html puis insertion dans gallery 
function generateWorks(work) {
  const galleryCard = `
    <figure id ="A${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
          `;
  document.querySelector(".gallery").insertAdjacentHTML("beforeend", galleryCard);
}




//recuperation des données et afficher sur ma page web
fetch("http://localhost:5678/api/works").then((res) => {
//si reponse ok => res.json extrait donnée de reponse et converti en json
if (res.ok) {
    res.json()
    .then((data) => {
      //donc variable est initialisé avec la longueur des données recup
      const categoryButton = data.length;

      //recuperation de toutes les categories depuis l'api avec requete get
      fetch("http://localhost:5678/api/categories").then((res) => {
        if (res.ok) {
          res.json().then((category) => {
            //une fois que donnée recuperé= boucle pour parcourir categories
            for (let count = 0; count <= category.length - 1; count++) {
              //pour chaque categorie un new button est crée avec methode createElement
              const displayButton = document.createElement("button");
              displayButton.type = "button";
              //button configuré avec nom de categorie et class
              displayButton.innerHTML = category[count].name;
              displayButton.className = "buttonCategory";
              //fonction de rappel pour gerer les clics sur le button
              displayButton.onclick = function () {
                document.querySelector(".gallery").innerHTML = "";
                //ensuite quand le bouton est cliqué ==> boucle for utilisé pour 
                //parcourir toutes les données recuperées precedemment
                for (let i = 0; i <= categoryButton; i++) {
                  //pour chaque donnée condition if verifie si category correspond à la categorie du button cliqué
                  if (data[i]?.category.name === category[count].name) {
                    //donc si vrai affiche les info donnée data 
                    generateWorks(data[i]);
                  }
                }
              };

              //ajout de l'evenement click au bouton tous
              buttonAll.addEventListener("click", displayWorks);

              ////MASQUER LES BOUTONS EN MODE EDITION
              //si tocken present dans stockage local alors bouton masqué
              if (localStorage.getItem("token")) {
                console.log("Bienvenue Sophie");
              } else {
                const button = document.getElementById("button");
                button.appendChild(displayButton);
              }
            }

            //
          });
        }
      });

     
    });
  } 
  displayWorks();
});

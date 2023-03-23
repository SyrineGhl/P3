// CREATION DU SWITCH LOGIN / LOGOUT
//donc si token stocké  = creation de ma variable tableauid
if (localStorage.getItem("token")) {
  let tableauId = [];
  //remplacer le login par logout
  document.getElementById("login").innerText = "logout";

  //supression du bouton tous en mode edition
  document.getElementById("button").remove(buttonAll);

  //recuperation des données
  function displayModal() {
    fetch("http://localhost:5678/api/works").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //je recupere l'element du dom
          document.getElementById("modalGallery").innerHTML = "";
          //boucle pour chaque photo appelée afin d'afficher les details dans la gallery
          for (let i = 0; i <= data.length - 1; i++) {
            photos(data[i]);
          }
        });
      }
    });
  }

  //ETAPE 3.1 CREATION DES BOUTONS MODIFIER/MODE EDITION
  const modeEdition = document.createElement("button");
  modeEdition.type = "button";
  modeEdition.innerText = "Mode édition";
  modeEdition.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
  modeEdition.className = "edition";
  // personnalisation de la div bannière en mode edition
  document.getElementById("banniere").style.backgroundColor = "black";

  // insertion chaine de caractere icone du bouton modifier
  const elementModifier = createButtonModify("Modifier");

  // afterbegin = inserer apres ouverture du mode edition
  const modifier = createButtonModify("Modifier");
  // creer une fonction qui permet de generer la div avec le pinceau pen
  function createButtonModify(id) {
    return `<button id="${id}">
  <i class="fa-regular fa-pen-to-square"></i>
  <p class="modif">Modifier</p></button>`;
  }

  const modifierModal = createButtonModify("modifModal");
  const edit = document.getElementById("banniere");
  edit.appendChild(modeEdition);

  document
    .getElementById("portfolioTitle")
    // insertion de "modifier" apres le titre du portfolio
    .insertAdjacentHTML("afterend", modifierModal);
  document
    .getElementById("introArticle")
    //insertion avant l'article
    .insertAdjacentHTML("afterbegin", modifier);
  document
    .getElementById("introPhoto")
    //insertion apres la photo
    .insertAdjacentHTML("beforeend", modifier);

  displayModal();

  //CREATION DE LA MODALE
  let modal = null;

  function openModal(e) {
    //empeche l'action par defaut de l'event de clic
    e.preventDefault;
    const target = document.getElementById("modal");
    //style display affiche la modale
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    modal = target;
    modal?.addEventListener("click", closeModal);
    modal
      //empecher propagation de l'event de clic vers parent
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    //suppression des projets avant de l'afficher à l'utilisateur
    delet();
  }

  document.getElementById("modifModal").addEventListener("click", openModal);
  //fleche de retour avec id LEFT lorsquelle est click declenche openModal
  document.getElementById("left").addEventListener("click", openModal);

  //ouvrir la modal avec la touche entrée
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      openModal(e);
    }
    //empeche la propoagation de l'event de click
    const stopPropagation = function (e) {
      e.stopPropagation();
    };
  });

  //fermer modal
  function closeModal(e) {
    //prevent default = empeche l'event de se produire
    e.preventDefault;
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal?.removeEventListener("click", closeModal);
  }
  document
    .getElementById("buttonCloseModal")
    .addEventListener("click", closeModal);
  document
    .getElementById("buttonAddPhoto")
    .addEventListener("click", closeModal);

  //fermer modal avec touche esc
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
  });

  // ouverture de la page suivante pour ajouter photo

  let buttonAddPhoto = null;
  //ouvre modal
  function openModalPageAdd(e) {
    e.preventDefault;
    const modal = document.getElementById("addModal");
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    buttonAddPhoto = modal;
    buttonAddPhoto?.addEventListener("click", closeModal);
    buttonAddPhoto
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    //l'affichage de category null
    const category = document.getElementById("categorie");
    category.value = null;
    //ferme le modal  quand on click d'hors
  }

  document
    .getElementById("buttonAddPhoto")
    .addEventListener("click", openModalPageAdd);

  //ouvre modal avec touche entrée
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      openModalPageAdd(e);
    }
  });

  //pour fermer le model quand en clique dessus

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  ////FERMER le modal de ajout photo ///
  function closeModalAdd(e) {
    e.preventDefault;
    const buttonAddPhoto = document.getElementById("addModal");
    buttonAddPhoto.style.display = "none";
    buttonAddPhoto.setAttribute("aria-hidden", "true");
    buttonAddPhoto?.removeEventListener("click", closeModalAdd);

    // suprime les données quand on ferme
    deleteWhenClose();

    //recuperer message d'erreur
    document.getElementById("messageError").innerHTML = "";
  }
  document
    .getElementById("btnCloseAddPhoto")
    .addEventListener("click", closeModalAdd);
  //la fleche de retour
  document.getElementById("left").addEventListener("click", closeModalAdd);

  const closeModalbyClick = document.getElementById("addModal");

  // Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
  window.addEventListener("click", function (event) {
    if (event.target == closeModalbyClick) {
      closeModalbyClick.style.display = "none";
    }
  });

  //fermer modal avec touche esc

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModalAdd(e);
    }
  });

  //fonction qui genere un html figure contenant image+ bouton de suppression + icone poubelle
  function photos(works) {
    const modalPhoto = `
      <figure id ="B${works.id}">
   
                <div id="repertoire_modal" class="modalPhotoGallery">
      <img src="${works?.imageUrl} "crossOrigin="anonymous">
              <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
             </div>
                  <figcaption>éditer</figcaption>
      </figure>
            `;

    document
      .getElementById("modalGallery")
      .insertAdjacentHTML("beforeend", modalPhoto);
  }
  //telecharger les photos
  function download() {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageDownload = reader.result;
      const photo = document.getElementById("downloadImg");
      document.getElementById("photoAdd").style.display = null;
      photo.style.backgroundImage = `url(${imageDownload})`;
      document.getElementById("containerModal").style.display = "none";
    });

    reader.readAsDataURL(this.files[0]);
  }

  document.getElementById("addImg").addEventListener("change", download);

  // ETAPE 3.2 SUPPRESSION
  //fonction delet = utilisation dune boucle pour parcourir les elements du tableau data
  function delet() {
    fetch("http://localhost:5678/api/works").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //pour chaque element du tableau boucle for pour supprimer les projets
          //fonction delet = cliquer sur element html correspondant à l'ID
          for (
            let parcourirData = 0;
            parcourirData <= data.length;
            parcourirData++
          ) {
            function deletAll() {
              //pour acceder à la propriete "id" de l'element data dans la boucle
              data[parcourirData].id;
              //?= permet d'eviter une erreur si valeur du parametre est undefined
              console.log(`${data[parcourirData]?.id}`);

              console.log(data[parcourirData].id);

              //etape = suppression des elements html => stock id du projet dans un tableau et stockage local
              //"b" pour ID afin d'identifier l'element html d'une maniere specifique
              const elementID = document.getElementById(
                `B${data[parcourirData].id}`
              );
              //suppression de cet element
              elementID?.remove();
              //"a" pareil que le prefixe b
              const elementID2 = document.getElementById(
                `A${data[parcourirData].id}`
              );

              elementID2?.remove();
              //ajout de l'id du projet au tableauID qui stock tous les id de projet supprimé pour les
              //restaurer si necessaire
              tableauId.push(data[parcourirData].id);
              console.log(tableauId);
              //tableau converti en json  et stocké dans le stockage local
              localStorage.setItem("id", JSON.stringify(tableauId));
            }

            const id = document.getElementById(`${data[parcourirData]?.id}`);
            if (id) {
              id.addEventListener("click", deletAll);
            }
          }
          //identifiant du projet à supprimer via methode delete
          function deleteProject(id) {
            fetch("http://localhost:5678/api/works/" + id, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())

              .catch((error) => console.log("il y a un probleme" + error));
          }
          //stockage des données locales du navigateur
          //condition verifie si clé id existe
          if (localStorage.getItem("id")) {
            let categoryID = JSON.parse(localStorage.getItem("id"));
            //boucle for of pour parcourir tableau categoryID
            //pour chaque identifiant=> fonction deleteproject supprime
            // puis displaywork rafraichi l'affichage de la liste de projet
            for (let id of categoryID) {
              deleteProject(id);
              displayWorks();
              console.log("ID", id);
            }

            localStorage.removeItem("id");
            console.log("delet");
          }
        });
      }
    });
  }

  delet();

  //ETAPE 3.3 + ETAPE 3.4 Envoi données API

  document.getElementById("addModal").addEventListener("submit", (e) => {
    e.preventDefault();
    const photo = document.getElementById("addImg");
    const category = document.getElementById("categorie");
    const title = document.getElementById("titleModal");

    // message d'errreur est d'affiché si le formulaire est pas rempli
    if (photo.value === "" || title.value === "" || category.value === "") {
      document.getElementById("messageError").innerHTML =
        "Veuillez remplir tous les champs";
    } else {
      document.getElementById("messageError").innerHTML = "";

      fetch("http://localhost:5678/api/categories").then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((categorydata) => {
            for (let i = 0; i <= categorydata.length - 1; i++) {
              if (category.value === categorydata[i].name) {
                categorydata[i].name = categorydata[i].id;
                console.log(categorydata[i].id);
                console.log(category.value);

                const image = document.getElementById("addImg").files[0];

                let token = localStorage.getItem("token");
                console.log(`Bearer  ${token}`);
                const titre = document.getElementById("titleModal").value;

                //Taille de la photo
                if (image.size < 4 * 1048576) {
                  const formData = new FormData();
                  formData.append("image", image);
                  formData.append("title", titre);
                  formData.append("category", categorydata[i].id);

                  //ajout de new projet à l'api
                  //donnéesdu projet à ajouter
                  const newProjectAdd = async (data) => {
                    try {
                      const requete = await fetch(
                        "http://localhost:5678/api/works",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                          },
                          body: data,
                        }
                      );
                      //si reponse ok
                      if (requete.status === 201) {
                        document.querySelector(".gallery").innerHTML = "";
                        document.getElementById("model_gallery").innerHTML = "";
                        //fonction appelé à reafficher display modal
                        displayWorks();
                        displayModal();
                      } else {
                        throw "Un problème est survenu";
                      }
                      //en cas d'erreur fonction catch affiche errreur
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  newProjectAdd(formData);
                } else {
                  document.getElementById("messageError").innerHTML =
                    "la taille de la photo est plus de 4mo  ";
                  photo.value = null;
                  // supression des données quand on ferme
                  document.getElementById("containerModal").style.display =
                    null;
                  document.getElementById("photoAdd").style.display = "none";
                }
                deleteWhenClose();
              }
            }
          });
        }
      });
    }
  });

  //bouton = publier les changements en mode edition
  const btnPublier = document.createElement("button");
  btnPublier.type = "button";

  const postChange = `
  <p>publier les changements</p>  `;
  btnPublier.insertAdjacentHTML("beforeend", postChange);
  btnPublier.className = "publier";

  btnPublier.onclick = function () {
    //la fonction
  };
  const banner = document.getElementById("banniere");
  banner.appendChild(btnPublier);
}
//sortir de la page modal
document.getElementById("login").addEventListener("click", function () {
  localStorage.clear();
});

function deleteWhenClose() {
  // supression des données quand on les ferme
  document.getElementById("containerModal").style.display = null;
  document.getElementById("photoAdd").style.display = "none";
  //suprime les données des titre
  const addTitleModal = document.getElementById("titleModal");
  addTitleModal.value = null;

  //suprime les url des photos
  const deleteUrlPhoto = document.getElementById("addImg");
  deleteUrlPhoto.value = null;

  //suprime les donnees des categories
  const category = document.getElementById("categorie");
  category.value = null;
}

//************** Condition Formulaire POST*********/
const inputFile = document.getElementById("addImg");
let titleSelected = false;
let categorySelected = false;
let imageSelected = false;
let iCanSubmit = false;

inputFile.addEventListener("change", () => {
  const errorImg = document.getElementById("messageError");
  const image = inputFile.files[0];

  if (image === null || image === undefined) {
    errorImg.textContent = "Veuillez selectionner une image";
    imageSelected = false;
  } else {
    errorImg.textContent = "";
    imageSelected = true;
  }
});

const editSection = document.querySelector("#addModal");

editSection.addEventListener("input", () => {
  const editTitle = document.querySelector("#titleModal");
  const titleError = document.querySelector("#ErrorTitleSubmit");
  const categoryError = document.querySelector("#ErrorCategorySubmit");
  const submitForm = document.querySelector(
    "#addModal > div.modalContainer.js_modal_stop > section.modalBody > div.modal_ajout_valider > button[type=submit]"
  );

  iCanSubmit = false;
  titleSelected = false;
  categorySelected = false;

  submitForm.style.background = "grey";

  let category = document.querySelector("#categorie").value;
  const title = editTitle.value;

  if (title.length < 1) {
    titleError.textContent = "Ajoutez un titre";
    titleSelected = false;
  } else {
    titleError.textContent = "";
    titleSelected = true;
  }

  if (category === "") {
    categoryError.textContent = "Choisissez une catégorie";
    categorySelected = false;
  } else {
    categoryError.textContent = "";
    categorySelected = true;
  }

  if (titleSelected && categorySelected && imageSelected) {
    submitForm.style.background = "#1d6154";
    iCanSubmit = true;
  }
});

//******* BOUTON POUR SUPPRIMER LA GALERIE**************/

// Récupérez le bouton "Supprimer la galerie"
const deleteButton = document.querySelector(".deleteGaleryModal");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton
deleteButton.addEventListener("click", function () {
  console.log("Le bouton 'Supprimer la galerie' a ete cliqué !");

  // Récupérez les éléments à supprimer
  const modalPhotos = document.querySelectorAll("#modalGallery figure");
  const portfolioPhotos = document.querySelectorAll("#portfolio figure");

  // Parcourez les éléments et supprimez-les un par un
  modalPhotos.forEach((photo) => photo.remove());
  portfolioPhotos.forEach((photo) => photo.remove());
});

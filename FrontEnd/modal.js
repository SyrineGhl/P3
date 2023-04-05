// CREATION DU SWITCH LOGIN / LOGOUT
//donc si token stocké  = creation de ma variable tableauid, pour le login logout

if (localStorage.getItem("token")) {
  let tableauId = [];
  //remplacer le login par logout
  document.getElementById("login").innerText = "logout";

  //supression du bouton tous en mode edition
  document.getElementById("button").remove(buttonAll);

  //permet de récupérer des données à partir de mon API
  // puis les afficher dans la galerie d'images du DOM
  function fetchWorks() {
    fetch("http://localhost:5678/api/works").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //je recupere l'element du dom
          //boucle pour chaque photo appelée afin d'afficher les details dans la gallery
          for (let i = 0; i <= data.length - 1; i++) {
            photos(data[i]);
          }
        });
      }
    });
  }

  // CREATION DES BOUTONS MODIFIER/MODE EDITION
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

  // CREATION DE LA MODALE
  let modal = null;

  function openModal(e) {
    e.preventDefault();

    fetchWorks();

    //empeche l'action par defaut de l'event de clic
    const target = document.getElementById("modal");
    //style display affiche la modale
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    modal = target;
    let modal_gallery_container = document.querySelector(
      ".modal-gallery-container"
    );
    modal_gallery_container.innerHTML = "";
    const fa_solid_icon = document.createElement("i");
    fa_solid_icon.setAttribute(
      "class",
      "fa-solid fa-arrows-up-down-left-right"
    );
    modal_gallery_container.appendChild(fa_solid_icon);
    const titleModalFirst = document.createElement("h2");
    titleModalFirst.innerText = "Galerie photo";
    titleModalFirst.setAttribute("class", "titleModalFirst");
    modal_gallery_container.appendChild(titleModalFirst);
    const modalGallery = document.createElement("div");
    modalGallery.setAttribute("id", "modalGallery");
    modal_gallery_container.appendChild(modalGallery);
    const button = document.createElement("div");
    button.setAttribute("class", "button");
    const buttonAddPhoto = document.createElement("button");
    buttonAddPhoto.setAttribute("id", "buttonAddPhoto");
    buttonAddPhoto.setAttribute("class", "buttonAddPhoto");
    buttonAddPhoto.innerText = " Ajouter une photo";
    button.appendChild(buttonAddPhoto);
    const buttonDeleteGalleryModal = document.createElement("button");
    buttonDeleteGalleryModal.setAttribute("class", "deleteGaleryModal");
    buttonDeleteGalleryModal.innerText = "Supprimer la galerie";
    button.appendChild(buttonDeleteGalleryModal);
    modal_gallery_container.append(button);

    document
      .getElementById("buttonCloseModal")
      .addEventListener("click", closeModal);

    document
      .querySelector("#buttonAddPhoto")
      .addEventListener("click", openModalPageAdd);

    //******* BOUTON POUR SUPPRIMER LA GALERIE**************/

    // "Alert" de suppression du bouton avec la function confirm cree par js
    buttonDeleteGalleryModal.addEventListener("click", function () {
      if (confirm("Vous en êtes sûr?")) {
        // Récupérez les éléments à supprimer
        const modalPhotos = document.querySelectorAll("#modalGallery figure");
        const portfolioPhotos = document.querySelectorAll("#portfolio figure");

        // Parcourez les éléments et supprimez-les un par un
        modalPhotos.forEach((photo) => photo.remove());
        portfolioPhotos.forEach((photo) => photo.remove());
        delet();
      }
    });

    //suppression des projets avant de l'afficher à l'utilisateur
    delet();
  }

  modal = document.getElementById("modal");

  document.getElementById("modifModal").addEventListener("click", openModal);

  //fermer modal
  function closeModal(e) {
    //prevent default = empeche l'event de se produire
    e.preventDefault();
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal?.removeEventListener("click", closeModal);

    let modal_gallery_container = document.querySelector(
      ".modal-gallery-container"
    );
    // let add_photo_modal = document.querySelector(".modal-gallery-container");

    //modal_gallery_container.innerHTML = "";
    window.location.reload();
  }

  //fermer modal avec touche esc
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
  });

  document.addEventListener(
    "click",
    function (e) {
      if (e.target.className === "modal") {
        closeModal(e);
      }
    },
    false
  );

  // ouverture de la page suivante pour ajouter photo

  let buttonAddPhoto = null;
  //ouvre modal
  function openModalPageAdd(e) {
    e.preventDefault();
    buttonAddPhoto = modal;

    console.log("buttonAddPhoto ", buttonAddPhoto);
    

    let add_photo_modal = document.querySelector(".modal-gallery-container");
    add_photo_modal.innerHTML = "";

    let form = document.createElement("form");
    form.setAttribute("name", "form_ajout");
    form.setAttribute("method", "post");
    form.setAttribute("action", "#");
    form.setAttribute("enctype", "multipart/form-data");
    add_photo_modal.appendChild(form);

    let modalTitle = document.createElement("h2");
    modalTitle.setAttribute("class", "modalTitle");
    modalTitle.innerText = "Ajout photo";
    form.appendChild(modalTitle);

   
    let modalAllGallery = document.createElement("div");
    modalAllGallery.setAttribute("id", "modalAllGallery");

    let addModalDownload = document.createElement("div");
    addModalDownload.setAttribute("class", "addModalDownload");
    modalAllGallery.appendChild(addModalDownload);

    let photoAdd = document.createElement("div");
    photoAdd.setAttribute("id", "photoAdd");
    photoAdd.setAttribute("style", "display:none");
    addModalDownload.appendChild(photoAdd);

    let downloadImg = document.createElement("div");
    downloadImg.setAttribute("id", "downloadImg");
    photoAdd.appendChild(downloadImg);

    let containerModal = document.createElement("div");
    containerModal.setAttribute("id", "containerModal");
    containerModal.setAttribute("style", "display:contents");
    addModalDownload.appendChild(containerModal);

    let img = document.createElement("img");
    img.setAttribute("class", "photo");
    img.setAttribute("src", "./assets/images/photo.PNG");
    img.setAttribute("alt", "image");
    containerModal.appendChild(img);

    let inputFile = document.createElement("input");
    inputFile.setAttribute("name", "image");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("id", "addImg");
    inputFile.setAttribute("accept", "image/png , image/jpg ");
    inputFile.setAttribute("class", "buttonImgInput");
    containerModal.appendChild(inputFile);

    let addPhotoModal = document.createElement("button");
    addPhotoModal.setAttribute("id", "add");
    addPhotoModal.setAttribute("class", "addPhotoModal");
    addPhotoModal.innerText = "+ Ajouter photo";
    containerModal.appendChild(addPhotoModal);

    let p = document.createElement("p");
    p.innerText = "jpg, png : 4mo max";
    containerModal.appendChild(p);

    let messageError = document.createElement("label");
    messageError.setAttribute("id", "messageError");
    modalAllGallery.appendChild(messageError);

    let inputTitleCategory = document.createElement("div");
    inputTitleCategory.setAttribute("class", "inputTitleCategory");
    modalAllGallery.appendChild(inputTitleCategory);

    let title = document.createElement("label");
    title.innerText = "Titre";
    inputTitleCategory.appendChild(title);

    let titleModal = document.createElement("input");
    titleModal.setAttribute("name", "title");
    titleModal.setAttribute("id", "titleModal");
    titleModal.setAttribute("class", "titleModal");
    titleModal.setAttribute("required", "true");
    inputTitleCategory.appendChild(titleModal);

    let ErrorTitleSubmit = document.createElement("span");
    ErrorTitleSubmit.setAttribute("id", "ErrorTitleSubmit");
    ErrorTitleSubmit.setAttribute("class", "errormsg");
    inputTitleCategory.appendChild(ErrorTitleSubmit);

    //Creation des categories
    let _inputTitleCategory = document.createElement("div");
    _inputTitleCategory.setAttribute("class", "inputTitleCategory");
    modalAllGallery.appendChild(_inputTitleCategory);

    let categoryLabel = document.createElement("label");
    categoryLabel.innerText = "Catégorie";
    _inputTitleCategory.appendChild(categoryLabel);

    let selectCategory = document.createElement("select");
    selectCategory.setAttribute("name", "category");
    selectCategory.setAttribute("id", "categorie");
    selectCategory.setAttribute("class", "inputTitleCategoryChoice");
    _inputTitleCategory.appendChild(selectCategory);

    let ErrorCategorySubmit = document.createElement("span");
    ErrorCategorySubmit.setAttribute("id", "ErrorCategorySubmit");
    ErrorCategorySubmit.setAttribute("class", "errormsg");
    selectCategory.appendChild(ErrorCategorySubmit);

    let Objets = document.createElement("option");
    Objets.setAttribute("value", "Objets");
    Objets.innerText = "Objets";
    selectCategory.appendChild(Objets);

    let Appartements = document.createElement("option");
    Appartements.setAttribute("value", "Appartements");
    Appartements.innerText = "Appartements";
    selectCategory.appendChild(Appartements);

    let HotelRes = document.createElement("option");
    HotelRes.setAttribute("value", "Hotels & restaurants");
    HotelRes.innerText = "Hotels & restaurants";
    selectCategory.appendChild(HotelRes);

    let buttonValidate = document.createElement("div");
    buttonValidate.setAttribute("class", "buttonValidate");
    modalAllGallery.appendChild(buttonValidate);

    let btnValider = document.createElement("button");
    btnValider.setAttribute("type", "submit");
    btnValider.setAttribute("id", "btnValider");
    btnValider.setAttribute("class", "addPhotoModal valider");
    btnValider.innerText = "Valider";
    buttonValidate.appendChild(btnValider);

    form.appendChild(modalAllGallery);

    document.querySelector("#addImg").addEventListener("change", download);

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

    buttonAddPhoto?.addEventListener("click", closeModal);

    buttonAddPhoto
      .querySelector(".js_modal_stop")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    //l'affichage de category null
    const category = document.getElementById("categorie");
    category.value = null;

    //Envoi données API

    document
      .querySelector(".addPhotoModal.valider")
      .addEventListener("click", (e) => {
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

                      document.querySelector("#modal").innerHTML = "";

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
                            document.getElementById("model_gallery").innerHTML =
                              "";

                            //fonction appelée à reafficher display modal
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
                      document.getElementById("photoAdd").style.display =
                        "none";
                    }
                  }
                }
              });
            }
          });
        }
      });
  }

  //ouvre modal avec touche entrée
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      openModal(e);
    }
  });

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  // Fermer la modale d'ajout photo
  function closeModalAdd(e) {
    e.preventDefault();
    const buttonAddPhoto = document.getElementById("modal");
    buttonAddPhoto.style.display = "none";
    buttonAddPhoto.setAttribute("aria-hidden", "true");
    buttonAddPhoto?.removeEventListener("click", closeModalAdd);

    //recuperer message d'erreur
    const msgErr = document.getElementById("messageError");
    if (msgErr != null) {
      msgErr.innerHTML = "";
    }
  }

  // la fleche de retour
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

  // SUPPRESSION
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

              if (confirm("Voulez vous supprimer cette photo ? ")) {
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

document.querySelector(".arrow-modal").addEventListener("click", (e) => {
  openModal(e);
});

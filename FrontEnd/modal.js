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
          document.getElementById("modalGallery").innerHTML = "";
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
      .addEventListener("click", openModalPageAdd); // je dois supprimer le contenue de ma modale et ajouter l'ajout photo

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
    //"?" Veut dire = raccourci pour vérifier si l'élément modal n'est pas nul
    modal?.addEventListener("click", closeModal);
    modal
      //empecher propagation de l'event de clic vers parent
      .querySelector(".js_modal_stop")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    //suppression des projets avant de l'afficher à l'utilisateur
    delet();
  }

  document.getElementById("modifModal").addEventListener("click", openModal);
  //fleche de retour avec id LEFT lorsquelle est click declenche openModal
  // document.getElementById("left").addEventListener("click", openModal);
  //ouvrir la modal avec la touche entrée

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
    let add_photo_modal = document.querySelector(".modal-gallery-container");

    modal_gallery_container.innerHTML = "";
    add_photo_modal.innerHTML = "";
  }

  //fermer modal avec touche esc
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
  });

  // cacher la modal gallery

  function closeGalleryModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    const modalAddPhoto = document.getElementById("addModal");
    modalAddPhoto.style.display = "flex";
  }

  // ouverture de la page suivante pour ajouter photo

  let buttonAddPhoto = null;
  //ouvre modal
  function openModalPageAdd(e) {
    e.preventDefault();
    //closeGalleryModal();
    // je refais pareil que sur la p
    /**const modal = document.getElementById("addModal");
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");*/
    buttonAddPhoto = modal;
    //(fonction utilitaire)
    const createElem = (e) => {
      return document.createElement(e);
    };
    const Append = (parent, child) => {
      return parent.appendChild(child);
    };
    const setAttr = (element, attr, value) => {
      return element.setAttribute(attr, value);
    };
    const setText = (element, value) => {
      return (element.innerText = value);
    };

    let add_photo_modal = document.querySelector(".modal-gallery-container");
    add_photo_modal.innerHTML = "";
    // creer element form ici avec les enctype method name... une fois creer à ajouter à add photo modal
    
    /*  <form
    name="form_ajout"
    method="post"
    action="#"
    enctype="multipart/form-data"
  > */ 
  // tous les element en dessous faut qu'ils appartiennent à l'element form
  // ensuite on appendChild tous les element en dessous dans modal gallery container (add_photo_modal)
  
    let modalTitle = createElem("h2");
    setAttr(modalTitle, "class", "modalTitle");
    setText(modalTitle, "Ajout photo");
    Append(add_photo_modal, modalTitle);
// reecrire correction tout les append et les setAttr et setText => appendChild setAttribute et innerText
    let modalAllGallery = createElem("div");
    setAttr(modalAllGallery, "id", "modalAllGallery");

    let addModalDownload = createElem("div");
    setAttr(addModalDownload, "class", "addModalDownload");
    modalAllGallery.appendChild(addModalDownload);

    let photoAdd = createElem("div");
    setAttr(photoAdd, "id", "photoAdd");
    setAttr(photoAdd, "style", "display:none");
    Append(addModalDownload, photoAdd);

    let downloadImg = createElem("div");
    setAttr(downloadImg, "id", "downloadImg");
    Append(photoAdd, downloadImg);

    let containerModal = createElem("div");
    setAttr(containerModal, "id", "containerModal");
    setAttr(containerModal, "style", "display:contents");
    Append(addModalDownload, containerModal);

    let img = createElem("img");
    setAttr(img, "class", "photo");
    setAttr(img, "src", "./assets/images/photo.PNG");
    setAttr(img, "alt", "image");
    Append(containerModal, img);

    let inputFile = createElem("input");
    setAttr(inputFile, "name", "image");
    setAttr(inputFile, "type", "file");
    setAttr(inputFile, "id", "addImg");
    setAttr(inputFile, "accept", "image/png , image/jpg ");
    setAttr(inputFile, "class", "buttonImgInput");
    Append(containerModal, inputFile);

    let addPhotoModal = createElem("button");
    setAttr(addPhotoModal, "id", "add");
    setAttr(addPhotoModal, "class", "addPhotoModal");
    setText(addPhotoModal, "+ Ajouter photo");
    Append(containerModal, addPhotoModal);

    let p = createElem("p");
    setText(p, "jpg, png : 4mo max");
    Append(containerModal, p);

    let messageError = createElem("label");
    setAttr(messageError, "id", "messageError");
    Append(modalAllGallery, messageError);

    let inputTitleCategory = createElem("div");
    setAttr(inputTitleCategory, "class", "inputTitleCategory");
    Append(modalAllGallery, inputTitleCategory);

    let title = createElem("label");
    setText(title, "Titre");
    Append(inputTitleCategory, title);

    let titleModal = createElem("input");
    setAttr(titleModal, "name", "title");
    setAttr(titleModal, "id", "titleModal");
    setAttr(titleModal, "class", "titleModal");
    setAttr(titleModal, "required", "true");
    Append(inputTitleCategory, titleModal);

    let ErrorTitleSubmit = createElem("span");
    setAttr(ErrorTitleSubmit, "id", "ErrorTitleSubmit");
    setAttr(ErrorTitleSubmit, "class", "errormsg");
    Append(inputTitleCategory, ErrorTitleSubmit);

    //Creation des categories
    let _inputTitleCategory = createElem("div");
    setAttr(_inputTitleCategory, "class", "inputTitleCategory");
    Append(modalAllGallery, _inputTitleCategory);

    let categoryLabel = createElem("label");
    setText(categoryLabel, "Catégorie");
    Append(_inputTitleCategory, categoryLabel);

    let selectCategory = createElem("select");
    setAttr(selectCategory, "name", "category");
    setAttr(selectCategory, "id", "categorie");
    setAttr(selectCategory, "class", "inputTitleCategoryChoice");
    Append(_inputTitleCategory, selectCategory);

    let ErrorCategorySubmit = createElem("span");
    setAttr(ErrorCategorySubmit, "id", "ErrorCategorySubmit");
    setAttr(ErrorCategorySubmit, "class", "errormsg");
    Append(selectCategory, ErrorCategorySubmit);

    let Objets = createElem("option");
    setAttr(Objets, "value", "Objets");
    setText(Objets, "Objets");
    Append(selectCategory, Objets);

    let Appartements = createElem("option");
    setAttr(Appartements, "value", "Appartements");
    setText(Appartements, "Appartements");
    Append(selectCategory, Appartements);

    let HotelRes = createElem("option");
    setAttr(HotelRes, "value", "Hotels & restaurants");
    setText(HotelRes, "Hotels & restaurants");
    Append(selectCategory, HotelRes);

    let buttonValidate = createElem("div");
    setAttr(buttonValidate, "class", "buttonValidate");
    Append(modalAllGallery, buttonValidate);

    let btnValider = createElem("button");
    setAttr(btnValider, "type", "submit");
    setAttr(btnValider, "id", "btnValider");
    setAttr(btnValider, "class", "addPhotoModal valider");
    setText(btnValider, "Valider");
    Append(buttonValidate, btnValider);

    Append(add_photo_modal, modalAllGallery);

    document.querySelector("#addImg").addEventListener("change", download);

    //************** Condition Formulaire POST*********/
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

    buttonAddPhoto?.addEventListener("click", closeModal);

    buttonAddPhoto
      .querySelector(".js_modal_stop")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    //l'affichage de category null
    const category = document.getElementById("categorie");
    category.value = null;
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

  // delet();

  //Envoi données API

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
                        //fonction appelée à reafficher display modal
                        displayWorks();
                        fetchWorks();
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
  //document.getElementById("containerModal").style.display = null;
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

  // submitForm.style.background = "grey";

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
    0;
    iCanSubmit = true;
  }
});

document.querySelector(".add-modal").addEventListener("click", (e) => {
  closeModalAdd(e);
  openModal(e);
});

document.querySelector(".arrow-modal").addEventListener("click", (e) => {
  closeModal(e);
});

document.querySelector("#btnCloseAddPhoto").addEventListener("click", (e) => {
  closeModal(e);
  closeModalAdd(e);
});

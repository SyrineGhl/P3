// récupération API
let works;

fetch("http://localhost:5678/api/works")
   .then(function (result) {
      if (result.ok) {
         return result.json();
      } else {
         console.log("ERREUR");
      }
   })

   //traiter le tableau de projet pour afficher dans les projets dans le code html
   .then(function (data) {
      works = data;
      generateWorks(works);
   });

//Rendre la page html en dynamique 
function generateWorks(works) {
   //boucle tableau de projet
   for (let i = 0; i < works.length; i++) {
      const project = works[i];
      ///pour chaque projet creer le DOM html 
      const sectionFigure = document.querySelector(".gallery");
      // crer la balise à celle du projet
      const workElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      //recuperer source de l'image et description
      imageElement.src = project.imageUrl;
      imageElement.alt = project.title;
      //represente l'attribut pour les requetes d'image
      imageElement.crossOrigin = "";
      const titleElement = document.createElement("figcaption");
      titleElement.innerHTML = project.title;
      //ajout du nouvel enfant à la fin de la liste des enfants de l'élément parent.
      sectionFigure.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement);
   }
   console.log(works);
}

// recuperation des filtres
fetch("http://localhost:5678/api/categories")
   .then(response => response.json())
   .then(data => generateFilters(data))
   .catch(error => console.error(error));


function generateFilters(filters) {
   console.log(filters)
}

function filterWorks(categoryId) {
   console.log(works)
   //je vide l'HTML de la div .gallery 
   document.querySelector(".gallery").innerHTML = "";
   const filteredWorks = works.filter((work) => work.category.id === categoryId);
   console.log(filteredWorks);
   generateWorks(filteredWorks);
}


function deleteWorks() {
   //j'ajoute l'élément de la classe CSS gallery 
   const gallery = document.getElementsByClassName("gallery").item(0);
   console.log(gallery);
   //suppression de tout les enfants de cet élément (boucle WHILE)
   // tant que la galerie a des enfants je remove le premier enfant de ma gallery
   while (gallery.hasChildNodes()) {
      gallery.removeChild(gallery.firstChild);
   }
};

/**
 * @param {String} categoryID Ajout de tous les projets dans la div Gallery
 */
function displayWorks(categoryID) {
   console.log (categoryID)
   // récupération des projets sur l'API
   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         console.log(response);
         if (response.ok) {
            return response.json();
         }
      })

      .then(function (data) {
         // une fois qu'on a les données de l'API
         console.log(data);
         //ajout des works issus de l'API (boucle sur les données de l'API)
         //pour chaque donnée de l'API...
         setWorks(data, categoryID);
      });
}

/**
 * @param {String} data Récupération des projets sur l'API
 * @param {String} categoryID Filtrage des projets en fonction de leur catégorie
 */
function setWorks(data, categoryID) {
   console.log(categoryID);

   let dataFilter = data;
   if (categoryID > 0) {
      dataFilter = data.filter((elt) => elt["categoryId"] == categoryID);
   }

   for (let work of dataFilter) {

      //... on crée un noeud de type figure
      let newFigure = document.createElement("figure");

      // on créé une balise de type img
      let newImg = document.createElement("img");
      newImg.setAttribute("crossorigin", "anonymous");
      newImg.setAttribute("src", work.imageUrl);
      newImg.alt = work.title;

      // on crée une balise de type figcaption
      let newCaption = document.createElement("figcaption");
      newCaption.innerText = work.title;

      // on met en place la structure DOM des différentes balises crées ci dessus
      newFigure.appendChild(newImg);
      newFigure.appendChild(newCaption);

      const gallery = document.getElementsByClassName("gallery").item(0);

      // on ajoute cet élement au DOM dans la DIV gallery
      gallery.appendChild(newFigure);
   }
};

function displayButton() {
   // récupération des catégories sur l'API
   fetch("http://localhost:5678/api/categories")
      .then(function (response) {
         console.log(response);
         if (response.ok) {
            return response.json();
         }
      })

      .then(function (data) {
         console.log (data)
         //boutton TOUS
         data.unshift({
            id: 0,
            name: 'Tous',
            ids: [1, 2, 3]
         });
         console.log(data);

         //récupération de l'élément avec l'ID CSS portfolio
         const portfolio = document.getElementById("portfolio");
         console.log(portfolio);

         //on crée un noeud de type ul avec une classe filtres 
         let divFiltres = document.createElement("div");
         divFiltres.classList.add("filtres");


         //ajout des catégories issus de l'API (boucle sur les données de l'API)
         //pour chaque donnée de l'API...
         for (let categorie of data) {
            // on créé une balise de type li
            let categoryButton = document.createElement("button");
            categoryButton.innerText = categorie.name;
            categoryButton.setAttribute('id', 'btn-filtre-' + categorie.id);
            categoryButton.value = categorie.id;
            categoryButton.addEventListener("click", function (event) {
               deleteWorks();
               if (event.target.value === 0) {
                  displayWorks()
               } else {
                  displayWorks(event.target.value);
               };
            });

            // on met en place la structure DOM des différentes balises crées ci dessus
            divFiltres.appendChild(categoryButton);
         };

         // récupération de l'élément avec la class CSS gallery
         const gallery = document.getElementsByClassName("gallery").item(0);

         // on ajoute cet élement au DOM dans la section portfolio
         portfolio.insertBefore(divFiltres, gallery);
      });
};
//execution des boutons
displayButton();


//creation du bouton Log Out
function logout() {
   const log = document.querySelector('#login');

   log.innerText = "logout";

   log.addEventListener("click", function () {
      localStorage.clear();
   });
};

//creation des elements en mode edition => personalisation dans le css
function modeEdition() {
   const body = document.querySelector('body');
   console.log(body);

   const banniere = document.createElement('divBanniere');
   //prepend = ajout en tant que premier enfant d'un element parent
   body.prepend(banniere);
   const edit = document.createElement('p');
   edit.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> Mode édition';


   const publier = document.createElement('buttonPublier');
   publier.setAttribute('id', 'buttonPublier');
   publier.innerText = 'publier les changements';

   banniere.append(edit);
   banniere.appendChild(publier);
};

//Affichage du bouton modifier dans l'introduction
function buttonModifIntro() {
   const modifier = document.createElement('a');
   modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';

   const articleIntro = document.querySelector('#introduction > article');
   console.log(articleIntro);

   const titleIntro = document.querySelector('#introduction > article > h2');
   articleIntro.prepend(modifier);
};

//Afficher le bouton modifier pour la photo
function buttonModifPhoto() {
   const modifier = document.createElement('a');
   modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';

   const introFigure = document.querySelector('#introduction > figure');

   introFigure.appendChild(modifier);

   const figureImgIntro= document.querySelector('#introduction > figure > img');
 
};

//Affichage du bouton modifier pour la gallerie
function buttonModifGallery() {
   let titleGallery = document.createElement('div');
   titleGallery.setAttribute('id', 'titlework');


   const portfolio = document.getElementById('portfolio');
   //prepend = insère éléments HTML spécifiés en tant que premiers enfants de l'élément HTML 
   portfolio.prepend(titleGallery);

   const modifier = document.createElement('a');
   modifier.classList.add("modifierModalA");
   modifier.setAttribute("href", "#modal");
   modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';


   const title = document.querySelector('#portfolio > h2');

   titleGallery.append(title);
   titleGallery.appendChild(modifier);
};

//Affichage des diverses fonctions si on est correctement connecté
function token() {
   // Vérification de la récupération du token
   localStorage.getItem("token");
   console.log(localStorage);

   // Si le token est récupéré
   if (localStorage.getItem("token")) {
      logout();
      modeEdition();
      buttonModifIntro();
      buttonModifPhoto();
      buttonModifGallery();
   };
};

token();

function worksModal() {
   fetch("http://localhost:5678/api/works")
      .then(function (response) {
         console.log(response);
         if (response.ok) {
            return response.json();
         }
      })

      .then(function (data) {
         // une fois qu'on a les données de l'API
         console.log(data);

         for (let work of data) {

            const modalGallery = document.getElementById('modal-gallery');

            modalGallery.appendChild(newFigure);

            deleteButton.addEventListener('click', function (event) {
               event.preventDefault();
               console.log(event.target.id);
               const idWorks = event.target.id;

               fetch(`http://localhost:5678/api/works/${idWorks}`, {
                     method: 'DELETE',
                     headers: {
                        "Content-type": "application/Json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                     },
                  })
                  .then((response) => {
                     console.log(response)
                     alert(response);

                     if (response.status === 201) {
                        displayWorks(0);
                     };
                  });
            });
         }
      })
};


worksModal();
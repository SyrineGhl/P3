// récupération API

let works;

fetch("http://localhost:5678/api/works")
   .then((res) => {
      if (res.ok) {
         return res.json();
      } else {
         console.log("ERREUR");
      }
   })

   //traiter le tableau de projet pour afficher dans les projets dans le code html
   .then((data) => {
      works = data;
      generateWorks(works);
   });

//Rendre la page html en dynamique 
function generateWorks(works) {
   for (let i = 0; i < works.length; i++) {
      //boucler son tableau de projet
      const project = works[i];
      ///pour chaque projet creer le DOM html 
      const sectionFigure = document.querySelector(".gallery");
      // crer la balise à celle du projet
      const workElement = document.createElement("figure");
      // créer balises dans celle projet
      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.alt = project.title;
      imageElement.crossOrigin = "";
      const titleElement = document.createElement("figcaption");
      titleElement.innerHTML = project.title;
      sectionFigure.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement);
   }
   console.log(works);
}

// Filtrer la galerie 
fetch("http://localhost:5678/api/categories")
   .then(response => response.json())
   .then(data => generateFilters(data))
   .catch(error => console.error(error));

/**
 * generation html des filtres 
 * @param [{}] filters 
 */
function generateFilters(filters) {
   console.log(filters)
}

function filterWorks(categoryId) {
   console.log(works)
   //je vide l'HTML de la div .gallery 
   document.querySelector(".gallery").innerHTML = "";
   //filtrer uniquement si la categorie n'est pas 0 (bouton tous)
   const filteredWorks = works.filter((work) => work.category.id === categoryId);
   console.log(filteredWorks);
   generateWorks(filteredWorks);
}

/**
 * 
 * @param {String} deleteProject Suppression de tous les projets dans la div Gallery
 */
function deleteWorks(deleteProject) {
   console.log(deleteProject);
   //j'ajoute l'élément de la classe CSS gallery 
   const gallery = document.getElementsByClassName("gallery").item(0);
   console.log(gallery);

   //suppression de tout les enfants de cet élément (boucle WHILE)

   while (gallery.hasChildNodes()) {
      gallery.removeChild(gallery.firstChild);
   }
};

/**
 * 
 * @param {String} catId Ajout de tous les projets dans la div Gallery
 */
function displayWorks(catId) {

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

         //suppression des projets
         deleteWorks("api");

         const gallery = document.getElementsByClassName("gallery").item(0);
         console.log(gallery);

         //ajout des works issus de l'API (boucle sur les données de l'API)
         //pour chaque donnée de l'API...
         setWorks(data, catId);
      });
}

/**
 * 
 * @param {String} data Récupération des projets sur l'API
 * @param {String} catId Filtrage des projets en fonction de leur catégorie
 */
function setWorks(data, catId) {
   console.log(catId);

   let dataFilter = data;
   if (catId !== 0) {
      dataFilter = data.filter((elt) => elt["categoryId"] == catId);
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
         // une fois qu'on a les données de l'API
         console.log(data);

         //récupération de l'élément avec l'ID CSS portfolio
         const portfolio = document.getElementById("portfolio");
         console.log(portfolio);

         //on crée un noeud de type ul avec une classe filtres
         let divFiltres = document.createElement("div");
         divFiltres.classList.add("filtres");
         divFiltres.style.display = 'flex';
         divFiltres.style.flexDirection = 'row';
         divFiltres.style.justifyContent = 'center';
         divFiltres.style.columnGap = '10px';
         divFiltres.style.marginBottom = '50px';

         //on crée le filtre "Tous"
         let buttonAll = document.createElement("button");
         buttonAll.innerText = "Tous";
         buttonAll.setAttribute('id', 'btn-filtre-0');
         buttonAll.value = 0;
         buttonAll.addEventListener("click", function (event) {});
         buttonAll.style.fontFamily = 'Syne';
         buttonAll.style.fontSize = '16px';
         buttonAll.style.fontWeight = '700';
         buttonAll.style.lineHeight = '19px';
         buttonAll.style.color = '#1D6154';
         buttonAll.style.border = '1px solid #1D6154';
         buttonAll.style.backgroundColor = '#FFFEF8';
         buttonAll.style.borderRadius = '60px';
         buttonAll.style.width = 'fit-content';
         buttonAll.style.padding = '8px 20px';
         buttonAll.addEventListener("mouseover", function (event) {
            event.target.style.textDecoration = 'none';
            event.target.style.color = '#FFFFFF';
            event.target.style.backgroundColor = '#1D6154';
         });
         buttonAll.addEventListener("mouseout", function (event) {
            event.target.style.color = '#1D6154';
            event.target.style.backgroundColor = '#FFFEF8';
         });

         //on met en place la structure DOM de l'élément crée ci-dessus
         divFiltres.appendChild(buttonAll);

         //ajout des catégories issus de l'API (boucle sur les données de l'API)
         //pour chaque donnée de l'API...
         for (let categorie of data) {
            // on créé une balise de type li
            let otherButton = document.createElement("button");
            otherButton.innerText = categorie.name;
            otherButton.setAttribute('id', 'btn-filtre-' + categorie.id);
            otherButton.value = categorie.id;
            otherButton.addEventListener("click", function (event) {
               console.log(event);
               console.log(event.target);
               console.log(event.target.id);
               deleteWorks("click");
               displayWorks(event.target.value);
            });
            // style css aux boutons

            otherButton.style.border = '1px solid #1D6154';
            otherButton.style.fontSize = '16px';
            otherButton.style.width = 'fit-content';
            otherButton.style.borderRadius = '60px';
            otherButton.style.lineHeight = '19px';
            otherButton.style.color = '#1D6154';
            otherButton.style.fontFamily = 'Syne';
            otherButton.style.backgroundColor = '#FFFEF8';
            otherButton.style.fontWeight = '700';
            otherButton.style.padding = '8px 20px';
            // css lors du survol
            otherButton.addEventListener("mouseover", function (event) {
               event.target.style.color = '#FFFFFF';
               event.target.style.textDecoration = 'none';
               event.target.style.backgroundColor = '#1D6154';
            });
            otherButton.addEventListener("mouseout", function (event) {
               event.target.style.color = '#1D6154';
               event.target.style.backgroundColor = '#FFFEF8';
            });

            // on met en place la structure DOM des différentes balises crées ci dessus
            divFiltres.appendChild(otherButton);
         };

         // récupération de l'élément avec la class CSS gallery
         const gallery = document.getElementsByClassName("gallery").item(0);

         // on ajoute cet élement au DOM dans la section portfolio
         portfolio.insertBefore(divFiltres, gallery);
      });
};

displayButton();
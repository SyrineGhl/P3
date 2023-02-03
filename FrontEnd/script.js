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
      // pour éviter erreur sur les images : error_Blocked_BY_Response_NotSameOrigin200(OK)
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
// recuperation du tableau
// faire la boucle 
// pour chaque element du tableau (filtre) je crée un bouton de filtre 
// injecter le bouton dans html (bouton tous à garder en html)
// ajouter levenement de click sur mon element HTML et appeler la fonction de filtre de projet 
}

//creer des boutons dynamique
// Faire pareil que ligne 42



function filterWorks(categoryId) {
  console.log(works)
  //je vide l'HTML de la div .gallery 
   document.querySelector(".gallery").innerHTML = "";
   //filtrer uniquement si la categorie n'est pas 0 (bouton tous)
   const filteredWorks = works.filter((work) => work.category.id === categoryId);
   console.log(filteredWorks);
   generateWorks(filteredWorks);
}
// BOUTON
const buttonFilterAll = document.querySelector("#button_tous");
console.log(buttonFilterAll)
buttonFilterAll.addEventListener("click", () => filterWorks(0));

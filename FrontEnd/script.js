// récupération API
fetch("http://localhost:5678/api/works")
    .then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
    }
})

// récupération des catégories sur l'API
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.json();
    }
})
.then(function(data){
    // une fois qu'on a les données de l'API
    console.log(data);
})
        // on met en place la structure DOM des différentes balises crées ci dessus
        divFiltres.appendChild(newButton);
    }
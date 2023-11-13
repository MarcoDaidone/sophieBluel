let allData = []; // Stocker les données ici

function projetData(data) {
     if (window.location.pathname.includes('index')) {
          if (data) {
               renderData(data);
          } else {
               fetch('http://localhost:5678/api/works')
                    .then((response) => {
                         return response.json();
                    })
                    .then((data) => {
                         allData = data; // Stockez les données pour une utilisation ultérieure
                         renderData(data);
                         createFilterButtons(data);
                    })
                    .catch((error) => {
                         console.error('Error:', error);
                    });
          }
     }
}

function renderData(data) {
     document.querySelector('.gallery').innerHTML = ''; // Vider la galerie avant de rendre

     // Rendre les données
     data.forEach((item) => {
          let figCaption = document.createElement('figCaption');
          figCaption.innerText = item.title;
          let image = document.createElement('img');
          image.src = item.imageUrl;

          let galleries = document.querySelectorAll('.gallery');
          galleries.forEach((gallery) => {
               let figureElement = document.createElement('figure');
               figureElement.appendChild(image);
               figureElement.appendChild(figCaption);
               gallery.appendChild(figureElement);
          });
     });

     let categories = data.map((item) => item.category.name);
     let buttonsContainer = document.querySelector('.filter');
     projetData.innerHTML = '';
}
// pas de fonction dans une fonction (mettre ça au propre)

// Définir la fonction qui gère la classe 'active'
function setActiveButton(activeButton) {
     document.querySelectorAll('.filter .bouton').forEach((btn) => {
          btn.classList.remove('active');
     });
     // Ajouter la classe 'active' au bouton cliqué
     if (activeButton) {
          activeButton.classList.add('active');
     }
}
function filterByCategory(categoryName, clickedButton) {
     const filteredData = allData.filter(
          (object) => object.category.name === categoryName
     );
     projetData(filteredData);
}
function resetFilter(categoryName) {
     const resetData = allData;
     projetData(resetData);
}

function createFilterButtons(data) {
     let categories = data.map((item) => item.category.name); // Utiliser Set pour obtenir des catégories uniques
     let uniqueCat = new Set(categories);
     let resetButon = document.createElement('a');
     resetButon.textContent = 'Tous';
     resetButon.classList.add('bouton');
     const buttonsContainer = document.querySelector('.filter');
     buttonsContainer.appendChild(resetButon);

     resetButon.addEventListener('click', () => {
          resetFilter();
          setActiveButton(resetButon);
     });
     // Créer un bouton pour chaque catégorie unique
     uniqueCat.forEach((category) => {
          let button = document.createElement('a');
          button.textContent = category;
          button.classList.add('bouton');
          button.addEventListener('click', () => {
               filterByCategory(category);
               setActiveButton(button);
          });
          buttonsContainer.appendChild(button);
     });
}

projetData();

// formulaire de connexion
if (window.location.pathname.includes('login')) {
     document.getElementById('login').addEventListener('submit', function (e) {
          e.preventDefault();

          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          console.log(email, password);

          // Envoi de la requête POST
          fetch('http://localhost:5678/api/users/login', {
               method: 'POST',
               body: JSON.stringify({
                    email: email,
                    password: password,
               }),
          })
               .then((response) => response.json())
               .then((data) => {
                    console.log('Succès:', data);
                    // Gérez ici la logique après une connexion réussie
               })
               .catch((error) => {
                    console.error('Erreur:', error);
                    // Gérez ici les erreurs
               });
     });
}

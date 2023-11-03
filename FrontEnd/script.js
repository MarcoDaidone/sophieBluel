let allData = []; // Stocker les données ici

function projetData(dataToRender) {
     if (dataToRender) {
          renderData(dataToRender);
     } else {
          fetch('http://localhost:5678/api/works')
               .then((response) => {
                    return response.json();
               })
               .then((data) => {
                    allData = data; // Stockez les données pour une utilisation ultérieure
                    renderData(data);
                    createFilterButtons(allData);
               })
               .catch((error) => {
                    console.error('Error:', error);
               });
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

function createFilterButtons(data) {
     let categories = data.map((item) => item.category.name); // Utiliser Set pour obtenir des catégories uniques
     let uniqueCat = new Set(categories);
     let resetButon = document.createElement('a');
     resetButon.textContent = 'Tous';
     resetButon.classList.add('bouton');
     const buttonsContainer = document.querySelector('.filter');
     buttonsContainer.appendChild(resetButon);

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

     function filterByCategory(categoryName, clickedButton) {
          const filteredData = allData.filter(
               (object) => object.category.name === categoryName
          );
          projetData(filteredData);
     }
     function resetFilter(categoryName) {
          renderData(data);
     }
}

projetData();

const authToken = sessionStorage.getItem('authToken');
console.log(authToken);
let allData = []; // Stocker les données ici

function projetData(data) {
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

function renderData(data) {
     document.querySelector('.gallery').innerHTML = ''; // Vider la galerie avant de rendre
     document.querySelector('.gallery_delete').innerHTML = '';
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
          //modale
          let wrapImage = document.createElement('div');
          wrapImage.setAttribute('class', 'delete_link');
          let iconTrash = document.createElement('i');
          iconTrash.setAttribute('class', 'fa-solid fa-trash-can');
          iconTrash.id = item.id;
          iconTrash.addEventListener('click', (e) => {
               e.preventDefault();
               deleteFunction(e);
          });
          let galleryModal = document.querySelector('.gallery_delete');
          const imageModal = document.createElement('img');
          imageModal.src = item.imageUrl;
          galleryModal.appendChild(imageModal);
          // Append the delete link and image to the imageModal
          wrapImage.appendChild(iconTrash);
          wrapImage.appendChild(imageModal);
          galleryModal.appendChild(wrapImage);
     });
     let categories = data.map((item) => item.category.name);
     let buttonsContainer = document.querySelector('.filter');
     projetData.innerHTML = '';
}

const deleteFunction = function (e) {
     const id = parseInt(e.target.id);
     console.log('réponse ici' + e.target.id);
     fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers: {
               Authorization: `Bearer ${authToken}`,
               'Content-Type': 'application/json',
          },
          // You can include a request body if needed
          // body: JSON.stringify({ key: 'value' }),
     })
          .then((response) => {
               if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
               }
               allData = allData.filter((item) => item.id !== id);
               renderData(allData); // Update the UI after deletion
               return console.log('success delete');
          })
          .catch((error) => {
               console.error('Error:', error);
          });
};

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
     if (!authToken) {
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
}

document.addEventListener('DOMContentLoaded', (event) => {
     if (authToken) {
          const body = document.body;
          const editeurBareMode = document.createElement('div');
          editeurBareMode.classList.add('black');
          body.insertBefore(editeurBareMode, body.firstChild);
          const editionText = document.createElement('a');
          editionText.textContent = 'Mode edition';
          editeurBareMode.appendChild(editionText);
          const modifyIcon = document.createElement('img');
          modifyIcon.src = './assets/icons/modeEdition.png';
          editionText.appendChild(modifyIcon);
          const modifyBottom = document.createElement('a');
          modifyBottom.textContent = 'modifier';

          const modifyBottomImg = document.createElement('img');
          modifyBottomImg.src = './assets/icons/modify_b.png';
          const modifySpan = document.querySelector('.modify');
          modifyBottom.setAttribute('id', '#modal');
          modifySpan.appendChild(modifyBottom);
          modifyBottom.appendChild(modifyBottomImg);
          const target = document.getElementById('modal');
          const openModal = function (e) {
               e.preventDefault();
               target.style.display = null;
               target.removeAttribute('aria-hidden');
               target.setAttribute('aria-modal', 'true');
               console.log(target);
               target.addEventListener('click', closeModal);
               target
                    .querySelector('.close_modal')
                    .addEventListener('click', closeModal);
               target
                    .querySelector('.js-modal-stop')
                    .addEventListener('click', stopPropagation);
          };
          const closeModal = function (e) {
               e.preventDefault();
               target.style.display = 'none';
               target.setAttribute('aria-hidden', 'true');
               target.removeAttribute('aria-modal');
               console.log(target);
               target.removeEventListener('click', closeModal);
               target
                    .querySelector('.js-modal-stop')
                    .removeEventListener('click', stopPropagation);
               target
                    .querySelector('.close_modal')
                    .removeEventListener('click', closeModal);
          };

          const stopPropagation = function (e) {
               e.stopPropagation();
          };

          modifyBottom.addEventListener('click', openModal);
     }
});

projetData();

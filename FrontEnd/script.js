let allData = []; // Stocker les données ici

function projetData(dataToRender) {
     if (!dataToRender) {
          fetch('http://localhost:5678/api/works')
               .then((response) => {
                    return response.json();
               })
               .then((data) => {
                    allData = data; // Stockez les données pour une utilisation ultérieure
                    renderData(data);
               })
               .catch((error) => {
                    console.error('Error:', error);
               });
     } else {
          renderData(dataToRender);
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
               figureElement.appendChild(image.cloneNode(true));
               figureElement.appendChild(figCaption.cloneNode(true));
               gallery.appendChild(figureElement);
          });
     });
}

projetData();

// Filter button logic
const boutonElement = document.querySelector('.bouton_filtre');
const boutonAll = document.querySelector('.bouton_All');
const boutonAppartements = document.querySelector('.bouton_Appartements');
const boutonHotel = document.querySelector('.bouton_Hotel');

boutonElement.addEventListener('click', function (event) {
     const filteredData = allData.filter(
          (object) => object.category.name === 'Objets'
     );
     projetData(filteredData);
});

boutonAll.addEventListener('click', function (event) {
     projetData();
});

boutonHotel.addEventListener('click', function (event) {
     const filteredData = allData.filter(
          (object) => object.category.name === 'Hotels & restaurants'
     );
     projetData(filteredData);
});

boutonAppartements.addEventListener('click', function (event) {
     const filteredData = allData.filter(
          (object) => object.category.name === 'Appartements'
     );
     projetData(filteredData);
});

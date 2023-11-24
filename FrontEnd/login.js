// formulaire de connexion

window.addEventListener('DOMContentLoaded', function () {
     document.getElementById('login').addEventListener('submit', function (e) {
          e.preventDefault();

          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const data = {
               email: email,
               password: password,
          };
          console.log(email, password);

          // Envoi de la requête POST
          fetch('http://localhost:5678/api/users/login', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
          })
               .then((response) => {
                    if (response.ok) {
                         return response.json();
                    } else {
                         return response.json().then((errorData) => {
                              alert('identifiants incorrects');
                         });
                    }
               })
               .then((data) => {
                    console.log('Succès:', data);
                    const token = data.token;
                    sessionStorage.setItem('authToken', token);
                    window.location.href = 'index.html';
                    // Gérez ici la logique après une connexion réussie
               })
               .catch((error) => {
                    console.error('Erreur:', error);
                    // Gérez ici les erreurs
               });
     });
});
const authToken = sessionStorage.getItem('authToken');

if (authToken) {
     console.log('Token trouvé:', authToken);
     // Token est présent, vous pouvez continuer votre logique ici
} else {
     console.log('Token non trouvé');
     // Token n'est pas présent, vous pourriez avoir besoin de demander une nouvelle connexion ou un nouveau token
}

// "Authorization" : "Bearer tonToken" a metre dans headers
// faire modal, afficher liste, mettre en place la suppression
// toujours éviter de faire un max d'appel api
// envois requete delete
// sans recharger la page l'api et l'index html doivent être update

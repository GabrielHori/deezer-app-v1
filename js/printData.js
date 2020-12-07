// Je récupére les éléments
const albumlist = document.querySelector('.album-list');
const eminemBtn = document.querySelector('#showEminem');
const otherArtistInput = document.querySelector('#showOtherArtist');
const modal = document.querySelector('#myModal');
const span = document.querySelector('.tracklist');
const trackDiv = document.querySelector('.tracklist');

// Les Fonctions 

// fonction qui fetch l'API deezer
const fetchAlbums = function (artiste) {
    // Utilisation de la librairie json
    fetchJsonp(
        `https://api.deezer.com/search/track/autocomplete?limit=25&q=${artiste}&output=jsonp`
    )
        .then(function (response) {
            return response.json();
        })
        .then(json => displayAlbums(json))
        .catch(function (error) {
            console.log(error);
        });
};

// Fonction qui affiche les albums avec les info de la fonction fetchAlbums
const displayAlbums = function (data) {
    // Suppression de la recherche précédente
    albumsDiv.innerHTML = '';

    const albums = data.data;
    console.log(albums);
    // Mainteant on créer une card boostrap avec les données du fetch
    for (const item of albums) {
        const html = `
        <div class="card">
                <img src="${item.album.cover_big}" class="card-img-top" alt="${
            item.title
        }" />
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text"></p>
                    <button data-tracklist="${item.album.tracklist}"
                     class="btn btn-primary">Tracklist${
                         item.explicit_lyrics ? ` (Explicit Content)` : ''
                     }</button>
                    <audio controls src="${item.preview}"></audio>
                </div>
            </div>`;

        // Maintenat on l'insére dans l'html
        albumsDiv.insertAdjacentHTML('beforeend', html);
        // Ajout de l'écouteur 
        docuement.querySelector('.card:nth-last-child(1) button')
        document.addEventListener('.click', function (event) {
            fetchTracklist(`${item.album.tracklist}`);
        });
    }
}


// Agregamos las peliculas a la pagina
const Local = localStorage.getItem('Favorites');
const Favorites = JSON.parse(Local);
console.log(Favorites);

// Function para agregar las series a favoritos
function FavoriteSerie(){
    let Serie = '';
    Favorites.forEach((favorite,index) =>{
        if(favorite.catalog == 'tv'){
            Serie += `<div class="Series--List">
                        <img src="${favorite.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--serie">${favorite.Fecha}</span>
                            <span id="Catalogo--serie">${favorite.catalog}</span>
                            <span id="Tipo--serie">${favorite.tipo}</span>
                        </div>
                        <h4>${favorite.Name}</h4>
                    </div>`
        }
        document.getElementById('List--Series').innerHTML = Serie
    })
}
// Function para agregar las peliculas favoritas
function FavoriteMovie(){
    let Movie = '';
    Favorites.forEach((favorite,index) => {
        if(favorite.catalog == 'movie'){
            Movie += `<div class="Movies--List">
                        <img src="${favorite.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--Movie">${favorite.Fecha}</span>
                            <span id="Catalogo-Movie">${favorite.catalog}</span>
                            <span id="Tipo--Movie">${favorite.tipo}</span>
                        </div>
                        <h4>${favorite.Name}</h4>
                    </div>`;
        }
    });
    document.getElementById('List--Movies').innerHTML = Movie;
}
FavoriteMovie();
FavoriteSerie();

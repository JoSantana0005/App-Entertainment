// Agregamos las peliculas a la pagina
const Local = localStorage.getItem('Favorites');
const Favorites = JSON.parse(Local);
console.log(Favorites);

let Serie = '';

// Function para agregar las peliculas favoritas
function FavoriteMovie(){
    let Movie = '';
    Favorites.forEach(favorite => {
        Movie += `<div class="Movies--List">
                        <img src="${favorite.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--Movie">${favorite.Fecha}</span>
                            <span id="Catalogo-Movie">${favorite.catalog}</span>
                            <span id="Tipo--Movie">${favorite.tipo}</span>
                        </div>
                        <h4>${favorite.Name}</h4>
                    </div>`;
    });
    document.getElementById('List--Movies').innerHTML = Movie;
}
FavoriteMovie();

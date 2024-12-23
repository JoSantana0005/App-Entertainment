// Agregamos las peliculas a la pagina
const Local = localStorage.getItem('Favorites');
const Favorites = JSON.parse(Local);
const Imagen = document.getElementById('Imagen');
const Title_dialog = document.getElementById('Title-dialog');
const Fecha_dialog = document.getElementById('Fecha--dialog');
const catalogo = document.getElementById('Catalogo--dialog');
const Tipo_movie = document.getElementById('Tipo--movie');
const Popularity = document.getElementById('Popularity');
const Overview = document.getElementById('Overview');
const Ventana_modal = document.getElementById('Ventana-Modal');
const cerrar_modal = document.getElementById('Cerrar');
console.log(Favorites);
// Evento para cerrar la ventana modal
cerrar_modal.addEventListener('click',()=>{
    cerrar_modal.close();
})
// Function para agregar las series a favoritos
function FavoriteSerie(){
    let Serie = '';
    Favorites.forEach((favorite,index) =>{
        if(favorite.catalog == 'tv'){
            Serie += `<div class="Series--List" data-index=${index}>
                        <img src="${favorite.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--serie">${favorite.Fecha}</span>
                            <span id="Catalogo--serie">${favorite.catalog}</span>
                            <span id="Tipo--serie">${favorite.tipo}</span>
                        </div>
                        <h4>${favorite.Name}</h4>
                    </div>`
        }
    })
    document.getElementById('List--Series').innerHTML = Serie;
    // Evento para la ventana modal
    const List_series = document.querySelectorAll('.Series--List');
    List_series.forEach(element =>{
        element.addEventListener('click',()=>{
            const index = element.getAttribute('data-index');
            if(Ventana_modal){
                Ventana_modal.showModal();
                Imagen.src = Favorites[index].Poster;
                Title_dialog.textContent = `${Movies[index].title || Movies[index].name}`;
                Fecha_dialog.textContent = `${Movies[index].release_date || Movies[index].first_air_date}`;
                catalogo.textContent = `${Movies[index].media_type}`;
                Tipo_movie.textContent = `${ClasiMovie(Movies[index].vote_average)}`
                Popularity.textContent = `${Movies[index].popularity}`;
                Overview.textContent = `${Movies[index].overview}`;
            }
        })
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

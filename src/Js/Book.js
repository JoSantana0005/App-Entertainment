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
const ContainerMovie = document.getElementsByClassName('Movies')[0];
const ContainerSerie = document.getElementsByClassName('Series')[0];
const Title = document.getElementById('Title');
console.log(Favorites);
// Evento para cerrar la ventana modal
cerrar_modal.addEventListener('click',()=>{
    Ventana_modal.close();
})
// Funcion para restablecer el contenido de las sections
function actualizarSection(){
    ContainerMovie.innerHTML = `<h2 id="Title">Bookmarked Movies</h2>
            <article class="List--Favorites--Movies" id="List--Favorites--Movies">
                <div class="List--Movies" id="List--Movies"></div>
            </article>`
    ContainerSerie.innerHTML = `<h2>Bookmarked TV</h2>
            <article class="List--favorites--Series" id="List--favorites--Series">
                <div class="List--Series" id="List--Series"></div>
            </article>`
}
// Fucntion para colocar los resultados del buscador en una section
function SearchResults(){
    ContainerMovie.innerHTML = `<h2 id="Title">${Title.innerText}</h2>
            <article class="List--Favorites--Movies" id="List--Favorites--Movies">
                <div class="List--Movies" id="List--Movies"></div>
            </article>`
}
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
                Title_dialog.textContent = Favorites[index].Name;
                Fecha_dialog.textContent = Favorites[index].Fecha;
                catalogo.textContent = Favorites[index].catalog;
                Tipo_movie.textContent = Favorites[index].tipo
                Popularity.textContent = Favorites[index].popularidad;
                Overview.textContent = Favorites[index].descripcion;
            }else{
                console.log("No existen la ventana modal");
            }
        })
    })

}
// Function para agregar las peliculas favoritas
function FavoriteMovie(){
    let Movie = '';
    Favorites.forEach((favorite,index) => {
        if(favorite.catalog == 'movie'){
            Movie += `<div class="Movies--List" data-index=${index}>
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
    // Evento para la ventana modal
    const List_Movies = document.querySelectorAll('.Movies--List');
    List_Movies.forEach(element =>{
        element.addEventListener('click',()=>{
            const index = element.getAttribute('data-index');
            if(Ventana_modal){
                Ventana_modal.showModal();
                Imagen.src = Favorites[index].Poster;
                Title_dialog.textContent = Favorites[index].Name;
                Fecha_dialog.textContent = Favorites[index].Fecha;
                catalogo.textContent = Favorites[index].catalog;
                Tipo_movie.textContent = Favorites[index].tipo
                Popularity.textContent = Favorites[index].popularidad;
                Overview.textContent = Favorites[index].descripcion;
            
            }else{
                console.log("No existen la ventana modal");
            }
        })
    })

}
// Function para la busqueda de la pelicula o series
const Search = document.getElementById('Search--Favorite');
Search.addEventListener('input',(e)=>{
    const value = e.target.value.trim();
    console.log(value);
    if(value == ''){
        actualizarSection();
        FavoriteMovie();
        FavoriteSerie();
    }else{
        Title.innerText = 'Founds the results';
        SearchResults();
        document.getElementsByClassName('Series')[0].innerHTML = '';
        Favorites.forEach((favorite,index) =>{
            const isVisble = favorite.Name.toLowerCase().includes(value.toLowerCase());
            if(isVisble){
                List = `<div class="Movies--List" data-index=${index}>
                        <img src="${favorite.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--Movie">${favorite.Fecha}</span>
                            <span id="Catalogo-Movie">${favorite.catalog}</span>
                            <span id="Tipo--Movie">${favorite.tipo}</span>
                        </div>
                        <h4>${favorite.Name}</h4>
                    </div>`;
            }
        })
        if(List != ''){
            document.getElementById('List--Movies').innerHTML = List
            // Ventana Modal
            const List_Search = document.querySelectorAll('.Movies--List');
            List_Search.forEach(element =>{
                element.addEventListener('click',()=>{
                    const index = element.getAttribute('data-index');
                    if(Ventana_modal){
                        Ventana_modal.showModal();
                        Imagen.src = Favorites[index].Poster;
                        Title_dialog.textContent = Favorites[index].Name;
                        Fecha_dialog.textContent = Favorites[index].Fecha;
                        catalogo.textContent = Favorites[index].catalog;
                        Tipo_movie.textContent = Favorites[index].tipo
                        Popularity.textContent = Favorites[index].popularidad;
                        Overview.textContent = Favorites[index].descripcion;
                    }else{
                        console.log("No existen la ventana");
                    }
                })
            })
        }else{
            document.getElementById('List--Movies').innerHTML = '<p>No hay</p>';
        }
    }
})
FavoriteMovie();
FavoriteSerie();


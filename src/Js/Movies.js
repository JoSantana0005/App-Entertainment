let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
let List_movies = [];
let Title = document.getElementById('Title');
const ContainerMovies = document.getElementsByClassName('Movies')[0];
const Ventana_modal = document.getElementById('Ventana-Modal');
const Imagen = document.getElementById('Imagen');
const Title_dialog = document.getElementById('Title-dialog');
const Fecha_dialog = document.getElementById('Fecha--dialog');
const catalogo = document.getElementById('Catalogo--dialog');
const Tipo_movie = document.getElementById('Tipo--movie');
const Popularity = document.getElementById('Popularity');
const Overview = document.getElementById('Overview');
// Funcion para actualizar el contenido de la section
function ActualizarContent(){
    ContainerMovies.innerHTML = `<article class="Title--section">
                <h1 id="Title">Movies</h1>
                <div>
                    <svg id="Arrow_left" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="Movie" id="Movie">
                <div class="List--Movie" id="List--Movie"></div>
            </article>`
}
// Funcion para mostrar el contenido de la busqueda
function MostrarSearch(){
    ContainerMovies.innerHTML = `<article class="Title--section">
                <h1 id="Title">${Title.innerText}</h1>
                <div>
                    <svg id="Arrow_left" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="Movie" id="Movie">
                <div class="List--Movie" id="List--Movie"></div>
            </article>`
}
// funcion para llamar a los oyentes
function LlamarOyentes(){
    let arrow_L = document.getElementById('Arrow_left');
    let arrow_R = document.getElementById('Arrow_right');

    // Evento para cambiar el contenido de los oyentes
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
            Obtener_Movies();
        }else{
            console.log("Hubo un error");
        }
    })
    arrow_R.addEventListener('click',()=>{
        if(arrow_R){
            page++;
            Obtener_Movies();
        }else{
            console.log("Hubo un error");
        }
    })
}
// Eventos para cambiar el cntenido de las peliculas
function Arrow_left(){
    const arrow_L = document.getElementById('Arrow_left');
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
            Obtener_Movies();
        }else{
            console.log("Hubo un error")
        }
    })
}
function Arrow_right(){
    const arrow_R = document.getElementById('Arrow_right');
    arrow_R.addEventListener('click',()=>{
        if(arrow_R){
            page++;
            Obtener_Movies();
        }
    })
}
// Funcion que dtermina el tipo de pelicula
function ClasiMovie(Vote){
    if(Vote >= 8){
        return "PG-13"
    }else if(Vote >= 5){
        return "PG"
    }else{
        return "R"
    }
}
// Evento para cerrar la ventana modal
const Cerrar_modal = document.getElementById('Cerrar');
Cerrar_modal.addEventListener('click',()=>{
    Ventana_modal.close();
})
// solicitud a la api para obtener todas las peliculas
const Obtener_Movies = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US&page=${page}}`)
        console.log(respuesta)
        if(respuesta.status == 200){
            const datos = await respuesta.json();
            console.log(datos)
            const Movies = datos.results;
            let List = '';
            List_movies = Movies.map(Movie => {
                List += `<div class="Movie--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Movie.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha-estreno">${Movie.release_date}</span>
                            <span id="Categoria-pelicula">${Movie.media_type}</span>
                            <span id="tipo--pelicula">${ClasiMovie(Movie.vote_average)}</span>
                        </div>
                        <h4>${Movie.title}</h4>
                    </div>`
                return {name: Movie.title, 
                    poster: Movie.backdrop_path, 
                    categoria: Movie.media_type, 
                    Tipo: ClasiMovie(Movie.vote_average) ,
                    fecha: Movie.release_date,
                    popularidad: Movie.popularity,
                    Overview: Movie.overview
                }
            });
            document.getElementById('List--Movie').innerHTML = List
            const Movie_list = document.querySelectorAll('.Movie--List');
            Movie_list.forEach((element,index) =>{
                element.addEventListener('click',()=>{
                    if(Ventana_modal){
                        Ventana_modal.showModal();
                        // Ponemos los datos en el dialog
                        Imagen.src = `https://image.tmdb.org/t/p/w500/${Movies[index].backdrop_path}`;
                        Title_dialog.textContent = `${Movies[index].title || Movies[index].name}`;
                        Fecha_dialog.textContent = `${Movies[index].release_date || Movies[index].first_air_date}`;
                        catalogo.textContent = `${Movies[index].media_type}`;
                        Tipo_movie.textContent = `${ClasiMovie(Movies[index].vote_average)}`
                        Popularity.textContent = `${Movies[index].popularity}`;
                        Overview.textContent = `${Movies[index].overview}`;
                    }else{
                        console.log('No existen tal contenedor');
                    }
                })
            })
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
// Evento para buscar una pelicula 
const Search = document.getElementById('Search--Favorite');
Search.addEventListener('input',(e)=>{
    const value_input = e.target.value.trim();
    let buscador = '';
    console.log(value_input)
    if(value_input == ''){
        ActualizarContent();
        LlamarOyentes();
        Obtener_Movies();
    }else{
        Title.innerText = 'Founds the results'
        MostrarSearch();
        console.log(List_movies)
        List_movies.forEach((Movie,originalIndex) =>{
            const isVisible = Movie.name.toLowerCase().includes(value_input.toLowerCase())
            if(isVisible){
                buscador += `<div class="Movie--List" data--index=${originalIndex}>
                        <img src="https://image.tmdb.org/t/p/w500/${Movie.poster}" alt="Logo">
                        <div>
                            <span id="Fecha-estreno">${Movie.fecha}</span>
                            <span id="Categoria-pelicula">${Movie.categoria} Series</span>
                            <span id="tipo--pelicula">${Movie.Tipo}</span>
                        </div>
                        <h4>${Movie.name}</h4>
                    </div>`
            }
        })
        if(buscador != ''){
            document.getElementById('List--Movie').innerHTML = buscador;
            const Movie_list = document.querySelectorAll('.Movie--List');
            Movie_list.forEach(element =>{
                element.addEventListener('click',()=>{
                    const index = element.getAttribute('data--index');
                    if(Ventana_modal){
                        Ventana_modal.showModal();
                        
                        // Colocamos la informacion de la pelicula que fue buscada en la ventana modal
                        Imagen.src = `https://image.tmdb.org/t/p/w500/${List_movies[index].poster}`;
                        Title_dialog.textContent = `${List_movies[index].name}`;
                        Fecha_dialog.textContent = `${List_movies[index].fecha}`;
                        catalogo.textContent = `${List_movies[index].categoria}`;
                        Tipo_movie.textContent = `${List_movies[index].tipo}`
                        Popularity.textContent = `${List_movies[index].popularidad}`;
                        Overview.textContent = `${List_movies[index].Overview}`
                    }else{
                        console.log("No existen tal contenedor")
                    }
                })
            })
        }else{
            document.getElementById('List--Movie').innerHTML = '<p>No hay</p>';
        }
    }
})
const Local = localStorage.getItem('Favorites');
const Favorites = JSON.parse(Local);
// Evento para agregar una pelicula a favoritos
const Favorites_button = document.getElementById('Favorite--bookmarked');
Favorites_button.addEventListener('click',()=>{
    const info = {
        Name: Title_dialog.textContent,
        Poster: Imagen.src,
        Fecha: Fecha_dialog.textContent,
        catalog: catalogo.textContent,
        tipo: Tipo_movie.textContent,
        popularidad: Popularity.textContent,
        descripcion: Overview.textContent,
    }
    if(Favorites_button){
        Favorites.push(info)
        localStorage.setItem('Favorites',JSON.stringify(Favorites))
        console.log(localStorage.getItem('Favorites'));
        alert('This movie was added to favorites');
        Ventana_modal.close();
    }
})
Obtener_Movies();
Arrow_left();
Arrow_right();
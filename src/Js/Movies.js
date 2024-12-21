let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
let List_movies = [];
let Title = document.getElementById('Title');
const ContainerMovies = document.getElementsByClassName('Movies')[0];
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
                    fecha: Movie.release_date
                }
            });
            document.getElementById('List--Movie').innerHTML = List
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
        List_movies.forEach(Movie =>{
            const isVisible = Movie.name.toLowerCase().includes(value_input.toLowerCase())
            if(isVisible){
                buscador += `<div class="Movie--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Movie.poster}" alt="Logo">
                        <div>
                            <span id="Fecha-estreno">${Movie.fecha}</span>
                            <span id="Categoria-pelicula">${Movie.categoria}</span>
                            <span id="tipo--pelicula">${Movie.Tipo}</span>
                        </div>
                        <h4>${Movie.name}</h4>
                    </div>`
            }
        })
        if(buscador != ''){
            document.getElementById('List--Movie').innerHTML = buscador;
        }else{
            document.getElementById('List--Movie').innerHTML = '<p>No hay</p>';
        }
    }
})
Obtener_Movies();
Arrow_left();
Arrow_right();
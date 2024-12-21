let page = 1;
const arrow_left = document.getElementById('Arrow_left');
const arrow_right = document.getElementById('Arrow_right');
const trending = document.getElementById('Trending');
const ContainerTrending = document.getElementsByClassName('Trending')[0];
const ContainerRecommend = document.getElementsByClassName('Recomend')[0];
let movies_and_series = [];
let Title = document.getElementById('Title');
// Evento para actaulizar el contenido
function ActaulizarContent(){
    ContainerTrending.innerHTML = `<article class="Title--section">
                <h2 id="Title">Trending</h2>
                <div>
                    <svg id="Arrow_left_Movies" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right_Movies" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="Trending--movies" id="Trending">
                <div class="List" id="List_Movie"></div>
            </article>`
    ContainerRecommend.innerHTML = `<article class="Title--recomend">
                <h2>Recommended of you</h2>
                <div>
                    <svg id="Arrow_left" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="Recomend--movies" id="Recomend--movies">
                <div class="List--Movies" id="List--Movies"></div>
            </article>`
    
}
// Function para obtener Founds the results
function SearchTitle(){
    ContainerTrending.innerHTML = `<article class="Title--section">
                <h2 id="Title">${Title.innerText}</h2>
                <div>
                    <svg id="Arrow_left_Movies" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right_Movies" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="Trending--movies" id="Trending">
                <div class="List" id="List_Movie"></div>
            </article>`
}
// Eventos para cambiar el contenido de la pagina
arrow_left.addEventListener('click',()=>{
    page--;
    obtener_peliculas();
})
arrow_right.addEventListener('click',()=>{
    page++;
    obtener_peliculas();
})

// Function para mover la seccion de los trendings
const arrow_L = document.getElementById('Arrow_left_Movies')
arrow_L.addEventListener('click',()=>{
    if(arrow_L){
        trending.scrollLeft -= 320
    }else{
        console.log("Hubo un error")
    }
})

const arrow_R = document.getElementById('Arrow_right_Movies')
arrow_R.addEventListener('click',()=>{
    if(arrow_R){
        trending.scrollLeft += 320
    }else{
        console.log("Hubo un error")
    }
})
// Function para llamar a los otros oyentes
function LlamarOyentes(){
    let arrow_L = document.getElementById('Arrow_left_Movies');
    let arrow_R = document.getElementById('Arrow_right_Movies');
    let trending = document.getElementById('Trending');

    arrow_R.addEventListener('click',()=>{
        if(arrow_R){
            trending.scrollLeft += 320
        }else{
            console.log("Hubo un error")
        }
    })
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            trending.scrollLeft -= 320
        }else{
            console.log("Hubo un error")
        }
    })

    let arrow_left = document.getElementById('Arrow_left');
    let arrow_right = document.getElementById('Arrow_right');

    arrow_left.addEventListener('click',()=>{
        page--;
        obtener_peliculas();
    })
    arrow_right.addEventListener('click',()=>{
        page++;
        obtener_peliculas();
    })
}

// Funcion que obtuiene el tipo de clasificacion de la pelicula
function ClasiMovie(Vote){
    if(Vote >= 8){
        return "PG-13"
    }else if(Vote >= 5){
        return "PG"
    }else{
        return "R"
    }
}

//Llave de la api
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
// Solicitud a la api de las peliculas vas populares en estos momentos
const obtener_peliculas_populares = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US`)
        if(respuesta.status == 200){
            const datos = await respuesta.json();
            const peliculas = datos.results
            let movie = '';
            peliculas.forEach(pelicula => {
                movie += `<div class="Movies">
                        <img src="https://image.tmdb.org/t/p/w500/${pelicula.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha">${pelicula.release_date || pelicula.first_air_date}</span>
                            <span id="Categoria">${pelicula.media_type}</span>
                            <span id="Tipo">${ClasiMovie(pelicula.vote_average)}</span>
                        </div>
                        <h4>${pelicula.title || pelicula.name}</h4>
                    </div>`
            });
            document.getElementById('List_Movie').innerHTML = movie
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
//Solicitud a la api de la series y peliculas poupulares en estos momentos
const obtener_peliculas = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=${page}`);
        console.log(respuesta)
        if(respuesta.status == 200){
            const datos = await respuesta.json();
            console.log(datos)
            const Populars = datos.results;
            let populares = '';
            movies_and_series= Populars.map(Popular=>{
                populares += `<div class="Movie-recomend">
                    <img src="https://image.tmdb.org/t/p/w500/${Popular.backdrop_path}" alt="Logo">
                    <div>
                        <span id="Fecha--estreno">${Popular.release_date || Popular.first_air_date}</span>
                        <span id="Catagoria--movie">${Popular.media_type}</span>
                        <span id="Tipo--movie">${ClasiMovie(Popular.vote_average)}</span>
                    </div>
                    <h4>${Popular.title || Popular.name}</h4>
                </div>`;
                return {name:Popular.name || Popular.title,
                    release_date: Popular.release_date || Popular.first_air_date,
                    poster:Popular.backdrop_path,
                    categoria: Popular.media_type,
                    tipo: ClasiMovie(Popular.vote_average)
                }
            })
            document.getElementById('List--Movies').innerHTML = populares;
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
// Funcion para buscar peliculas o series
const Search = document.getElementById('Search-Movie');
Search.addEventListener('input',(e)=>{
    const value = e.target.value.trim();
    let buscador = ''; 
    if(value == ''){
        ActaulizarContent();
        LlamarOyentes();
        obtener_peliculas();
        obtener_peliculas_populares();
    }else{
        Title.innerText = 'Found the results';
        SearchTitle();
        document.getElementsByClassName('Recomend')[0].innerHTML = '';
        movies_and_series.forEach(movie =>{
            const isVisible = movie.name.toLowerCase().includes(value.toLowerCase())
            if(isVisible){
                buscador += `<div class="Movies">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster}" alt="Logo">
                        <div>
                            <span id="Fecha">${movie.release_date}</span>
                            <span id="Categoria">${movie.categoria}</span>
                            <span id="Tipo">${movie.tipo}</span>
                        </div>
                        <h4>${movie.name}</h4>
                    </div>
                </div>`
            }
        })
        if(buscador != ''){
            document.getElementById('List_Movie').innerHTML = buscador;
        }else{
            document.getElementById('List_Movie').innerHTML = '<p>No hay</p>';
        }
        
    }
    
})
obtener_peliculas_populares();
obtener_peliculas();


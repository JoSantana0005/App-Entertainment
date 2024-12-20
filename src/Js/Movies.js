let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
// Eventos para cambiar el cntenido de las peliculas
function Arrow_left(){
    const arrow_L = document.getElementById('Arrow_left');
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
            //Funcion de la solictud de la api
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
            //Funcion de la solicitud a la api
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
        const respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
        console.log(respuesta)
        if(respuesta.status == 200){
            const datos = await respuesta.json();
            console.log(datos)
            const Movies = datos.results;
            let List = '';
            Movies.forEach(Movie => {
                List += `<div class="Movie--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Movie.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha-estreno">${Movie.release_date}</span>
                            <span id="Categoria-pelicula">${Movie.media_type}</span>
                            <span id="tipo--pelicula">${ClasiMovie(Movie.vote_average)}</span>
                        </div>
                        <h4>${Movie.title}</h4>
                    </div>`
            });
            if(document.getElementById('List--Movie')){
                document.getElementById('List--Movie').innerHTML = List
            }else{
                
            }
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
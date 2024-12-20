let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
let Movies_List = document.getElementById('List--Movie');
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
            Movies.forEach(Movie => {
                List += `<div class="Movie--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Movie.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha-estreno">${Movie.release_date}</span>
                            <span id="Categoria-pelicula">Movie</span>
                            <span id="tipo--pelicula">${ClasiMovie(Movie.vote_average)}</span>
                        </div>
                        <h4>${Movie.title}</h4>
                    </div>`
            });
            if(Movies_List){
                Movies_List.innerHTML = List
            }else{
                console.log("Hubo un error")
            }
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
Obtener_Movies();
Arrow_left();
Arrow_right();
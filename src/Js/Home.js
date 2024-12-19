let page = 1;
const arrow_left = document.getElementById('Arrow_left');
const arrow_right = document.getElementById('Arrow_right');
arrow_left.addEventListener('click',()=>{
    page--;
    obtener_peliculas();
})
arrow_right.addEventListener('click',()=>{
    page++;
    obtener_peliculas();
})
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
                            <span id="Fecha">${pelicula.release_date}</span>
                            <span id="Categoria">Movie</span>
                            <span id="Tipo">PG</span>
                        </div>
                        <h4>${pelicula.title}</h4>
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
            Populars.forEach(Popular=>{
                populares += `<div class="Movie-recomend">
                    <img src="https://image.tmdb.org/t/p/w500/${Popular.backdrop_path}" alt="Logo">
                    <div>
                        <span id="Fecha--estreno">${Popular.release_date || Popular.first_air_date}</span>
                        <span id="Catagoria--movie">${Popular.media_type}</span>
                        <span id="Tipo--movie">PG</span>
                    </div>
                    <h4>${Popular.title || Popular.name}</h4>
                </div>`;
            })
            document.getElementById('List--Movies').innerHTML = populares;
        }
    }catch(e){
        console.error(`Hubo un error ${e}`)
    }
}
obtener_peliculas_populares();
obtener_peliculas();
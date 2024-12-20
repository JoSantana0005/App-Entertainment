let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
const List_series = document.getElementById('Series');

// Evento para actualizar las series de la pagina
function Arrow_left(){
    const arrow_L = document.getElementById('Arrow_left');
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
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
        }else{
            console.log("Hubo un error")
        }
    })
}
// Funcion que determina el tipo de serie
function ClasiSerie(Vote){
    if(Vote >= 8){
        return "PG-13"
    }else if(Vote >= 5){
        return "PG"
    }else{
        return "R"
    }
}
// Solicitud a la api para obtner todas las series TV
const obtener_Series = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${key}&language=en-US&page=${page}`)
        console.log(respuesta)
        if(respuesta.status == 200){
            const datos = await respuesta.json();
            console.log(datos)
            const Series = datos.results;
            let List = '';
            Series.forEach(Serie => {
                List += `<div class="Series--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Serie.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha--serie">${Serie.first_air_date}</span>
                            <span id="Catalogo">TV</span>
                            <span id="Tipo-serie">${ClasiSerie(Serie.vote_average)}</span>
                        </div>
                        <h4>${Serie.name}</h4>
                    </div>`;
            });
            
            if(List_series){
                List_series.innerHTML = List;
            }else{
                console.log("Hubo un error");
            }
        }
    }catch(e){
        console.log(`Hubo un error ${e}`)
    }
}
obtener_Series();
Arrow_left();
Arrow_right();
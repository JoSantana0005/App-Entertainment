let page = 1;
const key = 'a123512ad7d1eb8f1ff144501c87ec1a';
const ContainerSeries = document.getElementsByClassName('Series-section')[0];
let Title = document.getElementById('Title');
let series_list = [];
// Function para actualizar el contenido de la section
function ActualizarContent(){
    ContainerSeries.innerHTML = `<article class="Title--section">
                <h1 id="Title">TV Series</h1>
                <div>
                    <svg id="Arrow_left" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    <svg id="Arrow_right" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </div>
            </article>
            <article class="List--series">
                <div class="Series" id="Series"></div>
            </article>`
}
// Function para mostrar los resultados de la busqueda
function MostrarSearch(){
    ContainerSeries.innerHTML = `<article class="Title--section">
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
            <article class="List--series">
                <div class="Series" id="Series"></div>
            </article>`
}
// Function para llamar a los oyentes de la actaulizacion
function LLamarOyentes(){
    let arrow_L = document.getElementById('Arrow_left');
    let arrow_R = document.getElementById('Arrow_right');

    // Eventos para actualzar las series
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
            obtener_Series();
        }else{
            console.log("Hubo un error")
        }
    })
    
    arrow_R.addEventListener('click',()=>{
        if(arrow_R){
            page++;
            obtener_Series();
        }else{
            console.log("Hubo un error")
        }
    })
}
// Evento para actualizar las series de la pagina
function Arrow_left(){
    const arrow_L = document.getElementById('Arrow_left');
    arrow_L.addEventListener('click',()=>{
        if(arrow_L){
            page--;
            obtener_Series();
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
            obtener_Series();
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
            series_list = Series.map(Serie => {
                List += `<div class="Series--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Serie.backdrop_path}" alt="Logo">
                        <div>
                            <span id="Fecha--serie">${Serie.first_air_date}</span>
                            <span id="Catalogo">${Serie.media_type}</span>
                            <span id="Tipo-serie">${ClasiSerie(Serie.vote_average)}</span>
                        </div>
                        <h4>${Serie.name}</h4>
                    </div>`;
                return {name: Serie.name, 
                    Poster: Serie.backdrop_path, 
                    Fecha: Serie.first_air_date, 
                    categoria: Serie.media_type,
                    Tipo: ClasiSerie(Serie.vote_average) 
                }
            });
            document.getElementById('Series').innerHTML = List;
        }
    }catch(e){
        console.log(`Hubo un error ${e}`)
    }
}
// Evento para buscar series
const Search = document.getElementById('Search--Favorite');
Search.addEventListener('input',(e)=>{
    const Value_input = e.target.value.trim();
    let buscador = '';
    if(Value_input == ''){
        ActualizarContent();
        LLamarOyentes();
        obtener_Series();
    }else{
        Title.innerText = 'Founds the results';
        MostrarSearch();
        series_list.forEach(Serie =>{
            const IsVisible = Serie.name.toLowerCase().includes(Value_input.toLowerCase());
            if(IsVisible){
                buscador += `<div class="Series--List">
                        <img src="https://image.tmdb.org/t/p/w500/${Serie.Poster}" alt="Logo">
                        <div>
                            <span id="Fecha--serie">${Serie.Fecha}</span>
                            <span id="Catalogo">${Serie.categoria}</span>
                            <span id="Tipo-serie">${Serie.Tipo}</span>
                        </div>
                        <h4>${Serie.name}</h4>
                    </div>`;
            }
        })
        if(buscador != ''){
            document.getElementById('Series').innerHTML = buscador;
        }else{
            document.getElementById('Series').innerHTML = '<p>No hay</p>';
        }
    }
})

obtener_Series();
Arrow_left();
Arrow_right();
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
        }
    })
}
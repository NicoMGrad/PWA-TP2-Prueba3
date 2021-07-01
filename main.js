window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnDesplegar = document.getElementById('desplegar'),
        wWidth = window.matchMedia("(max-width:800px)").matches,
        cuadroBusqueda = document.querySelector('.contenedor_busqueda'),
        cuadroResultados = document.getElementById('resultados'),
        btnBuscar = document.getElementById('buscar');


    function windowSize(viewport, cuadro){
        if (viewport) {
            cuadro.style.marginTop = '7rem';
        } else {
            cuadro.style.marginTop = '0rem';
        }
    };

    windowSize(wWidth,cuadroBusqueda);
    

    btnDesplegar.addEventListener('click', function(){
        if (cuadroBusqueda.style.marginTop == '7rem') {
            cuadroBusqueda.style.marginTop = '-28rem';
            btnDesplegar.style.transform = 'rotate(-270deg)';
        } else if (cuadroBusqueda.style.marginTop == '-28rem'){
            cuadroBusqueda.style.marginTop = '7rem';
            btnDesplegar.style.transform = 'rotate(-90deg)';
        }
    });

    if (localStorage) {
        if (!window.location.href.includes('historia')) {
            //resultados(JSON.parse(localStorage.getItem('lastResult')));
        }
    } else {
        consulta(termino.value);
        storeInLocalStorage();
    }


    btnBuscar.addEventListener('click', function(){
        consulta(termino.value);
        storeInLocalStorage();
        if (wWidth) {
            window.scrollTo({
                bottom: 0,
                left: 0,
                behavior: 'smooth'});
            cuadroResultados.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'});
                if (cuadroBusqueda.style.marginTop == '7rem') {
                    cuadroBusqueda.style.marginTop = '-28rem';
                    btnDesplegar.style.transform = 'rotate(-270deg)';
                } else {
                    cuadroBusqueda.style.marginTop = '7rem';
                    btnDesplegar.style.transform = 'rotate(-90deg)';
                }
            
        } else {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'});
            cuadroBusqueda.style.marginTop = '0rem';
        }
    });

    termino.addEventListener('keypress',function(event){
        event.preventDefault;
        if (event.key === "Enter") {
            consulta(termino.value);
            storeInLocalStorage();
            if (wWidth) {
                setTimeout(function(){
                    window.scrollTo({
                        bottom: 0,
                        left: 0,
                        behavior: 'smooth'});
                    cuadroResultados.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'});
                    cuadroBusqueda.style.marginTop = '-28rem';
                },1000);
            } else {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'});
            }

        } /*else if (event.keyCode === 13){

            consulta(termino.value);
            storeInLocalStorage();
            window.scrollTo({
                bottom: 0,
                left: 0,
                behavior: 'smooth'});
            cuadroResultados.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'});
            cuadroBusqueda.style.marginTop = '-28rem';
        }*/
    });
    
    

    
    /*
    if (isInLocalStorage()) {
        let lastResult = retrieveFormLocalStorage();
    }*/


    
    function consulta(anime){
        const fetchPromise = fetch(`${base_URL}?q=${anime}&page=1`);

        fetchPromise.then(response => {
            console.log('result', response);
            if (response.ok === true) {
                return response.json();

            }
        }).then(result => {
            console.log(result);
            if (result){
                storeInLocalStorage(result);
                resultados(result);
            } 
        }).catch(err => {
            console.log('Ha habido un problema', err);
        });
    
    }

    function resultados(data) {
        const resultados = document.getElementById('resultados');

        resultados.innerHTML = data.results
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="card" onclick="window.location.href='${anime.url}'">
                    <div class="optional-header">
                    <div class="primary-title">
                        <div class="title">${anime.type}</div>
                        <div class="subhead">
                        Score:<b>${anime.score==0?1:anime.score}</b>
                        | Episodios:<b>${anime.episodes==0?1:anime.episodes}</b>
                        </div>
                    </div>
                    </div>
                    <div class="media media--16-9">
                        <p class="numero">${indiceItem(data.results,'title',anime.title)}</p>
                        <img src="${anime.image_url}" alt="${anime.title}" width="640" height="426">
                    </div>
                    <div class="primary-title">
                    <div class="primary-text">${cortarTitle(anime.title)}</div>
                    <div class="secondary-text">${anime.airing==true? 'En emisión':'Finalizado'}</div>
                    </div>
                    <div class="supporting-text">${anime.synopsis}</div>
                    <div class="actions">
                        <div class="action-buttons">
                            <button class="button buttonCard miRipple" type="button" onclick="window.location.href='${anime.url}'">+</button>
                        </div>
                    </div>
                </div>
                `
            }).join("");
    }
    

    
    function cortarTitle(titulo) {
        let nuevoTitle = '';
        if (titulo.includes(':')) {
            let aTitulo = titulo.split(":");
            let parteDos = aTitulo[1];
            aTitulo[1] = `<br/><span class="subtitulo">${parteDos}</span>`;
            nuevoTitle = aTitulo.join(": ");
        } else {
            nuevoTitle = titulo;
        }
        return nuevoTitle
    }


    function indiceItem(array, attr, valor) {
        for(let i = 0; i < array.length; i += 1) {
            if(array[i][attr] === valor) {
                return i+1;
            }
        }
        return 1;
    }

    
    function storeInLocalStorage(response) {
        localStorage.lastResult = JSON.stringify(response);
    }
/*
    function showMeTheData() {
        return JSON.parse(localStorage.lastResult);
    }
  */ 
});
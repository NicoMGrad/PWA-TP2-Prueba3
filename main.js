window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnBuscar = document.getElementById('buscar');
        

    btnBuscar.addEventListener('click', function(){
        consulta(termino.value);
        window.scrollTo(0,0);
    });

    termino.addEventListener('keypress',function(){
    if (Event.key === "Enter") {
        Event.preventDefault();
        consulta(termino.value);
        window.scrollTo(0,0);
        }
    });


    if (localStorage) {
        resultados(retrieveFormLocalStorage());
    } else {
        consulta(termino.value);
        storeInLocalStorage();
    }

    /*
    function isInLocalStorage () {
        return localStorage.lastResult;
    }*/
    function storeInLocalStorage (response) {
        localStorage.lastResult = JSON.stringify(response);
    }
    function retrieveFormLocalStorage () {
        return JSON.parse(localStorage.lastResult);
    }
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
                
            /*}else {
                noResultsElement.classList.add(showClass);*/
            }
        }).then(result => {
            console.log(result);
            if (result){
                storeInLocalStorage(result);
                resultados(result);
            }
        }).catch(err => {
            console.log('Ha habido un problema', err);
            //noResultsElement.classList.add(showClass);
        });
    
    }

    function resultados(data) {
        const resultados = document.getElementById('resultados');

        resultados.innerHTML = data.results
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="card">
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
    
    
    
    function almacenar(response) {
        localStorage.lastResult = JSON.stringify(response);
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
    
});
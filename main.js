window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnBuscar = document.getElementById('buscar');

        btnBuscar.addEventListener('click', function(){
            consulta(termino.value);
            console.log(termino.value);
        });
    
        termino.addEventListener('keypress',function(){
        if (event.key === "Enter") {
            event.preventDefault();
            consulta(termino.value);
            console.log(termino.value);
        }
    });

    
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
                almacenar(result);
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
                        <div class="subhead">Score: ${anime.score==0?1:anime.score} 
                            <span class="material-icons">
                                star
                            </span>
                        </div>
                    </div>
                    </div>
                    <div class="media media--16-9">
                        <p class="numero">${numero(data.results,anime.title)}</p>
                        <img src="${anime.image_url}" alt="${anime.title}" width="640" height="426">
                    </div>
                    <div class="primary-title">
                    <div class="primary-text">${cortarTitle(anime.title)}</div>
                    <div class="secondary-text">${anime.airing==true? 'En emisión':'Finalizado'}</div>
                    </div>
                    <div class="supporting-text">${anime.synopsis}</div>
                    <div class="actions">
                        <div class="action-buttons">
                            <button class="button buttonCard" type="button" onclick="window.location.href='${anime.url}'">+</button>
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
            console.log(aTitulo);
            let parteDos = aTitulo[1];
            aTitulo[1] = `<br/><span class="subtitulo">${parteDos}</span>`;
            nuevoTitle = aTitulo.join(": ");
        } else {
            nuevoTitle = titulo;
        }
        return nuevoTitle
    }

    function numero(objeto,termino) {
        let findNum = objeto.findIndex(termino);
        return findNum
    }
    
});
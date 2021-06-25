window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnBuscar = document.getElementById('buscar');

    termino.addEventListener('keypress',function(){
        if (event.key === "Enter") {
            event.preventDefault();
            consulta(termino.value);
            console.log(termino.value);
        }
    });

    btnBuscar.addEventListener('click', function(){
        consulta(termino.value);
        console.log(termino.value);
    })

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
                            <div class="thumbnail thumbnail--40x40">
                                <img src="${anime.image_url}" alt="" width="40" height="40">
                            </div>
                            <div class="primary-title">
                                <div class="title">
                                    ${anime.type}
                                </div>
                                <div class="subhead">
                                    ${anime.airing == true? 'En emisión':'Finalizada'}
                                </div>
                            </div>
                        </div>
                        <div class="media media--16-9"> 
                            <img src="${anime.image_url}" alt="" width="640" height="426">
                        </div>
                        <div class="primary-title">
                            <div class="primary-text">
                                ${anime.tittle}
                            </div>
                            <div class="secondary-text">
                                ${anime.episodes == null? 1:anime.episodes}
                            </div>
                        </div>
                        <div class="supporting-text">
                            ${anime.synopsis}
                        </div>
                        <div class="actions">
                            <div class="action-buttons">
                                <button class="button" type="button" onclick="window.location.href='${anime.url}'">
                                    Ver más
                                </button>
                            </div>
                        </div>
                    </div>
                `

            }).join("");
    }
    
    
    
    function almacenar(response) {
        localStorage.lastResult = JSON.stringify(response);
    }
    
    
    
});
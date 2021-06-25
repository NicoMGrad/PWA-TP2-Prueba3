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
                    <div class="component-wrapper card-component-wrapper">
                        <div class="mdc-card demo-card">
                        <div class="mdc-card__primary-action" tabindex="0">
                            <div class="mdc-card__media mdc-card__media--16-9 demo-card__media" style="background-image: ${anime.image_url};);"></div>
                            <div class="demo-card__primary">
                                <h3 class="demo-card__subtitle mdc-typography mdc-typography--overline">${anime.type}</h3>
                            <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${anime.tittle}</h2>
                            </div>
                            <div class="demo-card__secondary mdc-typography mdc-typography--body2">${anime.synopsis}</div>
                        </div>
                        <div class="mdc-card__actions">
                            <div class="mdc-card__action-buttons">
                            <button class="mdc-button mdc-card__action mdc-card__action--button" onclick="window.location.href='${anime.url}>Ver más</button>
                            </div>
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
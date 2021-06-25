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
                    <div class="primary-title">
                        <div class="title">Title</div>
                        <div class="subhead">Subhead</div>
                    </div>
                    </div>
                    <div class="media media--16-9"> <img src="${anime.image_url}" alt="" width="640" height="426"> </div>
                    <div class="primary-title">
                    <div class="primary-text">Primary text goes here</div>
                    <div class="secondary-text">Secondary text</div>
                    </div>
                    <div class="supporting-text">Supporting text include text like an article summary or a restaurant description.</div>
                    <div class="actions">
                    <div class="action-buttons">
                        <button class="button" type="button">Action 1</button>
                        <button class="button" type="button">Action 2</button>
                    </div>
                    <div class="action-icons float-right"> <i class="material-icons action-icon" role="button" title="Share">share</i> <i class="material-icons action-icon" role="button" title="More options">more_vert</i> </div>
                    </div>
                </div>




                `

            }).join("");
    }
    
    
    
    function almacenar(response) {
        localStorage.lastResult = JSON.stringify(response);
    }
    
    
    
});
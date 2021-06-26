window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnBuscar = document.getElementById('buscar'),
        video = { 'nombre': 'historia_anime'};

        btnBuscar.addEventListener('click', function(){
            consulta(termino.value);
            termino.value = '';
        });
    
        termino.addEventListener('keypress',function(){
        if (e.key === "Enter") {
            e.preventDefault();
            consulta(termino.value);
            termino.value = '';
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

    function init() {
        for(let i = 0; i < videos.length; i++) {
          let objectStore = db.transaction('videos_os').objectStore('videos_os');
          let request = objectStore.get(videos[i].name);
          request.onsuccess = function() {
            if(request.result) {
              // Toma los videos del IDB y los muestra usando displayVideo()
              console.log('tomando videos del IDB');
              displayVideo(request.result.mp4, request.result.webm, request.result.name);
            } else {
              // Recuperar los videos de la red
              fetchVideoFromNetwork(videos[i]);
            }
          };
        }
      }
    
});
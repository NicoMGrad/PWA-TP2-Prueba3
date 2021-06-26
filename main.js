window.addEventListener('DOMContentLoaded', function(){

const   base_URL = 'https://api.jikan.moe/v3/search/anime',
        termino = document.getElementById('busqueda'),
        btnBuscar = document.getElementById('buscar'),
        video = [{'nombre':'historia_anime'}];

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
            let request = objectStore.get(videos[i].nombre);
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

    let mp4Blob = fetch('videos/' + video.nombre + '.mp4').then(response =>
        response.blob()
      );

    let webmBlob = fetch('videos/' + video.nombre + '.webm').then(response =>
    response.blob()
    );
      
    // Ejecuta el siguiente código solo cuando se hayan cumplido ambas promesas
    Promise.all([mp4Blob, webmBlob]).then(function(values) {

        // muestra el video obtenido de la red con displayVideo()
        displayVideo(values[0], values[1], video.nombre);
        // lo almacena en el IDB usando storeVideo()
        storeVideo(values[0], values[1], video.nombre);

    });

    función storeVideo(mp4Blob, webmBlob, nombre) {
        // Abre transacción, obtiene el almacén de objetos; lo convierte en lectura y escritura para que podamos escribir en el IDB
        let objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
        // Crea un registro para agregar al IDB
        let record = {
          mp4 : mp4Blob,
          webm : webmBlob,
          nombre : nombre
        }
      
        // Agrega el registro al IDB usando add()
        let request = objectStore.add(record);

      
      };

      function displayVideo(mp4Blob, webmBlob, title) {
        // Crea URL del objeto a partir de blobs
        let mp4URL = URL.createObjectURL(mp4Blob);
        let webmURL = URL.createObjectURL(webmBlob);

      
        const video = document.createElement('video');
        video.controls = true;
        const source1 = document.createElement('source');
        source1.src = mp4URL;
        source1.type = 'video/mp4';
        const source2 = document.createElement('source');
        source2.src = webmURL;
        source2.type = 'video/webm';

        const resultados = document.getElementById('resultados');
        resultados.appendChild(video);
        video.appendChild(source1);
        video.appendChild(source2);

      }

      // (see onupgradeneeded below)
        let request = window.indexedDB.open('videos_os', 1);

        // onerror handler signifies that the database didn't open successfully
        request.onerror = function() {
            console.log('Database failed to open');
        };

        // onsuccess handler signifies that the database opened successfully
        request.onsuccess = function() {
            console.log('Database opened succesfully');

            // Store the opened database object in the db variable. This is used a lot below
            db = request.result;
            init();
        };

        // Setup the database tables if this has not already been done
        request.onupgradeneeded = function(e) {

            // Grab a reference to the opened database
            let db = e.target.result;

            // Create an objectStore to store our videos in (basically like a single table)
            // including a auto-incrementing key
            let objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

            // Define what data items the objectStore will contain
            objectStore.createIndex('mp4', 'mp4', { unique: false });
            objectStore.createIndex('webm', 'webm', { unique: false });

            console.log('Database setup complete');
        }
    
});

//window.addEventListener('DOMContentLoaded', function(){

    function cargaVideo() {

        const videos = [{'nombre':'historia_anime'}];
        let db;

        function init() {
            for(let i = 0; i < videos.length; i++) {
                let objectStore = db.transaction('videos_os').objectStore('videos_os');
                let request = objectStore.get(videos[i].nombre);
                request.onsuccess = function() {
                    if(request.result) {
                    // Toma los videos del IDB y los muestra usando displayVideo()
                        console.log('tomando videos del IDB');
                        displayVideo(request.result.mp4, request.result.webm, request.result.nombre);
                    } else {
                    // Recuperar los videos de la red
                        fetchVideoFromNetwork(videos[i]);
                    }
                };
            }
        }
        function fetchVideoFromNetwork(videos) {
            console.log('fetching videos from network');
            let mp4Blob = fetch('videos/' + videos.nombre + '.mp4').then(response =>
                response.blob()
            );

            let webmBlob = fetch('videos/' + videos.nombre + '.webm').then(response =>
            response.blob()
            );
        
            // Ejecuta el siguiente código solo cuando se hayan cumplido ambas promesas
            Promise.all([mp4Blob, webmBlob]).then(function(values) {

            // muestra el video obtenido de la red con displayVideo()
            displayVideo(values[0], values[1], videos.nombre);
            // lo almacena en el IDB usando storeVideo()
            storeVideo(values[0], values[1], videos.nombre);

            });
        }

        function storeVideo(mp4Blob, webmBlob, nombre) {
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
        video.id = 'videoControl';
        video.controls = true;
        const source1 = document.createElement('source');
        source1.src = mp4URL;
        source1.type = 'video/mp4';
        const source2 = document.createElement('source');
        source2.src = webmURL;
        source2.type = 'video/webm';

        const resultados = document.getElementById('video');
        resultados.appendChild(video);
        video.appendChild(source1);
        video.appendChild(source2);

        }

        // (see onupgradeneeded below)
        let request = window.indexedDB.open('videos_db', 1);

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
            let objectStore = db.createObjectStore('videos_os', { keyPath: 'nombre' });

            // Define what data items the objectStore will contain
            objectStore.createIndex('mp4', 'mp4', { unique: false });
            objectStore.createIndex('webm', 'webm', { unique: false });

            console.log('Database setup complete');
        }
    }

        cargaVideo();
//});
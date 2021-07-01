
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
                        console.log('tomando videos del IDB');
                        displayVideo(request.result.mp4, request.result.webm, request.result.nombre);
                    } else {
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
        
            Promise.all([mp4Blob, webmBlob]).then(function(values) {

            displayVideo(values[0], values[1], videos.nombre);
            storeVideo(values[0], values[1], videos.nombre);

            });
        }

        function storeVideo(mp4Blob, webmBlob, nombre) {
            let objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
            let record = {
                mp4 : mp4Blob,
                webm : webmBlob,
                nombre : nombre
            }
            let request = objectStore.add(record);

        };

        function displayVideo(mp4Blob, webmBlob, title) {

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

        let request = window.indexedDB.open('videos_db', 1);

        request.onerror = function() {
            console.log('Database failed to open');
        };

        request.onsuccess = function() {
            console.log('Database opened succesfully');

            db = request.result;
            init();
        };

        request.onupgradeneeded = function(e) {

            let db = e.target.result;

            let objectStore = db.createObjectStore('videos_os', { keyPath: 'nombre' });

            objectStore.createIndex('mp4', 'mp4', { unique: false });
            objectStore.createIndex('webm', 'webm', { unique: false });

            console.log('Database setup complete');
        }
    }

cargaVideo();
//});
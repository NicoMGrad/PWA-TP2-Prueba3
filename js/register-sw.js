//const resultados = document.getElementById('resultados');
const divBusqueda = document.querySelector('.contenedor_busqueda');
const botonDesplegar = document.getElementById('desplegar');
const main = document.querySelector('main');
const cuadroTetera = `
                      <div class="contenedor_busqueda">
                        <h1>418<br/>ERROR</h1>
                        <h2>SOY UNA TETERA</h2>
                        <p class="base">
                            <span>
                                Chiste, aún no somos una tetera pero lamentablemente detectamos que no estás conectado a internet.
                                ¡No desesperes! Intentaremos conectarnos, pero mientras conocé más de este fantástico mundo que es el animé.
                            </span>
                        </p>
                      </div>
                    `;

const cuadroHistoria = `
                        <div class="contenedor_busqueda">
                            <h1>Ohayoo<br/>Historia!</h1>
                            <h2>ANIME|MANGA|VIDEOGAMES</h2>
                            <p class="base">
                                <span>
                                    ¿Siempre te preguntaste cómo nació este maravilloso arte?¿Cómo es que un pequeño país aislado se volvió una potencia cultural? Chequeá esta nota donde te contamos los orígenes del animé japonés.
                                </span>
                            </p>
                        </div>
                      `;

const cuadroBusqueda = `
                        <div class="contenedor_busqueda">       
                          <h1>Ohayoo<br/>Akiahabara!</h1>
                          <h2>ANIME|MANGA|VIDEOGAMES</h2>
                          <p class="base">
                              <span>
                                  ¡Bienvenido a Ohayo Akihabara! Consultá el estado de tu animé favorito, chequeá los OVAS o capítulos especiales y enterate de las últimas películas publicadas. Simplemente insertá el nombre debajo y el buscador te mostrará toda la información de ese animé. Itadaikimasu!
                              </span>
                          </p>
                          <form onSubmit="return false;">
                              <div class="wrapper">
                                  <div class="input-data">
                                    <input type="search" id="busqueda" value="" title="Search" required>
                                    <div class="underline"></div>
                                    <label>Busca tu animé, onii-chan</label>
                                  </div>
                              </div>
                              <button type="button" class="btnMiRipple miRipple" id="buscar">
                                  <span class="material-icons">
                                      search
                                  </span>
                                  Buscar
                              </button>
                          </form>
                        </div>
                      `;

const desplegarDiv = `<div id="desplegar" style="transform: rotate(-90deg);">»</div>`;

const resultadosHistoria = `
                            <div id="resultados">
                              <div class="historia">
                                <h3>La historia<br/>del <span>animé</span></h3>
                                <h4>En sus inicios, alrededor de 1900, la animación japonesa recibe el nombre de senga eiga (literalmente “películas de líneas dibujadas”), más tarde se conocerá con el término Doga (imágenes en movimiento) y, finalmente, sobre 1960 pasará a llamarse animeeshon originalmente (アニメーション animēshon). De ahí que se abrevie a «anime» (アニメ).</h4>
                                <p class="base">
                                    Por otra parte se cree que es una palabra de origen francés.3​ El anime es un medio de gran expansión en Japón, siendo al mismo tiempo un producto de entretenimiento comercial y cultural, lo que ha ocasionado un fenómeno cultural en masas populares y una forma de arte tecnológico. <span>potencialmente dirigido a todos los públicos, desde niños, adolescentes, adultos;</span> hasta especializaciones de clasificación esencialmente tomada de la existente para el manga, con clases base diseñadas para especificaciones sociodemográficos tales como empleados, amas de casa, estudiantes, etc. Por lo tanto, pueden hacer frente a los sujetos, temas y <span>géneros tan diversos</span> como el amor, aventura, ciencia ficción, cuentos infantiles, literatura, deportes, horror, fantasía, comedia y muchos otros.</p>

                                    <div id="video">
                                    </div>

                                    <p class="base">El anime tradicionalmente <span>dibujado a mano y al principio los procesos realizados de forma digital eran muy específicos</span> (retoque y montaje). Sin embargo, en la actualidad las tareas más comunes dentro de la producción de una animación, como podría ser el coloreado o los efectos visuales (brillos, sombras, luz ambiental, etc.), se hacen con aplicaciones digitales, que permiten un mayor control sobre el trabajo y ayudan a agilizar la labor de los dibujantes a niveles insospechados en un proceso de animación tradicional.6​ Sus guiones incluyen gran parte de los géneros de ficción y son transmitidos a través de medios audiovisuales (transmisión por televisión, distribución en formatos de vídeo doméstico y películas con audio). <span>La relación del anime con el manga es estrecha</span>, pues históricamente una gran cantidad de series y trabajos de anime se basan en historias de manga populares. Además, también guarda estrecha relación con las novelas visuales.</p>

                                    <p class="base"> El anime se caracteriza fundamentalmente por el uso particular de la llamada animación limitada, la expresión en plano, la suspensión del tiempo, su amplitud temática, la presencia de personajes históricos, su compleja línea narrativa y sobre todo, un peculiar estilo de dibujo, con personajes caracterizados por ojos grandes y ovalados, de línea muy definida, colores llamativos y movimiento reducido de los labios.</p>
                                </p>
                              </div>
                            </div>
                          `;

const resultadosVacio = `
                          <div id="resultados">
                          </div>
                        `;


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
      .then(reg => {
        console.log("Service worker esta listo!");
      });
}
else {
  console.log("Service worker no soportado.");
}

window.addEventListener('offline', event => {
  main.innerHTML = cuadroTetera + resultadosHistoria;
  //location.reload();
  if (window.matchMedia('max-width:800px;')) {
    divBusqueda.style.marginTop = '7rem';
  } else {
    divBusqueda.style.marginTop = '0rem';
  }
  cargaVideo();
});

window.addEventListener('online', event => {
  //location.reload();
  /*if (window.location.href.includes('historia')) {
    main.innerHTML = cuadroHistoria + resultadosHistoria;
  } else {
    main.innerHTML = cuadroBusqueda + desplegarDiv + resultadosVacio;
    if (window.matchMedia('max-width:800px;')) {
      desplegarDiv.style.marginTop = '7rem';
    }
  }*/
  cargaVideo();
});


// Fallback //

if (!navigator.onLine) {
  main.innerHTML = cuadroTetera + resultadosHistoria;
  //location.reload();
  if (window.matchMedia('max-width:800px;')) {
    divBusqueda.style.marginTop = '7rem';
  } else {
    divBusqueda.style.marginTop = '0rem';
  }
  cargaVideo();
} 



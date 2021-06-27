const resultados = document.getElementById('resultados');

// Chequeo si el browser puede usar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
      .then(reg => {
        console.log("Service worker esta listo!");
      });
}
else {
  console.log("Service worker no soportado.");
}

// Event Listener para Offline/ Online Status
window.addEventListener('offline', event => {
  document.querySelector('body').classList.add('offline');
  resultados.innerHTML = `
    <div class="historia">
    <h3>La historia<br/>del <span>animé</span></h3>
    <h4>En sus inicios, alrededor de 1900, la animación japonesa recibe el nombre de senga eiga (literalmente “películas de líneas dibujadas”), más tarde se conocerá con el término Doga (imágenes en movimiento) y, finalmente, sobre 1960 pasará a llamarse animeeshon originalmente (アニメーション animēshon). De ahí que se abrevie a «anime» (アニメ).</h4>
    <p class="base">
        Por otra parte se cree que es una palabra de origen francés.3​ El anime es un medio de gran expansión en Japón, siendo al mismo tiempo un producto de entretenimiento comercial y cultural, lo que ha ocasionado un fenómeno cultural en masas populares y una forma de arte tecnológico. <span>potencialmente dirigido a todos los públicos, desde niños, adolescentes, adultos;</span> hasta especializaciones de clasificación esencialmente tomada de la existente para el manga, con clases base diseñadas para especificaciones sociodemográficos tales como empleados, amas de casa, estudiantes, etc. Por lo tanto, pueden hacer frente a los sujetos, temas y <span>géneros tan diversos</span> como el amor, aventura, ciencia ficción, cuentos infantiles, literatura, deportes, horror, fantasía, comedia y muchos otros.</p>

        <div id="video"></div>

        <p class="base">El anime tradicionalmente <span>dibujado a mano y al principio los procesos realizados de forma digital eran muy específicos</span> (retoque y montaje). Sin embargo, en la actualidad las tareas más comunes dentro de la producción de una animación, como podría ser el coloreado o los efectos visuales (brillos, sombras, luz ambiental, etc.), se hacen con aplicaciones digitales, que permiten un mayor control sobre el trabajo y ayudan a agilizar la labor de los dibujantes a niveles insospechados en un proceso de animación tradicional.6​ Sus guiones incluyen gran parte de los géneros de ficción y son transmitidos a través de medios audiovisuales (transmisión por televisión, distribución en formatos de vídeo doméstico y películas con audio). <span>La relación del anime con el manga es estrecha</span>, pues históricamente una gran cantidad de series y trabajos de anime se basan en historias de manga populares. Además, también guarda estrecha relación con las novelas visuales.</p>

        <p class="base"> El anime se caracteriza fundamentalmente por el uso particular de la llamada animación limitada, la expresión en plano, la suspensión del tiempo, su amplitud temática, la presencia de personajes históricos, su compleja línea narrativa y sobre todo, un peculiar estilo de dibujo, con personajes caracterizados por ojos grandes y ovalados, de línea muy definida, colores llamativos y movimiento reducido de los labios.</p>
    </p>
  </div>
  `;
  //cargaVideo();
});

window.addEventListener('online', event => {
  document.querySelector('body').classList.remove('offline');
  resultados.innerHTML= ` 
      <div class="historia">
      <h3>La historia<br/>del <span>animé</span></h3>
      <h4>En sus inicios, alrededor de 1900, la animación japonesa recibe el nombre de senga eiga (literalmente “películas de líneas dibujadas”), más tarde se conocerá con el término Doga (imágenes en movimiento) y, finalmente, sobre 1960 pasará a llamarse animeeshon originalmente (アニメーション animēshon). De ahí que se abrevie a «anime» (アニメ).</h4>
      <p class="base">
      Por otra parte se cree que es una palabra de origen francés.3​ El anime es un medio de gran expansión en Japón, siendo al mismo tiempo un producto de entretenimiento comercial y cultural, lo que ha ocasionado un fenómeno cultural en masas populares y una forma de arte tecnológico. <span>potencialmente dirigido a todos los públicos, desde niños, adolescentes, adultos;</span> hasta especializaciones de clasificación esencialmente tomada de la existente para el manga, con clases base diseñadas para especificaciones sociodemográficos tales como empleados, amas de casa, estudiantes, etc. Por lo tanto, pueden hacer frente a los sujetos, temas y <span>géneros tan diversos</span> como el amor, aventura, ciencia ficción, cuentos infantiles, literatura, deportes, horror, fantasía, comedia y muchos otros.</p>

      <div id="video"></div>

      <p class="base">El anime tradicionalmente <span>dibujado a mano y al principio los procesos realizados de forma digital eran muy específicos</span> (retoque y montaje). Sin embargo, en la actualidad las tareas más comunes dentro de la producción de una animación, como podría ser el coloreado o los efectos visuales (brillos, sombras, luz ambiental, etc.), se hacen con aplicaciones digitales, que permiten un mayor control sobre el trabajo y ayudan a agilizar la labor de los dibujantes a niveles insospechados en un proceso de animación tradicional.6​ Sus guiones incluyen gran parte de los géneros de ficción y son transmitidos a través de medios audiovisuales (transmisión por televisión, distribución en formatos de vídeo doméstico y películas con audio). <span>La relación del anime con el manga es estrecha</span>, pues históricamente una gran cantidad de series y trabajos de anime se basan en historias de manga populares. Además, también guarda estrecha relación con las novelas visuales.</p>

      <p class="base"> El anime se caracteriza fundamentalmente por el uso particular de la llamada animación limitada, la expresión en plano, la suspensión del tiempo, su amplitud temática, la presencia de personajes históricos, su compleja línea narrativa y sobre todo, un peculiar estilo de dibujo, con personajes caracterizados por ojos grandes y ovalados, de línea muy definida, colores llamativos y movimiento reducido de los labios.</p>
  </p>
</div>`;
});

// A veces este evento falla, ojo!
// Sirve para saber si el navegador esta offline, cuando entramos offline. 
// Es decir, no se disparo los eventos de arriba aun, y necesito conocer el estado.
// 

if (!navigator.onLine) {
  document.querySelector('body').classList.add('offline');
}
<template>
  <main>
    <section class="containerPresentacion">
      <h2>Crees que sabes de música?</h2>
      <p>
        En este juego tendras que escuchar fragmentos de 5 segundos y adivinar la canción correcta.
        Intenta conseguir todos los puntos posibles para quedar entre los mejores!
      </p>

      <router-link to="/nombre" class="botonPresentacion"> Comenzar Juego </router-link>
      <router-link to="/ranking" class="botonPresentacion"> Ver Ranking</router-link>
    </section>
    <section class="containerInfo">
      <h2>Como funciona?</h2>
      <p></p>
      <div class="reglas">
        <div class="regla">
          <img class="reglaImagen" src="../img/escucha.png" alt="Escuchar" />
          <h4>Escucha</h4>
          <p>Cada pregunta consta de un fragmento de 5 segundos de una cancion.</p>
        </div>
        <div class="regla">
          <img class="reglaImagen" src="../img/elige.png" alt="Eleccion" />
          <h4>Elige</h4>
          <p>Deberas elegir la respuesta correcta entre las 4 opciones disponibles.</p>
        </div>
        <div class="regla">
          <img class="reglaImagen" src="../img/puntos.png" alt="Puntaje" />
          <h4>Puntos</h4>
          <p>
            Por cada respuesta correcta obtendras 10 puntos. Si respondes incorrectamente no
            obtendras puntos.
          </p>
        </div>
        <div class="regla">
          <img class="reglaImagen" src="../img/ranking.png" alt="Ranking" />
          <h4>Ranking</h4>
          <p>Al finalizar el quiz podras ver tu puntuacion y compararla con otros jugadores.</p>
        </div>
      </div>
    </section>
    <section class="containerPuntaje">
      <h2 class="tituloPuntaje">Sistema de Puntaje</h2>
      <div class="info">
        <div>
          <h3>10</h3>
          <p>Preguntas por partida</p>
        </div>
        <div>
          <h3>100</h3>
          <p>Puntos máximos</p>
        </div>
        <div>
          <h3>5s</h3>
          <p>Por canción</p>
        </div>
      </div>
    </section>
    <section class="containerComienzo">
      <div class="comienzoInfo">
        <img src="../img/llama.png" alt="Comienzo" />
        <h3>Listo para el desafio?</h3>
        <p>Demuestra que eres un experto musical y alcanza el top del ranking</p>
        <router-link to="/nombre" class="buttonRouter"> Empezar Ahora </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

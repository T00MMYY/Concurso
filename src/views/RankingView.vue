<template>
  <section class="containerRanking">
    <h2>Ranking del Concurso</h2>
    <p>TOP 10</p>

    <table class="tablaRanking" v-if="scoreboard.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Puntuación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in scoreboard" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ score.nombre }}</td>
          <td>{{ score.puntuacion }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else style="color:rgb(65, 54, 54);">No hay puntuaciones registradas aún.</p>
    <div style="display: flex; flex-direction: row; gap: 30px;">
      <Router-Link to="/" style="
        text-decoration: none;
        color: black;
        background-color: #f7b731;
        padding: 8px;
        border-radius: 8px;
      ">Volver al inicio</Router-Link>
      <RouterLink to="/Juego" style="
        text-decoration: none;
        color: black;
        background-color: #f7b731;
        padding: 8px;
        border-radius: 8px;
        ">Reiniciar juego</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const scoreboard = ref([])

onMounted(() => {
  const data = localStorage.getItem('scoreboard')
  if (data) {
    scoreboard.value = JSON.parse(data)
  }
})
</script>

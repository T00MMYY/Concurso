<template>
  <section class="containerUser">
    <div class="infoUser">
      <h2>Bienvenido al Concurso</h2>
      <p class="explicacion">Escucha partes de 5 segundos y adivina el titulo de la canción</p>
      <div class="explicacionReglas">
        <p>1. Escucha el fragmento de la canción</p>
        <p>2. Elige la respuesta correcta entre 4 opciones</p>
        <p>3. Gana 10 puntos por cada respuesta correcta</p>
        <p>4. Consigue la mayor puntuación para estar top 1</p>
      </div>
      <input type="text" v-model="name" placeholder="👤 Introduce tu nombre" class="iconoUser" />
      <p v-if="mensajeError" class="mensajeError" style="font-size: 11px; color: red; font-weight: 600;">{{ mensajeError
      }}</p>
      <button class="buttonComenzar" @click="comenzarJuego()"> ▶︎ Comenzar Juego</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContestStore } from '../stores/counter'

const name = ref('')
const mensajeError = ref('')

const router = useRouter()
const contestStore = useContestStore()

function comenzarJuego() {
  if (!name.value.trim()) {
    mensajeError.value = 'Introduzca un nombre antes de comenzar'
    return
  }
  contestStore.setName(name.value.trim())
  localStorage.setItem('playerName', name.value.trim())

  router.push('/juego')
}
</script>

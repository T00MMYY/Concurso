<template>
  <section class="containerConcurso">
    <div class="tituloConcurso">
      <h2>
        El Concurso ha comenzado <strong>{{ contestStore.nombreJugador }}</strong>
      </h2>
      <p>Intenta adivinar el máximo de canciones posibles</p>
    </div>



    <div v-if="!finalizado" class="containerPreguntas">
      <h4>Pregunta {{ preguntaIndex + 1 }} de {{ preguntas.length }}</h4>

      <p>🎧 Escuchando fragmento de canción...</p>
      <p> 🎜 Que canción es?</p>
      <div class="respuestas">
        <button v-for="opcion in opciones" :key="opcion.index" :class="getClase(opcion.index)"
          @click="seleccionarRespuesta(opcion.index)">
          {{ opcion.text }}
        </button>
      </div>
      <div class="controlVolumen">
        <label for="volumen">Volumen: {{ Math.round(volumen * 100) }}%</label>
        <input type="range" id="volumen" min="0" max="1" step="0.01" v-model="volumen" />
      </div>

      <div class="contador">Tiempo restante: {{ tiempoRestante }}</div>

      <div class="mensaje" v-if="mensaje">{{ mensaje }}</div>

      <button class="siguienteCancion" v-if="seleccionado !== null || tiempoRestante <= 0" @click="siguientePregunta">
        Siguiente
      </button>
    </div>

    <div v-else-if="finalizado" class="final">
      <h2>El concurso ha terminado</h2>
      <p>Has conseguido un total de {{ puntuacion }} puntos</p>
      <button @click="reiniciarJuego">Jugar de nuevo</button>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { canciones } from '../data/canciones'
import { useContestStore } from '@/stores/counter'

const contestStore = useContestStore()

const preguntas = ref([])
const preguntaIndex = ref(0)
const opciones = ref([])
const puntuacion = ref(0)
const juegoIniciado = ref(false)
const finalizado = ref(false)
const seleccionado = ref(null)
const mensaje = ref('')

const volumen = ref(0.05)
const tiempoRestante = ref(5)
let timer = null
const audioRef = ref(null)
let currentAudio = null

// WATCHER: sirve para sincronizar volumen con el audio
watch(volumen, (newVolume) => {
  if (currentAudio) {
    currentAudio.volume = newVolume
  }
})

function empezarTemporizador() {
  if (timer) clearInterval(timer)
  tiempoRestante.value = 5

  timer = setInterval(() => {
    tiempoRestante.value--
    if (tiempoRestante.value <= 0) {
      clearInterval(timer)
      timer = null
      seleccionado.value = -1
      const pregunta = preguntas.value[preguntaIndex.value]
      mensaje.value = `No respondiste a tiempo. La correcta era: ${pregunta.Respuestas[pregunta.Correcta]}, +0 puntos`
    }
  }, 1000)
}

// 1. comenzar el juego
function iniciarJuego() {
  puntuacion.value = 0
  preguntaIndex.value = 0
  seleccionado.value = null
  mensaje.value = ''
  finalizado.value = false
  juegoIniciado.value = true

  preguntas.value = [...canciones].sort(() => Math.random() - 0.5).slice(0, 10)
  prepararPregunta()
}

// 2. PREPARAR CADA PREGUNTA
function prepararPregunta() {
  if (timer) clearInterval(timer)
  seleccionado.value = null
  mensaje.value = ''
  tiempoRestante.value = 5

  if (preguntaIndex.value >= preguntas.value.length) {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio = null
    }
    guardarPuntuacion()
    finalizado.value = true
    juegoIniciado.value = false
    return
  }

  const pregunta = preguntas.value[preguntaIndex.value]
  opciones.value = pregunta.Respuestas.map((text, index) => ({ text, index })).sort(
    () => Math.random() - 0.5,
  )

  reproducirAudio(pregunta)
  empezarTemporizador()
}

// 3. respuestas
function seleccionarRespuesta(index) {
  if (seleccionado.value !== null) return
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  seleccionado.value = index
  const pregunta = preguntas.value[preguntaIndex.value]

  if (index === pregunta.Correcta) {
    mensaje.value = 'Has acertado +10 puntos'
    puntuacion.value += 10
  } else {
    mensaje.value = `Has fallado. La correcta era: ${pregunta.Respuestas[pregunta.Correcta]}, -5 puntos`
    puntuacion.value -= 5
  }
}

// 4. siguiente pregunta
function siguientePregunta() {
  preguntaIndex.value++
  prepararPregunta()
}

function getClase(index) {
  const pregunta = preguntas.value[preguntaIndex.value]
  if (seleccionado.value === null) return ''

  if (seleccionado.value === -1) {
    return index === pregunta.Correcta ? 'correcta' : ''
  }

  if (index === pregunta.Correcta) return 'correcta'
  if (index === seleccionado.value) return 'incorrecta'

  return ''
}

// 6. reiniciar jeugo
function reiniciarJuego() {
  finalizado.value = false
  juegoIniciado.value = false
  if (timer) clearInterval(timer)
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  iniciarJuego()
}

// 7. HOOK DE MONTAJE: Iniciar el juego automáticamente al cargar la vista
onMounted(() => {
  iniciarJuego()
})

// 8. HOOK DE DESMONTAJE: Limpiar el temporizador al salir de la vista
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
})

// 9. audio
async function reproducirAudio(pregunta) {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  try {
    const audioModule = await pregunta.archivo
    const audioUrl = audioModule.default
    currentAudio = new Audio(audioUrl)
    currentAudio.volume = volumen.value

    currentAudio.addEventListener('loadedmetadata', () => {
      const duracion = currentAudio.duration
      const startTime = Math.random() * Math.max(0, duracion - 5)
      currentAudio.currentTime = startTime
      currentAudio.play().catch((error) => {
        console.error('Error reproduciendo audio:', error)
      })
    }, { once: true })
  } catch (error) {
    console.error('Error cargando el audio:', error)
  }
}

// 10. guardar puntuacion
function guardarPuntuacion() {
  const scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || []
  scoreboard.push({
    nombre: contestStore.nombreJugador,
    puntuacion: puntuacion.value,
    fecha: new Date().toLocaleString('es-ES'),
  })
  scoreboard.sort((a, b) => b.puntuacion - a.puntuacion)
  localStorage.setItem('scoreboard', JSON.stringify(scoreboard.slice(0, 10)))
}
</script>
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContestStore = defineStore('contest', {
  state: () => ({
    nombreJugador: '',
  }),

  actions: {
    setName(name: string) {
      this.nombreJugador = name
    },
  },
})

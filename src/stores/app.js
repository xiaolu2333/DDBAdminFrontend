import {defineStore} from 'pinia'

console.log('import.meta.env.VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)
export const useAppStore = defineStore('counter', {
  state: () => ({
    title: import.meta.env.VITE_APP_TITLE,
  }),

  getters: {
    getTitle() {
      return this.title
    }
  },

  setters: {
    setTitle(title) {
      this.title = title
    }
  },

  actions: {
    async setTitleAsync(title) {
      this.title = await title
    }
  },
})
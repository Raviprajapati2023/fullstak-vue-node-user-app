import { defineStore, acceptHMRUpdate } from 'pinia'
import { api, endpoint } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const { data } = await api.get(endpoint.USERS)
        if (data.success) {
          this.users = data.users
        }
      } finally {
        this.loading = false
      }
    },

    async addUser(payload) {
      this.loading = true
      try {
        const { data } = await api.post(endpoint.USERS, payload)
        if (data.success) {
          await this.fetchUsers()
        }
        return data
      } finally {
        this.loading = false
      }
    },

    async updateUser(id, payload) {
      this.loading = true
      try {
        const { data } = await api.put(`${endpoint.USERS}/${id}`, payload)
        if (data.success) {
          await this.fetchUsers()
        }
        return data
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id) {
      this.loading = true
      try {
        const { data } = await api.delete(`${endpoint.USERS}/${id}`)
        if (data.success) {
          await this.fetchUsers()
        }
        return data
      } finally {
        this.loading = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

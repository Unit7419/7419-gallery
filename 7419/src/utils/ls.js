export const ls = {
  get: key => {
    const data = localStorage.getItem(key)

    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  },

  set: (k, v) => {
    // Storage overflow
    try {
      localStorage.setItem(k, v)
    } catch (error) {
      console.error(error)
    }
  },
}

export const request = (...args) =>
  window.fetch(...args).then(res => res.json())

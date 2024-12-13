const port = process.env.VUE_APP_API_URL || "http://localhost:8080"
// const port = "http://localhost:8080" //TODO revert this
const headerAxios = {
  "ngrok-skip-browser-warning":1
}
export { port,headerAxios }
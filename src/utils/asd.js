export function fs (f) {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  let fontSize = htmlWidth / 10
  fontSize = fontSize > 60 ? 60 : fontSize
  return f / 37.5 * fontSize
}

export function urlStringify(urlString) {
  return urlString.replaceAll('~', ' ') || urlString
}

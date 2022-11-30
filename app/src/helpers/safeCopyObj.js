export const safeCopyObj = (obj) => {
  const safeCopy = JSON.parse(JSON.stringify(obj))
  return safeCopy
}

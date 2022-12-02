export const safeCopyObj = <T> (obj: NonNullable<T>):NonNullable<T> => {
  const safeCopy = JSON.parse(JSON.stringify(obj)) as NonNullable<T>
  return safeCopy
}

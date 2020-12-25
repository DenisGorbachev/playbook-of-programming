export const getRootSet = async function (coefficientSet) {
  const { a, b, c } = coefficientSet
  const D = Math.sqrt(Math.pow(b, 2) - 4 * a * c)
  const x1 = (-b - D) / (2 * a)
  const x2 = (-b + D) / (2 * a)
  return { x1, x2 }
}

import { without } from 'lodash'

export async function getStrings(valid = [], skipped = []) {
  return without(valid.concat('', 'toast', 'with spaces', 'unprintable \t characters', 'multiple \n lines', '123', '123.05'), skipped)
}

const multarr2 = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))))
export const multarr = (a, b, ...c) => b ? multarr(multarr2(a, b), ...c) : a

export const ops = function(name, multargs) {
  return multargs.map((args) => [name, args])
}

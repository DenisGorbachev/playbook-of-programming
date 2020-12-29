import { without } from 'lodash'

export async function getStrings(valid = [], skipped = []) {
  return without(valid.concat('', 'toast', 'with spaces', 'unprintable \t characters', 'multiple \n lines', '123', '123.05'), skipped)
}

export function multarr(a, b, ...c) {
  return b ? multarr(multarr2(a, b), ...c) : a
}

function multarr2(a, b) {
  return [].concat(...a.map(a => b.map(b => [].concat(a, b))))
}

export function ops(name, multargs) {
  return multargs.map((args) => [name, args])
}

export function escapeShellArgument(arg) {
  return '"' + arg.replace(/(["\s'$`\\])/g, '\\$1') + '"'
}

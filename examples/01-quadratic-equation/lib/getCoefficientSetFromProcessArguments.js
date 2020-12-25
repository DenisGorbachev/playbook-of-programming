export const getCoefficientSetFromProcessArguments = function (argv) {
  return {
    a: parseFloat(argv[argv.length - 3]),
    b: parseFloat(argv[argv.length - 2]),
    c: parseFloat(argv[argv.length - 1]),
  }
}

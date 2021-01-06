import { ajv, getSchemaId } from '../util/ajv.js'

export const ProgramValidSamples = [
  `
  console.log("Hello, world!")
  `,
  `
  MOV EAX, [EBX]    ; Move the 4 bytes in memory at the address contained in EBX into EAX
  MOV [ESI+EAX], CL ; Move the contents of CL into the byte at address ESI+EAX
  MOV DS, DX        ; Move the contents of DX into segment register DS
  `,
  `
  #lang racket
  (require 2htdp/image)

  (let sierpinski ([n 8])
    (if (zero? n)
      (triangle 2 'solid 'red)
      (let ([t (sierpinski (- n 1))])
        (freeze (above t (beside t t))))))
  `,
]

export const ProgramInvalidSamples = [
  1, // not an instruction (although it's possible to construct a machine that uses a symbol "1" as an instruction
  // The following string should not be a valid program; however, constructing precise validation rules requires the presence of an executor (which is another program)
  // `
  // * Slice the tomatoes.
  // * Peel the avocados.
  // * Dice the carrots.
  // `,
]

export const ProgramSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'program',
  description: 'a sequence of instructions for a machine (e.g. compiler, interpreter, processor, Turing machine, etc)',
  type: 'string',
}

export const validateProgram = ajv.compile(ProgramSchema)

export const getProgramErrors = async function (program) {
  return validateProgram(program).then(() => []).catch((error) => error.errors || error)
}

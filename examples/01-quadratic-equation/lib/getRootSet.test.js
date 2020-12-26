import _ from 'lodash'
import { CoefficientSetSamples } from '../model/CoefficientSet.js'
import { RootSetSamples } from '../model/RootSet.js'
import { getRootSet } from './getRootSet.js'

describe.each(_.zip(RootSetSamples, CoefficientSetSamples))('getRoots',
  function (rootSet, coefficientSet) {
    test(`${JSON.stringify(coefficientSet)} => ${JSON.stringify(rootSet)}`, async function () {
      expect(await getRootSet(coefficientSet)).toEqual(rootSet)
    })
  },
)

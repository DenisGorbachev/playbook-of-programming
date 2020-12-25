import _ from 'lodash'
import { ProcessArgumentsSamples } from '../model/ProcessArguments.js'
import { CoefficientSetSamples } from '../model/CoefficientSet.js'
import { getCoefficientSetFromProcessArguments } from './getCoefficientSetFromProcessArguments.js'

describe.each(_.zip(CoefficientSetSamples, ProcessArgumentsSamples))('getCoefficientSetFromProcessArguments',
  function (coefficientSet, processArguments) {
    test(`${JSON.stringify(processArguments)} => ${JSON.stringify(coefficientSet)}`, async function () {
      expect(await getCoefficientSetFromProcessArguments(processArguments)).toEqual(coefficientSet)
    })
  },
)

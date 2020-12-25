/**
 * This program calculates the roots of a quadratic equation, developed according to the Playbook methodology.
 *
 * Event listeners:
 * - Run (default)
 */

import { getCoefficientSetFromProcessArguments } from './lib/getCoefficientSetFromProcessArguments.js'
import { getRootSet } from './lib/getRootSet.js'

getRootSet(getCoefficientSetFromProcessArguments(process.argv))
  .then(console.log)
  .catch(console.error)

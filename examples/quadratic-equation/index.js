/**
 * This program calculates the roots of a quadratic equation, developed according to the Playbook methodology.
 *
 * Event listeners:
 * - Run (default)
 */

import { ajv } from './util/ajv.js'

getRoots()
  .then(console.log)
  .catch(console.error)

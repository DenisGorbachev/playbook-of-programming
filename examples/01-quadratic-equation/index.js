/**
 * This program calculates the roots of a quadratic equation, developed according to the Playbook methodology.
 *
 * Event listeners:
 * - Run (default)
 */

import { ajv } from './util/ajv.js'

getRootSet()
  .then(console.log)
  .catch(console.error)

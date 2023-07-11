import { round } from 'mathjs'

/**
 * Method for determining the value of lambda in a M/M/s/k model.
 * @param {Number} lambda Customer arrival rate to the system. Default is 0.
 * @param {Number} iteration describes the step that is being evaluated. Default is 0.
 * @param {Number} limit defines the maximum step of the queue. Default is 0.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The value for lambda for a M/M/s/k model.
 */
export const MMSKNLambda = (lambda: number = 0, iteration: number = 0, limit: number = 0, decimals: number = 4): number => {
  
  const n = iteration
  const k = limit

  try {
    return n > k ? 0 : round(lambda, decimals)
  } catch (error) {
    throw Error(`Lambda n for M/M/s/k error: ${error}`)
  }
  
}
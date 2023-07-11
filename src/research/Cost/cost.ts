import { evaluate, round } from 'mathjs'

/**
 * Method for calculating the cost of service. Returns the value according to the ECs model.
 * @param {Number} serverCost cost per server. Default is 0.
 * @param {Number} serverSize amount of servers in the model. Default is 0.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The service cost.
 */
export const ServiceCost = (serverCost: number = 0, serverSize: number = 1, decimals: number = 4): number => {
  const Cs = serverCost
  const s = serverSize

  try {

    const exp = `${Cs}*${s}`
    const ECs = evaluate(exp)
    return round(ECs, decimals)

  } catch (error) {
    throw Error(`Service Cost error: ${error}`)
  }
}

/**
 * Method for calculating the waiting cost. Returns the value according to the ECw model.
 * @param {Number} waitingCost  cost per server. Default is 0.
 * @param {Number} lambda Customer arrival rate to the system. Default is 0.
 * @param {Number} mu Rate of clients served in the system. Default is 1.
 * @param {Number} serverSize Number of servers. Default is 1.
 * @param {Number} variance Describes the variance. Default is 0.
 * @param {Number} limit Max step of the queue. Default is 0.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The waiting cost.
 */
export const WaitingCost = (waitingCost: number = 0, model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, variance: number = 0, limit: number = 0, decimals: number = 4): number => {
  try {
    const L = lambda * STimeEx(model, lambda, mu, serverSize, variance, limit, 15)

    const exp = `${waitingCost}*${L}`
    const ECw = evaluate(exp)
    return round(ECw, decimals)

  } catch (error) {
    throw Error(`Waiting Cost error: ${error}`)
  }
}

/**
 * Method for calculating the total cost. Returns the value according to the ECt model.
 * @param {Number} serverCost cost per server. Default is 0.
 * @param {Number} waitingCost waiting cost. Default is 0.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The total cost.
 */
export const TotalCost = (serverCost: number = 0, waitingCost: number = 0, decimals: number = 4): number => {
  try {

    const exp = `${serverCost}+${waitingCost}`
    const ECt = evaluate(exp)
    return round(ECt, decimals)

  } catch (error) {
    throw Error(`Total Cost error: ${error}`)
  }
}
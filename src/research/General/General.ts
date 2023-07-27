import { ModelResult } from '../../types'

import {
  MGInitialProbability,
  MGNProbability,
  MGQClientEx,
  MGQTimeEx,
  MGSClientEx,
  MGSTimeEx,
  MMKInitialProbability,
  MMKNProbability,
  MMKQClientEx,
  MMKQTimeEx,
  MMKQtyServerBusy,
  MMKSClientEx,
  MMKSTimeEx,
  SSInitialProbability,
  SSNProbability,
  SSQClientEx,
  SSQTimeEx,
  SSSClientEx,
  SSSTimeEx
} from '../SingleServer'

import {
  MMSInitialProbability,
  MMSKInitialProbability,
  MMSKNProbability,
  MMSKQClientEx,
  MMSKQTimeEx,
  MMSKQtyServerBusy,
  MMSKSClientEx,
  MMSKSTimeEx,
  MMSNProbability,
  MMSQClientEx,
  MMSQTimeEx,
  MMSQtyServerBusy,
  MMSSClientEx,
  MMSSTimeEx
} from '../MultiServer'

/**
 * Method picker to calculate the quantity of servers busy for various queuing models.
 *
 * @param model - The queuing model to use for calculation (default: 1).
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - The current iteration (default: 1).
 * @param limit - The maximum iteration (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The quantity of servers busy as a number, string, or null.
 *
 * @remarks
 * The method picker allows you to calculate the quantity of servers busy for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model does not quantify the occupied servers.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model does not quantify the occupied servers.
 *
 * The function returns the quantity of servers busy for the selected queuing model or an informative string if the model does not quantify the occupied servers.
 *
 * @example
 * ```typescript
 * // Calculate the quantity of servers busy for an M/M/s model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers in the system
 * const iteration = 3; // current iteration
 * const limit = 5; // maximum iteration
 * const decimals = 4; // number of decimal places to round the result
 * const result = QtyServerBusy(model, lambda, mu, serverSize, iteration, limit, decimals); // 0.0012
 * ```
 */
export const QtyServerBusy = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, iteration: number = 1, limit: number = 1, decimals: number = 4): ModelResult => {
  const n = iteration
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: null,
          message: 'The M/M/1 model does not quantify the occupied servers.'
        }

      case 2:
        return {
          result: MMSQtyServerBusy(lambda, mu, s, n, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKQtyServerBusy(lambda, mu, n, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKQtyServerBusy(mu, s, n, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: null,
          message: 'The M/G/1 model does not quantify the occupied servers.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }
  } catch (error) {
    throw Error(`Quantity of Server Busy function picker error: ${error}`)
  }
}

/**
 * Method picker to calculate the initial probability for various queuing models.
 *
 * @param model - The queuing model to use for calculation (default: 1).
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum iteration (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns An object containing the result and a message.
 *
 * @remarks
 * The method picker allows you to calculate the initial probability for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model does not quantify the occupied servers.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model does not quantify the occupied servers.
 *
 * The function returns an object containing the result of the calculation and a message indicating the success or failure of the calculation.
 *
 * @example
 * ```typescript
 * // Calculate the initial probability for an M/M/s model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers in the system
 * const decimals = 4; // number of decimal places to round the result
 * const result = InitialProbability(model, lambda, mu, serverSize, decimals); // { result: 0.303, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const InitialProbability = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, limit: number = 1, decimals: number = 4): ModelResult => {
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSInitialProbability(lambda, mu, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSInitialProbability(lambda, mu, s, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKInitialProbability(lambda, mu, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKInitialProbability(lambda, mu, s, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGInitialProbability(lambda, mu, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Initial Probability function picker error: ${error}`)
  }
}

/**
 * Method for calculating the probability of having a specific number of customers (n) in the queuing system for different queuing models.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @param lambda - The arrival rate of customers to the system (default: 0).
 * @param mu - The service rate of the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - The specific number of customers (n) for which the probability is calculated (default: 1).
 * @param limit - The limit for the M/M/1/k and M/M/s/k models (default: 1).
 * @param decimals - The number of decimals for the calculated probability (default: 4).
 * @returns An object containing the calculated probability and a success message.
 *
 * @remarks
 * The method picker calculates the probability of having a specific number of customers (n) in the queuing system for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the calculated probability for the specified queuing model and a success message. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Calculate the probability of having 2 customers in the M/M/s queuing model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 5; // Arrival rate
 * const mu = 2; // Service rate
 * const serverSize = 3; // Number of servers
 * const iteration = 2; // Number of customers
 *
 * const result = NProbability(model, lambda, mu, serverSize, iteration); // { result: 0.0222, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const NProbability = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, iteration: number = 1, limit: number = 1, decimals: number = 4): ModelResult => {
  const n = iteration
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSNProbability(lambda, mu, n, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSNProbability(lambda, mu, s, n, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKNProbability(lambda, mu, n, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKNProbability(lambda, mu, s, n, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGNProbability(lambda, mu, n, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }
    }
  } catch (error) {
    throw Error(`N Probability Method Picker error: ${error}`)
  }
}

/**
 * Method for calculating the expected number of clients in the queue for different queuing models.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @param lambda - The arrival rate of customers to the system (default: 0).
 * @param mu - The service rate of the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param variation - The coefficient of variation for the M/G/1 model (default: 0).
 * @param limit - The limit for the M/M/1/k and M/M/s/k models (default: 1).
 * @param decimals - The number of decimals for the calculated number of clients (default: 4).
 * @returns An object containing the calculated expected number of clients in the queue and a success message.
 *
 * @remarks
 * The method picker calculates the expected number of clients in the queue for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the calculated expected number of clients in the queue for the specified queuing model and a success message. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the queue for the M/M/s queuing model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 5; // Arrival rate
 * const mu = 2; // Service rate
 * const serverSize = 3; // Number of servers
 *
 * const result = QClientEx(model, lambda, mu, serverSize); // { result: 0.75, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const QClientEx = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, variation: number = 0, limit: number = 1, decimals: number = 4): ModelResult => {
  const v = variation
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSQClientEx(lambda, mu, 1, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSQClientEx(lambda, mu, s, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKQClientEx(lambda, mu, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKQClientEx(lambda, mu, s, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGQClientEx(lambda, mu, v, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Expected clients in queue Method Picker error: ${error}`)
  }
}

/**
 * Method for calculating the expected number of clients in the system (both in the queue and being served) for different queuing models.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @param lambda - The arrival rate of customers to the system (default: 0).
 * @param mu - The service rate of the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param variation - The coefficient of variation for the M/G/1 model (default: 0).
 * @param limit - The limit for the M/M/1/k and M/M/s/k models (default: 1).
 * @param decimals - The number of decimals for the calculated number of clients (default: 4).
 * @returns An object containing the calculated expected number of clients in the system for the specified queuing model and a success message.
 *
 * @remarks
 * The method picker calculates the expected number of clients in the system (both in the queue and being served) for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the calculated expected number of clients in the system for the specified queuing model and a success message. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the system for the M/M/s queuing model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 5; // Arrival rate
 * const mu = 2; // Service rate
 * const serverSize = 3; // Number of servers
 *
 * const result = SClientEx(model, lambda, mu, serverSize); // { result: 1.75, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const SClientEx = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, variation: number = 0, limit: number = 1, decimals: number = 4): ModelResult => {
  const v = variation
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSSClientEx(lambda, mu, 1, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSSClientEx(lambda, mu, s, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKSClientEx(lambda, mu, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKSClientEx(lambda, mu, s, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGSClientEx(lambda, mu, v, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Expected clients in system Method Picker error: ${error}`)
  }
}

/**
 * Method for calculating the expected time a client spends in the queue for different queuing models.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @param lambda - The arrival rate of customers to the system (default: 0).
 * @param mu - The service rate of the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param variation - The coefficient of variation for the M/G/1 model (default: 0).
 * @param limit - The limit for the M/M/1/k and M/M/s/k models (default: 1).
 * @param decimals - The number of decimals for the calculated time (default: 4).
 * @returns An object containing the calculated expected time a client spends in the queue for the specified queuing model and a success message.
 *
 * @remarks
 * The method picker calculates the expected time a client spends in the queue for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the calculated expected time a client spends in the queue for the specified queuing model and a success message. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the queue for the M/M/s queuing model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 5; // Arrival rate
 * const mu = 2; // Service rate
 * const serverSize = 3; // Number of servers
 *
 * const result = QTimeEx(model, lambda, mu, serverSize); // { result: 0.625, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const QTimeEx = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, variation: number = 0, limit: number = 1, decimals: number = 4): ModelResult => {
  const v = variation
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSQTimeEx(lambda, mu, 1, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSQTimeEx(lambda, mu, s, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKQTimeEx(lambda, mu, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKQTimeEx(lambda, mu, s, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGQTimeEx(lambda, mu, v, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Expected time in queue Method Picker error: ${error}`)
  }
}

/**
 * Method for calculating the expected time a client spends in the system (both in the queue and being served) for different queuing models.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @param lambda - The arrival rate of customers to the system (default: 0).
 * @param mu - The service rate of the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param variation - The coefficient of variation for the M/G/1 model (default: 0).
 * @param limit - The limit for the M/M/1/k and M/M/s/k models (default: 1).
 * @param decimals - The number of decimals for the calculated time (default: 4).
 * @returns An object containing the calculated expected time a client spends in the system (both in the queue and being served) for the specified queuing model and a success message.
 *
 * @remarks
 * The method picker calculates the expected time a client spends in the system (both in the queue and being served) for different queuing models. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), an only one server (s = 1).
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the calculated expected time a client spends in the system for the specified queuing model and a success message. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the system for the M/M/s queuing model with the following parameters:
 * const model = 2; // M/M/s queuing model
 * const lambda = 5; // Arrival rate
 * const mu = 2; // Service rate
 * const serverSize = 3; // Number of servers
 *
 * const result = STimeEx(model, lambda, mu, serverSize); // { result: 1.125, message: 'Successful calculation for the M/M/s model.' }
 * ```
 */
export const STimeEx = (model: number = 1, lambda: number = 0, mu: number = 1, serverSize: number = 1, variation: number = 0, limit: number = 1, decimals: number = 4): ModelResult => {
  const v = variation
  const s = serverSize
  const k = limit
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: SSSTimeEx(lambda, mu, 1, decimals),
          message: 'Successful calculation for the M/M/1 model.'
        }

      case 2:
        return {
          result: MMSSTimeEx(lambda, mu, s, decimals),
          message: 'Successful calculation for the M/M/s model.'
        }

      case 3:
        return {
          result: MMKSTimeEx(lambda, mu, k, decimals),
          message: 'Successful calculation for the M/M/1/k model.'
        }

      case 4:
        return {
          result: MMSKSTimeEx(lambda, mu, s, k, decimals),
          message: 'Successful calculation for the M/M/s/k model.'
        }

      case 5:
        return {
          result: MGSTimeEx(lambda, mu, v, decimals),
          message: 'Successful calculation for the M/G/1 model.'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Expected time in system Method Picker error: ${error}`)
  }
}

/**
 * Method for picking models. Returns the name of the corresponding model.
 *
 * @param model - The chosen queuing model by the list value (default: 1).
 * @returns An object containing the model number and its name.
 *
 * @remarks
 * The method picker returns the name of the corresponding queuing model based on the input value. It supports the following queuing models:
 *
 * - Model 1 (M/M/1): The M/M/1 model represents a queuing system with a Poisson arrival rate and an exponential service rate.
 * - Model 2 (M/M/s): The M/M/s model represents a queuing system with a Poisson arrival rate, an exponential service rate, and s servers.
 * - Model 3 (M/M/1/k): The M/M/1/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, only one server (s = 1), and k classes of customers.
 * - Model 4 (M/M/s/k): The M/M/s/k model represents a queuing system with a Poisson arrival rate, an exponential service rate, s servers, and k classes of customers.
 * - Model 5 (M/G/1): The M/G/1 model represents a queuing system with a Poisson arrival rate and a general service time distribution.
 *
 * The function returns an object containing the model number and its name. If an invalid model number is provided, the function returns an object with a null result and a message indicating that an invalid queuing model was selected.
 *
 * @example
 * ```typescript
 * // Get the name of the M/M/s model with the following parameter:
 * const model = 2; // M/M/s queuing model
 * const result = ModelName(model); // { result: 2, message: 'M/M/s model' }
 * ```
 */
export const ModelName = (model: number = 1): ModelResult => {
  try {

    if (model <= 0 || model > 5) {
      throw Error(`The parameter 'model' must be between 1 and 5 (inclusive).`)
    }

    switch (model) {

      case 1:
        return {
          result: 1,
          message: 'M/M/1 model'
        }

      case 2:
        return {
          result: 2,
          message: 'M/M/s model'
        }

      case 3:
        return {
          result: 3,
          message: 'M/M/1/k model'
        }

      case 4:
        return {
          result: 4,
          message: 'M/M/s/k model'
        }

      case 5:
        return {
          result: 5,
          message: 'M/G/1 model'
        }

      default:
        return {
          result: null,
          message: 'Invalid queuing model selected.'
        }

    }

  } catch (error) {
    throw Error(`Model Name Picker error: ${error}`)
  }
}
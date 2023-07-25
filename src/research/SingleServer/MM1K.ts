import { evaluate, round } from "mathjs"
import { Rho } from "../../basic"

/**
 * Calculates the quantity of servers busy (C) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param iteration - The current iteration (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The quantity of servers busy (C) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the quantity of servers busy (C), considering the arrival rate, service rate, current iteration, and the maximum number of customers in the system.
 *
 * The formula used to calculate the quantity of servers busy (C) for a M/M/1/k model is based on the probability of having n or fewer customers in the system (Pn):
 * Pn = MMKQtyServerBusy(lambda, mu, iteration, limit, decimals) // Probability of having n or fewer customers in the system
 *
 * C = (lambda / mu)^n
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - iteration: The current iteration.
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the quantity of servers busy (C) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const iteration = 3; // current iteration
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKQtyServerBusy(lambda, mu, iteration, limit, decimals); // 0.7683
 * ```
 */

export const MMKQtyServerBusy = (lambda: number = 0, mu: number = 1, iteration: number = 1, limit: number = 1, decimals: number = 4): number => {
  const n = iteration
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    if (n < 0) {
      throw Error(`The parameter 'iteration' cannot be lower than zero (0).`)
    }

    if (n <= k) {
      const exp = `((${lambda}/${mu})^${n})`
      const c = evaluate(exp)
      return Number(round(c, decimals))
    } else {
      return Number(0)
    }

  } catch (error) {
    throw Error(`M/M/1/k Quantity of Servers Busy error: ${error}`)
  }
}

/**
 * Calculates the initial probability (P0) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability (P0) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the initial probability (P0), which is the probability of having zero customers in the system, considering the arrival rate, service rate, and the maximum number of customers in the system.
 *
 * The formula used to calculate the initial probability (P0) for a M/M/1/k model is based on the utilization factor (rho):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor
 *
 * P0 = (1 - rho) / (1 - rho^(k+1))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the initial probability (P0) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKInitialProbability(lambda, mu, limit, decimals); // 0.7098
 * ```
 */
export const MMKInitialProbability = (lambda: number = 0, mu: number = 1, limit: number = 1, decimals: number = 4): number => {
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)

    if (rho === 1) {
      throw Error(`The utilization factor 'rho' is equal to one (1). Cannot compute.`)
    }

    const exp = `(1-${rho})/(1-(${rho}^(${k}+1)))`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`M/M/1/k Initial Probability error: ${error}`)
  }
}

/**
 * Calculates the probability of having 'n' or fewer customers in the system (Pn) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param iteration - The current iteration (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The probability of having 'n' or fewer customers in the system (Pn) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the probability of having 'n' or fewer customers in the system (Pn), considering the arrival rate, service rate, current iteration, and the maximum number of customers in the system.
 *
 * The formula used to calculate the probability of having 'n' or fewer customers in the system (Pn) for a M/M/1/k model is based on the utilization factor (rho) and the initial probability (Po):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor
 * Po = MMKInitialProbability(lambda, mu, limit, 15) // Initial probability
 *
 * Pn = Po * (rho^n)
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - iteration: The current iteration.
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the probability of having 'n' or fewer customers in the system (Pn) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const iteration = 3; // current iteration
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKNProbability(lambda, mu, iteration, limit, decimals); // 0.4160
 * ```
 */
export const MMKNProbability = (lambda: number = 0, mu: number = 1, iteration: number = 1, limit: number = 1, decimals: number = 4): number => {
  const n = iteration
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const po = MMKInitialProbability(lambda, mu, k, 15)
    const exp = `${po}*(${rho}^${n})`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`M/M/1/k n Probability error: ${error}`)
  }
}

/**
 * Calculates the expected number of clients in the system (Ls) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of clients in the system (Ls) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the expected number of clients in the system (Ls), considering the arrival rate, service rate, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected number of clients in the system (Ls) for a M/M/1/k model is based on the utilization factor (rho):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor
 *
 * Ls = (rho / (1 - rho)) - (((k + 1) * (rho^(k + 1))) / (1 - rho^(k + 1)))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the system (Ls) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKSClientEx(lambda, mu, limit, decimals); // 3.3708
 * ```
 */
export const MMKSClientEx = (lambda: number = 0, mu: number = 1, limit: number = 1, decimals: number = 4): number => {
  const k = limit

  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const exp = `(${rho}/(1-${rho}))-(((${k}+1)*(${rho}^(${k}+1)))/(1-(${rho}^(${k}+1))))`
    const Ls = evaluate(exp)
    return Number(round(Ls, decimals))

  } catch (error) {
    throw Error(`M/M/1/k Server Clients Expected error: ${error}`)
  }
}

/**
 * Calculates the expected number of clients in the queue (Lq) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of clients in the queue (Lq) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the expected number of clients in the queue (Lq), considering the arrival rate, service rate, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected number of clients in the queue (Lq) for a M/M/1/k model is based on the expected number of clients in the system (Ls) and the initial probability (Po):
 * Ls = MMKSClientEx(lambda, mu, limit, 15) // Expected number of clients in the system
 * Po = MMKInitialProbability(lambda, mu, limit, 15) // Initial probability
 *
 * Lq = Ls - (1 - Po)
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the queue (Lq) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKQClientEx(lambda, mu, limit, decimals); // 2.3708
 * ```
 */
export const MMKQClientEx = (lambda: number = 0, mu: number = 1, limit: number = 1, decimals: number = 4): number => {
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const Ls = MMKSClientEx(lambda, mu, k, 15)
    const po = MMKInitialProbability(lambda, mu, k, 15)
    const exp = `${Ls}-(1-${po})`
    const Lq = evaluate(exp)
    return Number(round(Lq, decimals))

  } catch (error) {
    throw Error(`M/M/1/k Queue Clients Expected error: ${error}`)
  }
}

/**
 * Calculates the expected time a client spends in the queue (Wq) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a client spends in the queue (Wq) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the expected time a client spends in the queue (Wq), considering the arrival rate, service rate, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected time a client spends in the queue (Wq) for a M/M/1/k model is based on the expected number of clients in the queue (Lq) and the arrival rate (lambda):
 * Lq = MMKQClientEx(lambda, mu, limit, 15) // Expected number of clients in the queue
 *
 * Wq = Lq / lambda
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the queue (Wq) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKQTimeEx(lambda, mu, limit, decimals); // 4.7416
 * ```
 */
export const MMKQTimeEx = (lambda: number = 0, mu: number = 1, limit: number = 1, decimals: number = 4): number => {
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const Lq = MMKQClientEx(lambda, mu, k, 15)
    const exp = `${Lq}/${lambda}`
    const Wq = evaluate(exp)
    return Number(round(Wq, decimals))

  } catch (error) {
    throw Error(`M/M/1/k Queue Time Expected error: ${error}`)
  }
}

/**
 * Calculates the expected time a client spends in the system (Ws) for a M/M/1/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a client spends in the system (Ws) as a number.
 *
 * @remarks
 * The M/M/1/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), one server, and a maximum capacity of k customers in the system. The method calculates the expected time a client spends in the system (Ws), considering the arrival rate, service rate, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected time a client spends in the system (Ws) for a M/M/1/k model is based on the expected number of clients in the system (Ls) and the arrival rate (lambda):
 * Ls = MMKSClientEx(lambda, mu, limit, 15) // Expected number of clients in the system
 *
 * Ws = Ls / lambda
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the system (Ws) for a M/M/1/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const limit = 5; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMKSTimeEx(lambda, mu, limit, decimals); // 7.7416
 * ```
 */
export const MMKSTimeEx = (lambda: number = 0, mu: number = 1, limit: number = 1, decimals: number = 4): number => {
  const k = limit
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`)
    }

    const Ls = MMKSClientEx(lambda, mu, k, 15)
    const exp = `${Ls}/${lambda}`
    const Ws = evaluate(exp)
    return Number(round(Ws, decimals))

  } catch (error) {
    throw Error(`M/M/1/k Server Time Expected error: ${error}`)
  }
}
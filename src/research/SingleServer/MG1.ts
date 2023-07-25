import { evaluate, round } from "mathjs"
import { Rho } from "../../basic"
import { SSInitialProbability } from "./singleServer"

/**
 * Calculates the initial probability (Po) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability (Po) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the initial probability (Po), which is the probability that the system is empty (having zero customers) when a new customer arrives, considering the arrival rate and service rate.
 *
 * The formula used to calculate the initial probability (Po) for a M/G/1 model is based on the utilization factor (rho):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor (traffic intensity)
 *
 * Po = 1 - rho
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the initial probability (Po) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGInitialProbability(lambda, mu, decimals); // 0.8
 * ```
 */
export const MGInitialProbability = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const exp = `1-${rho}`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`M/G/1 Initial Probability error: ${error}`)
  }
}

/**
 * Calculates the probability of having 'n' customers in the system (Pn) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param iteration - The number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The probability of having 'n' customers in the system (Pn) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the probability of having 'n' customers in the system (Pn), considering the arrival rate, service rate, and the number of customers in the system.
 *
 * The formula used to calculate the probability of having 'n' customers in the system (Pn) for a M/G/1 model is based on the utilization factor (rho) and the initial probability (Po):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor (traffic intensity)
 * Po = MGInitialProbability(lambda, mu, 15) // Initial probability
 *
 * Pn = (rho^n) * Po
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - iteration: The number of customers in the system ('n').
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the probability of having 3 customers in the system (Pn) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const iteration = 3; // number of customers in the system (n)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGNProbability(lambda, mu, iteration, decimals); // 0.1024
 * ```
 */
export const MGNProbability = (lambda: number = 0, mu: number = 1, iteration: number = 1, decimals: number = 4): number => {
  const n = iteration
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (n < 1) {
      throw Error(`The parameter 'n' cannot be lower than one (1).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const po = SSInitialProbability(lambda, mu, 15)
    const exp = `(${rho}^${n})*${po}`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`M/G/1 N Probability error: ${error}`)
  }
}

/**
 * Calculates the expected number of customers in the queue (Lq) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param variation - The variation of service time (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of customers in the queue (Lq) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the expected number of customers in the queue (Lq), considering the arrival rate, service rate, and the variation of service time.
 *
 * The formula used to calculate the expected number of customers in the queue (Lq) for a M/G/1 model is based on the utilization factor (rho) and the variation of service time (v):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor (traffic intensity)
 *
 * Lq = (((lambda^2) * (v^2)) + (rho^2)) / (2 * (1 - rho))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - variation: The variation of service time.
 * - decimals: The number of decimal places to round the result.
 *
 * @throws {Error} If the 'mu' parameter is equal to zero (0).
 *
 * @example
 * ```typescript
 * // Calculate the expected number of customers in the queue (Lq) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const variation = 1.5; // variation of service time
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGQClientEx(lambda, mu, variation, decimals); // 1.4625
 * ```
 */
export const MGQClientEx = (lambda: number = 0, mu: number = 1, variation: number = 0, decimals: number = 4): number => {
  const v = variation
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const exp = `(((${lambda}^2)*(${v}^2))+(${rho}^2))/(2*(1-${rho}))`
    const Lq = evaluate(exp)
    return Number(round(Lq, decimals))

  } catch (error) {
    throw Error(`M/G/1 Queue Clients Expected error: ${error}`)
  }
}

/**
 * Calculates the expected number of customers in the system (Ls) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param variation - The variation of service time (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of customers in the system (Ls) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the expected number of customers in the system (Ls), considering the arrival rate, service rate, and the variation of service time.
 *
 * The formula used to calculate the expected number of customers in the system (Ls) for a M/G/1 model is based on the utilization factor (rho) and the expected number of customers in the queue (Lq):
 * rho = Rho(lambda, mu, 1, 15) // Utilization factor (traffic intensity)
 * Lq = MGQClientEx(lambda, mu, variation, 15) // Expected number of customers in the queue
 *
 * Ls = rho + Lq
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - variation: The variation of service time.
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of customers in the system (Ls) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const variation = 1.5; // variation of service time
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGSClientEx(lambda, mu, variation, decimals); // 1.6625
 * ```
 */
export const MGSClientEx = (lambda: number = 0, mu: number = 1, variation: number = 0, decimals = 4): number => {
  const v = variation
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const Lq = MGQClientEx(lambda, mu, v, 15)
    const exp = `${rho}+${Lq}`
    const Ls = evaluate(exp)
    return Number(round(Ls, decimals))

  } catch (error) {
    throw Error(`M/G/1 System Clients Expected error: ${error}`)
  }
}

/**
 * Calculates the expected time a customer spends in the queue (Wq) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param variation - The variation of service time (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a customer spends in the queue (Wq) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the expected time a customer spends in the queue (Wq), considering the arrival rate, service rate, and the variation of service time.
 *
 * The formula used to calculate the expected time a customer spends in the queue (Wq) for a M/G/1 model is based on the expected number of customers in the queue (Lq):
 * Lq = MGQClientEx(lambda, mu, variation, 15) // Expected number of customers in the queue
 *
 * Wq = Lq / lambda
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - variation: The variation of service time.
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a customer spends in the queue (Wq) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const variation = 1.5; // variation of service time
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGQTimeEx(lambda, mu, variation, decimals); // 2.9250
 * ```
 */
export const MGQTimeEx = (lambda: number = 0, mu: number = 1, variation: number = 0, decimals: number = 4): number => {
  const v = variation
  try {
    
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    const Lq = MGQClientEx(lambda, mu, v, 15)
    const exp = `${Lq}/${lambda}`
    const Wq = evaluate(exp)
    return Number(round(Wq, decimals))

  } catch (error) {
    throw Error(`M/G/1 Queue Time Expected error: ${error}`)
  }
}

/**
 * Calculates the expected time a customer spends in the system (Ws) for a M/G/1 model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param variation - The variation of service time (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a customer spends in the system (Ws) as a number.
 *
 * @remarks
 * The M/G/1 model represents a queuing system with a Poisson arrival rate (lambda), a general service time distribution (G), and one server. The method calculates the expected time a customer spends in the system (Ws), considering the arrival rate, service rate, and the variation of service time.
 *
 * The formula used to calculate the expected time a customer spends in the system (Ws) for a M/G/1 model is based on the expected time a customer spends in the queue (Wq):
 * Wq = MGQTimeEx(lambda, mu, variation, 15) // Expected time a customer spends in the queue
 *
 * Ws = Wq + (1 / mu)
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - variation: The variation of service time.
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a customer spends in the system (Ws) for a M/G/1 model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const variation = 1.5; // variation of service time
 * const decimals = 4; // number of decimal places to round the result
 * const result = MGSTimeEx(lambda, mu, variation, decimals); // 6.9250
 * ```
 */
export const MGSTimeEx = (lambda: number = 0, mu: number = 1, variation: number = 0, decimals: number = 4): number => {
  const v = variation
  try {
    
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    const Wq = MGQTimeEx(lambda, mu, v, 15)
    const exp = `${Wq}+(1/${mu})`
    const Ws = evaluate(exp)
    return Number(round(Ws, decimals))

  } catch (error) {
    throw Error(`M/G/1 System Time Expected error: ${error}`)
  }
}
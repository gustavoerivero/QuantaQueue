import { evaluate, round } from 'mathjs'
import { Rho } from '../../basic'

/**
 * Calculates the initial probability in a single server model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability of the single server model as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The initial probability represents the probability that the system is initially empty, i.e., there are no customers in the system, in a single server model. It is calculated as 1 minus the system utilization factor.
 * 
 * The system utilization factor is calculated as the ratio of the customer arrival rate to the product of the service rate and the number of servers in the system. The initial probability is derived from the system utilization factor.
 * 
 * @example
 * ```typescript
 * // Calculate the initial probability for a single server model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const result = SSInitialProbability(lambda, mu); // 0.75
 * ```
 */
export const SSInitialProbability = (lambda: number = 0, mu: number = 1, decimals: number = 4): number | null => {
  try {

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const exp = `1-${rho}`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`Single Server Initial Probability error: ${error}`)
  }
}

/**
 * Calculates the probability of having 'n' customers in a single server model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param iteration - The number of customers 'n' for which the probability is calculated (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The probability of having 'n' customers in the single server model as a number.
 * 
 * @remarks
 * The probability 'P(n)' represents the probability of having 'n' customers in the system in a single server model. It is calculated using the system utilization factor 'rho' and the initial probability 'P(0)'.
 * 
 * The system utilization factor 'rho' is calculated as the ratio of the customer arrival rate to the product of the service rate and the number of servers in the system. The initial probability 'P(0)' represents the probability that the system is initially empty.
 * 
 * @example
 * ```typescript
 * // Calculate the probability of having 3 customers in a single server model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const n = 3; // number of customers
 * const result = SSNProbability(lambda, mu, n); // 0.117
 * ```
 */
export const SSNProbability = (lambda: number = 0, mu: number = 1, iteration: number = 1, decimals: number = 4): number | null => {
  const n = iteration
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`)
    }

    if (n < 1) {
      throw Error(`The parameter 'iteration' cannot be lower than 1.`)
    }

    const rho = Rho(lambda, mu, 1, 15)
    const po = SSInitialProbability(lambda, mu, 15)
    const exp = `(${rho}^${n})*${po}`
    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`Single Server n Probability error: ${error}`)
  }
}

/**
 * Calculates the expected value of the number of customers in the system.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the system as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The expected value of the number of customers in the system, denoted as 'Ls', represents the average number of customers present in the system. It is calculated based on the system utilization factor 'rho'.
 * 
 * If the number of servers 'serverSize' is 1, 'Ls' is computed using the formula 'rho / (1 - rho)'. 'rho' is the system utilization factor, which is calculated as the ratio of the customer arrival rate 'lambda' to the product of the service rate 'mu' and the number of servers 'serverSize'.
 * 
 * If the number of servers is greater than 1, the expected value is not applicable and the function returns 0.
 * 
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 1; // number of servers
 * const result = SSSClientEx(lambda, mu, serverSize); // 0.333
 * ```
 */
export const SSSClientEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number | null => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu === 0 || serverSize === 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to 0.`)
    }

    if (serverSize === 1) {
      const rho = Rho(lambda, mu, serverSize, 15)
      const exp = `${rho}/(1-${rho})`
      const Ls = evaluate(exp)
      return Number(round(Ls, decimals))
    }

    return 0

  } catch (error) {
    throw Error(`Expected value of the number of customers in the system error: ${error}`)
  }

}

/**
 * Calculates the expected value of the number of customers in the queue.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the queue as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The expected value of the number of customers in the queue, denoted as 'Lq', represents the average number of customers waiting in the queue.
 * 
 * If the number of servers 'serverSize' is 1, 'Lq' is computed using the formula '(rho^2) / (1 - rho)'. 'rho' is the system utilization factor, which is calculated as the ratio of the customer arrival rate 'lambda' to the product of the service rate 'mu' and the number of servers 'serverSize'.
 * 
 * If the number of servers is greater than 1, the expected value is not applicable and the function returns 0.
 * 
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in the queue in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 1; // number of servers
 * const result = SSQClientEx(lambda, mu, serverSize); // 0.083
 * ```
 */
export const SSQClientEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number | null => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu === 0 || serverSize === 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to 0.`) 
    }

    if (serverSize === 1) {
      const rho = Rho(lambda, mu, serverSize, 15)
      const exp = `(${rho}^2)/(1-${rho})`
      const Lq = evaluate(exp)
      return Number(round(Lq, decimals))
    }

    return 0

  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`)
    
  }
}

/**
 * Calculates the average waiting time in the system.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The average waiting time in the system as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The average waiting time in the system, denoted as 'Ws', represents the average time a customer spends in the system, including both waiting time in the queue and service time.
 * 
 * If the number of servers 'serverSize' is 1, 'Ws' is computed using the formula '1 / (mu - lambda)'. 'lambda' is the customer arrival rate, and 'mu' is the service rate. Both rates are expressed in units of customers per unit of time.
 * 
 * If the number of servers is greater than 1, the average waiting time is not applicable and the function returns 0.
 * 
 * @example
 * ```typescript
 * // Calculate the average waiting time in the system in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 1; // number of servers
 * const result = SSSTimeEx(lambda, mu, serverSize); // 0.666
 * ```
 */
export const SSSTimeEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number | null => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu === 0 || serverSize === 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to 0.`)
    }

    if (serverSize === 1) {
      const exp = `1/(${mu}-${lambda})`
      const Ws = evaluate(exp)
      return Number(round(Ws, decimals))
    }
    return 0

  } catch (error) {
    throw Error(`Average waiting time in the system error: ${error}`)
  }

}

/**
 * Calculates the average waiting time in the queue.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The average waiting time in the queue as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The average waiting time in the queue, denoted as 'Wq', represents the average time a customer spends waiting in the queue before being served.
 * 
 * If the number of servers 'serverSize' is 1, 'Wq' is computed using the formula 'rho / (mu * (1 - rho))', where 'rho' is the system utilization factor or traffic intensity. 'lambda' is the customer arrival rate, and 'mu' is the service rate. Both rates are expressed in units of customers per unit of time.
 * 
 * If the number of servers is greater than 1, the average waiting time is not applicable, and the function returns 0.
 * 
 * @example
 * ```typescript
 * // Calculate the average waiting time in the queue in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 1; // number of servers
 * const result = SSQTimeEx(lambda, mu, serverSize); // 0.166
 * ```
 */
export const SSQTimeEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number | null => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu === 0 || serverSize === 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to 0.`)
    }

    if (serverSize === 1) {
      const rho = Rho(lambda, mu, serverSize, 15)
      const exp = `${rho}/(${mu}(1-${rho}))`
      const Wq = evaluate(exp)
      return Number(round(Wq, decimals))
    }

    return 0

  } catch (error) {
    throw Error(`Average waiting time in the queue error: ${error}`)
  }

}
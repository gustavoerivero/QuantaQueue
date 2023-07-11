import { evaluate, round } from 'mathjs'
import { Rho, Summation } from '../../basic'

/**
 * Calculates the number of servers that are busy in a M/M/s model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - The number of iterations for the calculation (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The number of servers that are busy for the given iteration as a number.
 * 
 * @remarks
 * The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers. The method calculates the number of servers that are busy during the specified iteration.
 * 
 * If the number of servers (s) is less than or equal to the iteration (n), the formula used is: lambda^n / n!
 * 
 * If the number of servers (s) is greater than the iteration (n), the formula used is: lambda^n / (s! * s^(n-s))
 * 
 * @example
 * ```typescript
 * // Calculate the number of servers that are busy for the given iteration in a M/M/s model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const iteration = 2; // specified iteration
 * const result = MMSQtyServerBusy(lambda, mu, serverSize, iteration); // 0.0313  	111111
 * ```
 */
export const MMSQtyServerBusy = (lambda: number = 0, mu: number = 1, serverSize: number = 1, iteration: number = 1, decimals: number = 4): number => {
  const n = iteration
  const s = serverSize
  try {

    if (mu === 0 ) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`)
    }

    if (n < 1) {
      throw Error(`The parameter 'iteration' cannot be lower than 1.`)
    } 
    
    if (n <= s) {
      const exp = `((${lambda}/${mu})^${n})/(${n}!)`
      const c = evaluate(exp)
      return Number(round(c, decimals))
    } else {
      const exp = `((${lambda}/${mu})^${n})/(${s}!*${s}^(${n}-${s}))`
      const c = evaluate(exp)
      return Number(round(c, decimals))
    }

  } catch (error) {
    throw Error(`M/M/s Quantity of Servers Busy error: ${error}`)
  }
}

/**
 * Calculates the initial probability in a M/M/s model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability of the M/M/s model as a number.
 * 
 * @remarks
 * The initial probability represents the probability that the system is initially empty, i.e., there are no customers in the system, in a M/M/s model. It is calculated based on the customer arrival rate (lambda), service rate (mu), and the number of servers (s) in the system.
 * 
 * The calculation involves several steps, including the computation of the system utilization factor (rho) and a summation for a specific range of values. The initial probability is derived from these intermediate calculations.
 * 
 * @example
 * ```typescript
 * // Calculate the initial probability for a M/M/s model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const result = MMSInitialProbability(lambda, mu, serverSize); // 0.7788
 * ```
 */
export const MMSInitialProbability = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {
  const s = serverSize
  try {

    if (mu === 0 ) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`)
    }

    const upLim = evaluate(`${s}-1`)
    const outExp = `(${lambda}/${mu})^n/(n!)`
    const sum = Summation(0, upLim, outExp, 15)

    const rho = Rho(lambda, mu, s, 15)

    const exp = `1/(${sum}+((((${lambda}/${mu})^${s})/${s}!)*(1/(1-${rho}))))`

    const p = evaluate(exp)
    return Number(round(p, decimals))

  } catch (error) {
    throw Error(`M/M/s Initial Probability error: ${error}`)
  }
}

/**
 * Calculates the Pn probability in a M/M/s model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - Parameter n in the Pn probability (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The Pn probability of the M/M/s model as a number.
 * 
 * @remarks
 * The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers. The method calculates the Pn probability, which represents the probability that there are exactly n customers in the system.
 * 
 * If n is less than or equal to the number of servers (s), the formula used is: ((lambda/mu)^s / (n!)) * Po
 * 
 * If n is greater than the number of servers (s), the formula used is: (lambda/mu) / ((s! * (s^(n-s)))) * Po
 * 
 * Where:
 * - Po: The initial probability of the M/M/s model, calculated using MMSInitialProbability method.
 * 
 * @example
 * ```typescript
 * // Calculate the Pn probability for a M/M/s model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const iteration = 2; // value of n
 * const result = MMSNProbability(lambda, mu, serverSize, iteration); // 0.061
 * ```
 */
export const MMSNProbability = (lambda: number = 0, mu: number = 1, serverSize: number = 1, iteration: number = 0, decimals: number = 4): number => {
  const n = iteration
  const s = serverSize
  try {

    if (mu <= 0 ) {
      throw Error(`The parameter 'mu' cannot be equal to or less than zero (0).`)
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`)
    }

    if (n < 0) {
      throw Error(`The parameter 'n' cannot be lower than 0.`)
    }

    const po = MMSInitialProbability(lambda, mu, s, 15)

    let exp = null

    if (n <= s) {
      exp = `((((${lambda}/${mu})^${s})/(${n}!))*(${po}))`
      const p = evaluate(exp)
      return round(p, decimals)
    } else {
      exp = `(((${lambda}/${mu})/((${s}!)*(${s}^(${n}-${s}))))*(${po}))`
      const p = evaluate(exp)
      return round(p, decimals)
    }

  } catch (error) {
    throw Error(`M/M/s n Probability error: ${error}`)
  }
}

/**
 * Calculates the expected value of the number of customers in the queue in a M/M/s model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the queue as a number.
 * 
 * @remarks
 * The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers. The method calculates the expected value of the number of customers in the queue, which represents the average number of customers waiting in the queue for service.
 * 
 * The formula used to calculate the expected value of the number of customers in the queue is:
 * ((Po * ((lambda/mu)^s)) / (s! * ((1 - rho)^2)) * rho)
 * 
 * Where:
 * - Po: The initial probability of the M/M/s model, calculated using MMSInitialProbability method.
 * - rho: The system utilization factor, calculated as the ratio of the customer arrival rate (lambda) to the product of the service rate (mu) and the number of servers (s).
 * 
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in the queue for a M/M/s model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const result = MMSQClientEx(lambda, mu, serverSize); // 0.0002
 * ```
 */
export const MMSQClientEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  serverSize = serverSize ? serverSize : 1
  try {

    if (mu <= 0 || serverSize <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }

    const rho = Rho(lambda, mu, serverSize, 15)
    const po = MMSInitialProbability(lambda, mu, serverSize, 15)
    const s = serverSize

    const exp = `((${po}*((${lambda}/${mu})^${s}))/(${s}!*((1-${rho})^2))*(${rho}))`

    const Lq = evaluate(exp)
    return Number(round(Lq, decimals))

  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`)
  }
}

/**
 * Method for calculating the expected value of the number of customers in the System.
 * @param {Number} lambda Customer arrival rate to the system. Default is 0.
 * @param {Number} mu Rate of clients served in the system. Default is 1.
 * @param {Number} serverSize Number of servers. Default is 1.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The expected value of the number of customers in the System.
 */
export const MMSSClientEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu <= 0 || serverSize <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }
    const Lq = MMSQClientEx(lambda, mu, serverSize, 15)
    const exp = `${Lq}+(${lambda}/${mu})`
    const Ls = evaluate(exp)
    return Number(round(Ls, decimals))

  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`)
  }
}

/**
 * Method for calculating the average waiting time in the queue.
 * @param {Number} lambda Customer arrival rate to the system. Default is 0.
 * @param {Number} mu Rate of clients served in the system. Default is 1.
 * @param {Number} serverSize Number of servers. Default is 1.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} The average waiting time in the queue.
 */
export const MMSQTimeEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu <= 0 || serverSize <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }
    const Lq = MMSQClientEx(lambda, mu, serverSize, 15)
    const exp = `${Lq}/${lambda}`
    const Wq = evaluate(exp)
    return Number(round(Wq, decimals))

  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`)
  }
}

/**
 * Calculates the expected value of the number of customers in the system (including those in the queue) in a M/M/s model.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the system as a number.
 * 
 * @remarks
 * The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers. The method calculates the expected value of the number of customers in the system, which includes both the customers in the queue and those being served.
 * 
 * The formula used to calculate the expected value of the number of customers in the system is:
 * Ls = Lq + (lambda / mu)
 * 
 * Where:
 * - Lq: The expected value of the number of customers in the queue, calculated using the MMSQClientEx method.
 * - lambda: The customer arrival rate to the system.
 * - mu: The rate of clients served in the system.
 * 
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in the system for a M/M/s model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const result = MMSSClientEx(lambda, mu, serverSize); // 0.2502
 * ```
 */
export const MMSSTimeEx = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu <= 0 || serverSize <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }
    const Wq = MMSQTimeEx(lambda, mu, serverSize, 15)
    const exp = `${Wq}+(1/${mu})`
    const Ws = evaluate(exp)
    return Number(round(Ws, decimals))

  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`)
  }
}

/**
 * Calculates the probability of a customer spending a given amount of time in the system in a M/M/s model.
 * 
 * @param time - The time for which the probability is to be calculated (default: 0).
 * @param lambda - The customer arrival rate to the system (default: 1).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The probability of a customer spending the specified time in the system as a number.
 * 
 * @remarks
 * The M/M/s model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), and s servers. The method calculates the probability of a customer spending a given amount of time in the system, considering the number of servers and the arrival and service rates.
 * 
 * The formula used to calculate the probability of time spent in the system is:
 * P(time) = (e^(-mu*time)) * (1 + ((Lq * ((lambda/mu)^s)) / (s! * (1 - rho))) * ((1 - (e^(-mu*time*(s-1-(lambda/mu)))) / (s - 1 - (lambda/mu)))))
 * 
 * Where:
 * - Lq: The expected value of the number of customers in the queue, calculated using the MMSQClientEx method.
 * - time: The time for which the probability is to be calculated.
 * - lambda: The customer arrival rate to the system.
 * - mu: The rate of clients served in the system.
 * - serverSize: The number of servers in the system.
 * - rho: The system utilization factor, calculated using the Rho method.
 * 
 * @example
 * ```typescript
 * // Calculate the probability of a customer spending 3 units of time in the system for a M/M/s model with the following parameters:
 * const time = 3; // time in the system
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const serverSize = 3; // number of servers in the system
 * const result = MMSSystemTimeProbability(time, lambda, mu, serverSize); // 0.2457
 * ```
 */
export const MMSSystemTimeProbability = (time: number = 0, lambda: number = 1, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu <= 0 || serverSize <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }

    const exp = `(e^(-${mu}*${time}))*(1+((${MMSInitialProbability(lambda, mu, serverSize, 15)}*((${lambda}/${mu})^${serverSize}))/((${serverSize}!)*(1-${Rho(lambda, mu, serverSize, 15)})))*((1-(e^(-${mu}*${time}*(${serverSize}-1-(${lambda}/${mu})))))/(${serverSize}-1-(${lambda}/${mu}))))`

    const p = evaluate(exp)
    return round(p, decimals)

  } catch (error) {
    throw Error(`System Time Probability error: ${error}`)
  }
}

/**
 * Method for calculating the probability of zero queue waiting time.
 * @param {Number} lambda Customer arrival rate to the system. Default is 1.
 * @param {Number} mu Rate of clients served in the system. Default is 1.
 * @param {Number} serverSize Number of servers. Default is 1.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} Probability of zero queue waiting time.
 */
export const MMSProbabilityZeroQueueTime = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  const s = serverSize ? serverSize : 1

  try {
    if (mu <= 0 || s <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }

    let pZero = MMSInitialProbability(lambda, mu, serverSize, 15)
    const upperLimit = Number(s - 1)

    if (upperLimit > 0) {
      for (let i = 1; i <= upperLimit; i++) {
        pZero = pZero + MMSNProbability(lambda, mu, serverSize, i, 15)
      }
    }

    return round(pZero, decimals)

  } catch (error) {
    throw Error(`Probability of zero queue time error: ${error}`)
  }
}

/**
 * Method for calculating the probability of time spent in the queue.
 * @param {Number} time Time to be used to calculate the probability.
 * @param {Number} lambda Customer arrival rate to the system. Default is 1.
 * @param {Number} mu Rate of clients served in the system. Default is 1.
 * @param {Number} serverSize Number of servers. Default is 1.
 * @param {Number} decimals Decimals to which you want to shorten the number. Default is 4.
 * @returns {Number} Probability of time spent in the queue.
 */
export const MMSProbabilityQueueTime = (time: number = 0, lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {
  const s = serverSize ? serverSize : 1

  try {
    if (mu <= 0 || s <= 0) {
      throw Error(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to or less than 0.`)
    }

    const pZero = MMSProbabilityZeroQueueTime(lambda, mu, serverSize, 15)
    const rho = Rho(lambda, mu, serverSize, 15)

    const exp = `((1-${pZero})*(e^(-${serverSize}*${mu}*(1-${rho})*${time})))`

    const pQ1 = evaluate(exp)
    return round(pQ1, decimals)

  } catch (error) {
    throw Error(`Probability of queue time greater than one error: ${error}`)
  }
}
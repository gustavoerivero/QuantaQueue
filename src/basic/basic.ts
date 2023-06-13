import { evaluate, parse, round } from 'mathjs'

/**
 * Calculates the multiplicative inverse of a number.
 * 
 * @param val - The number whose multiplicative inverse is to be calculated.
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The multiplicative inverse of the number, or `null` if an error occurs during the calculation.
 * 
 * @example
 * ```typescript
 * // Calculate the multiplicative inverse of 5
 * const value = 5;
 * const inverse = Inverse(value); // 0.2
 * ```
 */
export const Inverse = (val: number = 1, decimals: number = 4): number | null => {

  if (val === 0) {
    console.log("The parameter 'val' cannot be equal to 0.")
    return null
  }

  try {
    const exp = `1/${val}`
    const inv = evaluate(exp)
    return round(Number(inv), decimals)
  } catch (error) {
    console.log(`The parameter 'val' cannot be equal to 0: ${error}`)
    return null
  }

}

/**
 * Converts a number to its percentage form.
 * 
 * @param value - The value to be displayed as a percentage.
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The number in its percentage form as a string, or `null` if an error occurs during the calculation.
 * 
 * @example
 * ```typescript
 * // Convert 0.25 to its percentage form
 * const value = 0.25;
 * const percentage = Percent(value); // "25%"
 * ```
 */
export const Percent = (value: number = 0, decimals: number = 4): string | null => {
  try {
    if (value < 1) {
      const exp = `${value}*100`
      const res = evaluate(exp)
      return `${round(res, decimals)}%`
    } else {
      const exp = `${value}/100`
      const res = evaluate(exp)
      return `${round(res, decimals)}%`
    }
  } catch (error) {
    console.log(`Error in convert value = '${value}' to percent: ${error}`)
    return null
  }
}

/**
 * Converts a time value from one unit to another.
 * 
 * @param sourceValue - The time value to convert.
 * @param sourceUnit - The source time unit of the value.
 * @param targetUnit - The target time unit to convert to.
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The converted time value, or `null` if an error occurs during the calculation.
 * 
 * @example
 * ```typescript
 * // Convert 30 minutes to hours
 * const minutes = 30;
 * const sourceUnit = time.find(unit => unit.text === 'Minute')!.value; // 60 (seconds)
 * const targetUnit = time.find(unit => unit.text === 'Hour')!.value; // 3600 (seconds)
 * const convertedValue = Convert(minutes, sourceUnit, targetUnit); // 0.5
 * ```
 */
export const Convert = (timeUnit: number, variableTime: number, timeUnitVariable: number, decimals: number = 4): number | null => {
  try {
    const exp = `(1/(${variableTime}*${timeUnitVariable}))*${timeUnit}`
    const res = evaluate(exp)
    return Number(round(res, decimals))
  } catch (error) {
    console.log(`Calculate error: ${error}`)
    return null
  }
}

/**
 * Performs summation of a given expression.
 * 
 * @param lowerLimit - The lower limit of the summation (default: 0).
 * @param upperLimit - The upper limit of the summation (default: 0).
 * @param expression - The expression to be iterated by the summation (default: 'n').
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The result of the summation as a number, or `null` if an error occurs during the calculation.
 * 
 * @example
 * ```typescript
 * // Perform summation from 1 to 5 of the expression '2n + 1'
 * const lowerLimit = 1;
 * const upperLimit = 5;
 * const expression = '2n + 1';
 * const result = Summation(lowerLimit, upperLimit, expression); // 35
 * ```
 */
export const Summation = (lowerLimit: number = 0, upperLimit: number = 0, expression: string = 'n', decimals: number = 4): number | null => {

  upperLimit = upperLimit ? upperLimit : 0
  expression = expression ? expression : 'n'

  try {
    let sum: number = 0
    let n: number = lowerLimit
    for (let i = lowerLimit; i <= upperLimit; i++) {
      const node = parse(expression.replaceAll('n', String(n)))
      const code = node.compile()
      const add = code.evaluate()
      const exp = `${sum}+${add}`
      sum = evaluate(exp)
      n++
    }
    return Number(round(sum, decimals))
  } catch (error) {
    console.log(`Summation error: ${error}`)
    return null
  }

}

/**
 * Calculates the system utilization factor or traffic intensity.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The system utilization factor or traffic intensity as a number, or `null` if an error occurs during the calculation.
 * 
 * @remarks
 * The system utilization factor, also known as traffic intensity, represents the average fraction of time that the system's servers are busy serving customers. It is calculated as the ratio of the customer arrival rate to the product of the service rate and the number of servers in the system.
 * 
 * The system utilization factor indicates the level of congestion or busyness of the system. A value less than 1 indicates that the system is stable and the number of customers in the system will not grow indefinitely. However, a value greater than 1 suggests that the system is overloaded, and the number of customers will increase without limit.
 * 
 * @example
 * ```typescript
 * // Calculate the system utilization factor for a system with the following parameters:
 * const lambda = 10; // customer arrival rate per unit time
 * const mu = 5; // service rate per unit time
 * const serverSize = 3; // number of servers
 * const result = Rho(lambda, mu, serverSize); // 0.6667
 * ```
 */
export const Rho = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number | null => {

  serverSize = serverSize ? serverSize : 1

  try {

    if (mu === 0 || serverSize === 0) {
      console.log(`The parameter '${mu === 0 ? 'mu' : 'server size'}' cannot be equal to 0.`)
      return null
    }

    const exp = `${lambda}/(${mu}*${serverSize})`
    const rho = evaluate(exp)
    if (rho < 1) {
      console.log(`The system stabilizes, i.e., converges to a number.`)
    }

    console.log(`System utilization factor or traffic intensity is the ${rho} The number of customers in the system increases without limit.`)
    return Number(round(rho, decimals))

  } catch (error) {
    console.log(`System utilization factor error: ${error}`)
    return null
  }

}
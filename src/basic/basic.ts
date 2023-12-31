import { evaluate, parse, round } from 'mathjs'

/**
 * Calculates the inverse of a number.
 * 
 * @param val - The value for which the inverse is to be calculated (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The inverse of the specified value as a number.
 * 
 * @remarks
 * The function calculates the inverse of a number by dividing 1 by the specified value.
 * 
 * @example
 * ```typescript
 * // Calculate the inverse of 2:
 * const val = 2;
 * const result = Inverse(val); // 0.5
 * ```
 */
export const Inverse = (val: number = 1, decimals: number = 4): number => {

  if (typeof val !== "number") {
    throw Error(`The "val" variable must have a numeric value.`)
  }

  if (typeof decimals !== "number") {
    throw Error(`The "decimals" variable must have a numeric value.`)
  }

  if (val === 0) {
    throw Error(`The parameter 'val'cannot be equal to zero (0).`)
  }

  try {
    const exp = `1/${val}`
    const inv = evaluate(exp)
    return round(Number(inv), decimals)
  } catch (error) {
    throw Error(`The parameter 'val' cannot be equal to 0: ${error}`)
  }

}

/**
 * Converts a number to a percentage format.
 *
 * @param value - The value to be converted to a percentage (default: 0).
 * @param total - The total value used for conversion (default: 100).
 * @param type - The conversion type. If true, the value is multiplied by the total; if false, the value is divided by the total; if "MULTIPLY", the value is multiplied by the total; if "DIVISION", the value is divided by the total. (default: true).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The value converted to a percentage as a string.
 *
 * @remarks
 * The function converts a number to a percentage format by multiplying it by 100 or dividing it by 100, depending on the `type` parameter. The `total` parameter is used as the divisor or multiplicand in the conversion.
 *
 * @example
 * ```typescript
 * // Convert 0.25 to a percentage using multiplication:
 * const value = 0.25;
 * const result = Percent(value); // "25%"
 *
 * // Convert 50 to a percentage using division:
 * const number = 50;
 * const result = Percent(number, 200, false); // "25%"
 * ```
 */
export const Percent = (value: number = 0, total: number = 100, type: boolean | "MULTIPLY" | "DIVISION" = true, decimals: number = 4): string => {
  try {

    if (typeof value !== "number") {
      throw Error(`The "value" variable must have a numeric value.`)
    }

    if (typeof total !== "number") {
      throw Error(`The "total" variable must have a numeric value.`)
    }

    if (typeof decimals !== "number") {
      throw Error(`The "decimals" variable must have a numeric value.`)
    }

    if (total === 0) {
      throw Error(`The parameter 'total' cannot be equal to zero (0).`)
    }

    type = type && typeof type === "string" && type === "MULTIPLY"

    if (type) {
      const exp = `${value}*${total}`
      const res = evaluate(exp)
      return `${round(res, decimals)}%`
    } else {
      const exp = `(${value}/${total})*100`
      const res = evaluate(exp)
      return `${round(res, decimals)}%`
    }
  } catch (error) {
    throw Error(`Error in convert value = '${value}' to percent: ${error}`)
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
 * @remarks
 * The function converts a time value from one unit to another by using the formula:
 * convertedValue = (1 / (variableTime * timeUnitVariable)) * timeUnit
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
export const Convert = (sourceValue: number, sourceUnit: number, targetUnit: number, decimals: number = 4): number => {
  try {

    if (!sourceValue || typeof sourceValue !== "number") {
      throw Error(`The "timeUnit" variable must have a numeric value.`)
    }

    if (!sourceUnit || typeof sourceUnit !== "number") {
      throw Error(`The "variableTime" variable must have a numeric value.`)
    }

    if (!targetUnit || typeof targetUnit !== "number") {
      throw Error(`The "timeUnitVariable" variable must have a numeric value.`)
    }

    if (typeof decimals !== "number") {
      throw Error(`The "decimals" variable must have a numeric value.`)
    }

    if (targetUnit === 0) {
      throw Error(`The variable "variableTime" cannot be equal to zero (0).`)
    }

    if (sourceValue === 0) {
      throw Error(`The variable "timeUnitVariable" cannot be equal to zero (0).`)
    }

    const exp = `(1/(${sourceValue}*${sourceUnit}))*${targetUnit}`
    const res = evaluate(exp)
    return Number(round(res, decimals))
  } catch (error) {
    throw Error(`Calculate error: ${error}`)
  }
}

/**
 * Calculates the summation of an expression over a range of values.
 * 
 * @param lowerLimit - The lower limit of the summation range (default: 0).
 * @param upperLimit - The upper limit of the summation range (default: 0).
 * @param expression - The expression to be evaluated in each iteration of the summation (default: 'n').
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The summation of the expression over the range of values as a number.
 * 
 * @remarks
 * The function calculates the summation of an expression over a range of values, using the specified lower limit, upper limit, and expression. The expression can contain the variable 'n' which represents the current value in each iteration. The result is rounded to the specified number of decimal places.
 * 
 * @example
 * ```typescript
 * // Calculate the summation of n^2 from 1 to 5:
 * const lowerLimit = 1;
 * const upperLimit = 5;
 * const expression = '(n+1)/2';
 * const result = Summation(lowerLimit, upperLimit, expression); // 10
 * ```
 */
export const Summation = (lowerLimit: number = 0, upperLimit: number = 0, expression: string = 'n', decimals: number = 4): number => {

  try {

    if (typeof lowerLimit !== "number") {
      throw Error(`The "lowerLimit" variable must have a numeric value.`)
    }

    if (typeof upperLimit !== "number") {
      throw Error(`The "upperLimit" variable must have a numeric value.`)
    }

    if (typeof expression !== "string") {
      throw Error(`The "expression" variable must have a string value.`)
    }

    if (typeof decimals !== "number") {
      throw Error(`The "decimals" variable must have a numeric value.`)
    }

    lowerLimit = lowerLimit ?? 0
    upperLimit = upperLimit ?? 0
    expression = expression ?? 'n'

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
    throw Error(`Summation error: ${error}`)
  }

}

/**
 * Calculates the system utilization factor or traffic intensity.
 * 
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The system utilization factor or traffic intensity as a number.
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
export const Rho = (lambda: number = 0, mu: number = 1, serverSize: number = 1, decimals: number = 4): number => {

  try {

    if (typeof lambda !== "number") {
      throw Error(`The "lambda" variable must have a numeric value.`)
    }

    if (typeof mu !== "number") {
      throw Error(`The "mu" variable must have a numeric value.`)
    }

    if (typeof serverSize !== "number") {
      throw Error(`The "serverSize" variable must have a numeric value.`)
    }

    if (typeof decimals !== "number") {
      throw Error(`The "decimals" variable must have a numeric value.`)
    }

    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`)
    }

    if (serverSize <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`)
    }

    serverSize = serverSize ?? 1

    const exp = `${lambda}/(${mu}*${serverSize})`
    const rho = evaluate(exp)

    if (rho < 1) {
      console.info(`The system stabilizes, i.e., converges to a number.`)
    }

    return Number(round(rho, decimals))

  } catch (error) {
    throw Error(`System utilization factor error: ${error}`)
  }

}
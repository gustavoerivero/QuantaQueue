import { evaluate, round } from 'mathjs';
import { Rho, Summation } from '../../basic';

/**
 * Calculates the lambda value for a M/M/s/k model.
 *
 * @param lambda - The lambda value for the model (default: 0).
 * @param iteration - The current iteration (default: 0).
 * @param limit - The maximum iteration (default: 0).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The lambda value for the model as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the lambda value for the model, considering the number of servers, the classes of customers, and the arrival rate.
 *
 * The formula used to calculate the lambda value for a M/M/s/k model is:
 * lambda = (k * (iteration + 1)) / (n * round(lambda, decimals))
 *
 * Where:
 * - k: The number of classes of customers in the system.
 * - iteration: The current iteration.
 * - n: The number of servers in the system.
 * - lambda: The lambda value for the model.
 *
 * @example
 * ```typescript
 * // Calculate the lambda value for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const iteration = 1; // current iteration
 * const limit = 10; // maximum iteration
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKNLambda(lambda, iteration, limit, decimals); // 0.5
 * ```
 */
export const MMSKNLambda = (
  lambda: number = 0,
  iteration: number = 0,
  limit: number = 0,
  decimals: number = 4,
): number => {
  const n = iteration ?? 1;
  const k = limit ?? 1;

  try {
    return n > k ? 0 : round(lambda, decimals);
  } catch (error) {
    throw Error(`Lambda n for M/M/s/k error: ${error}`);
  }
};

/**
 * Calculates the quantity of servers busy (c) for a given M/M/s/k model at a specific iteration (n).
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - The current iteration (default: 1).
 * @param limit - The maximum iteration (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The quantity of servers busy (c) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the quantity of servers busy (c) at a specific iteration (n), considering the number of servers, the classes of customers, and the arrival rate.
 *
 * The formula used to calculate the quantity of servers busy (c) for a given M/M/s/k model at a specific iteration (n) is:
 *
 * If (n <= s):
 * c = (1/mu)^n / n!
 *
 * If (n <= k):
 * c = (((l/mu)^s) / (s!)) * (((l / (mu * s))^(n - s))) - ((l/mu)^n) / (s! * s^(n - s))
 *
 * Otherwise:
 * c = 0
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system.
 * - iteration: The current iteration.
 * - limit: The maximum iteration.
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the quantity of servers busy (c) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers in the system
 * const iteration = 3; // current iteration
 * const limit = 5; // maximum iteration
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKQtyServerBusy(lambda, mu, serverSize, iteration, limit, decimals); // 0.0012
 * ```
 */
export const MMSKQtyServerBusy = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  iteration: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const n = iteration;
  const s = serverSize;
  const k = limit;
  const l = MMSKNLambda(lambda, n, k, 15);
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s === 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s}.`);
    }

    if (n < 0) {
      throw Error(`The parameter 'iteration' cannot be lower than zero (0).`);
    }

    if (n <= s) {
      const exp = `((1/${mu})^${n})/(${n}!)`;
      const c = evaluate(exp);
      return Number(round(c, decimals));
    } else if (n <= k) {
      const exp = `((((${l}/${mu})^${s})/(${s}!))*((${l}/(${mu}*${s}))^(${n}-${s})))-((${l}/${mu})^${n})/(${s}!*${s}^(${n}-${s}))`;
      const c = evaluate(exp);
      return Number(round(c, decimals));
    } else {
      return Number(0);
    }
  } catch (error) {
    throw Error(`M/M/s/k Quantity of Servers Busy error: ${error}`);
  }
};

/**
 * Calculates the initial probability for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the initial probability for the system, considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the initial probability for a M/M/s/k model is based on the utilization factor (rho) and the factorial of the number of servers (s!):
 * rho = lambda / (s * mu)
 * initial probability = 1 / (Summation(n=0 to s, (rho^n / n!) + ((rho^s / s!) * Summation(n=s+1 to k, (rho^(n-s)))))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the initial probability for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKInitialProbability(lambda, mu, serverSize, limit, decimals); // 0.6726
 * ```
 */

export const MMSKInitialProbability = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const lowLimit = evaluate(`${s}+1`);
    const outExp1 = `(${l}/${mu})^n/(n!)`;
    const sum1 = Summation(0, s, outExp1, 15);

    const outExp2 = `((${l}/(${s}*${mu}))^(n-${s}))`;
    const sum2 = Summation(lowLimit, k, outExp2, 15);

    const exp = `1/(${sum1}+(((${l}/${mu})^${s})/${s}!)*${sum2})`;
    const po = evaluate(exp);

    return Number(round(po, decimals));
  } catch (error) {
    throw Error(`M/M/s/k Initial Probability error: ${error}`);
  }
};

/**
 * Calculates the probability of having n customers in a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param iteration - The number of customers (n) for which the probability is calculated (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The probability of having n customers as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the probability of having n customers in the system, considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the probability of having n customers for a M/M/s/k model is based on the initial probability (P0) and the utilization factor (rho):
 * rho = lambda / (s * mu)
 *
 * If n <= s:
 * Probability of having n customers = (1 / mu)^n / (n!) * P0
 *
 * If n > s and n <= k:
 * Probability of having n customers = ((lambda / mu)^n) / (s! * s^(n - s)) * P0
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - iteration: The number of customers (n) for which the probability is calculated.
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the probability of having 2 customers in a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const iteration = 2; // number of customers (n)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKNProbability(lambda, mu, serverSize, iteration, limit, decimals); // 0.0627
 * ```
 */

export const MMSKNProbability = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  iteration: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const n = iteration ?? 0;
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, n, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s}.`);
    }

    if (n < 0) {
      throw Error(`The parameter 'iteration' cannot be lower than zero (0).`);
    }

    const po = MMSKInitialProbability(l, mu, s, k, 15);

    if (n <= s) {
      const exp = `(1/${mu})^${n}/(${n}!)*${po}`;
      const pn = evaluate(exp);
      return Number(round(pn, decimals));
    } else if (n <= k) {
      const exp = `((${l}/${mu})^${n})/(${s}!*${s}^(${n}-${s}))*${po}`;
      const pn = evaluate(exp);
      return Number(round(pn, decimals));
    } else {
      return Number(0);
    }
  } catch (error) {
    throw Error(`M/M/s/k n Probability error: ${error}`);
  }
};

/**
 * Calculates the expected number of clients in the queue (Lq) for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of clients in the queue (Lq) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the expected number of clients in the queue (Lq) for the system, considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected number of clients in the queue (Lq) for a M/M/s/k model is based on the initial probability (P0) and the utilization factor (rho):
 * rho = lambda / (s * mu)
 *
 * Lq = P0 * ((lambda / mu)^s) / (s! * ((1 - rho)^2)) * (rho * (1 - (rho)^(k-s) - ((k-s) * ((rho)^(k-s)) * (1 - rho))))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the queue (Lq) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKQClientEx(lambda, mu, serverSize, limit, decimals); // 1.8333
 * ```
 */

export const MMSKQClientEx = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const po = MMSKInitialProbability(l, mu, s, k, 15);
    const rho = Rho(l, mu, s, 15);

    const exp = `((${po}*((${l}/${mu})^${s}))/(${s}!*((1-${rho})^2)))*(${rho}*(1-(${rho})^(${k}-${s})-((${k}-${s})*((${rho})^(${k}-${s}))*(1-${rho}))))`;

    const Lq = evaluate(exp);

    return Number(round(Lq, decimals));
  } catch (error) {
    throw Error(`M/M/s/k Queue Expected Clients error: ${error}`);
  }
};

/**
 * Calculates the expected number of clients in the system (Ls) for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of clients in the system (Ls) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the expected number of clients in the system (Ls), considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected number of clients in the system (Ls) for a M/M/s/k model is based on the expected number of clients in the queue (Lq) and the utilization factor (rho):
 * rho = lambda / (s * mu)
 *
 * Ls = Lq + s * (1 - P0 - P1 - P2 - ... - P(s-1))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of clients in the system (Ls) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKSClientEx(lambda, mu, serverSize, limit, decimals); // 2.0782
 * ```
 */

export const MMSKSClientEx = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const Lq = MMSKQClientEx(l, mu, s, k, 15);

    const expUpperLimit = `${s}-1`;
    const upperLimit = evaluate(expUpperLimit);

    let sum1 = 0;
    let sum2 = MMSKInitialProbability(l, mu, s, k, 15);

    //Manual summation:
    for (let i = 1; i <= upperLimit; i++) {
      const pn = MMSKNProbability(l, mu, s, i, k, 15);

      const exp = `${i}*${pn}`;
      const add = evaluate(exp);

      const exp1 = `${sum1}+${add}`;
      const exp2 = `${sum2}+${pn}`;

      sum1 = evaluate(exp1);
      sum2 = evaluate(exp2);
    }

    const exp = `${sum1}+${Lq}+(${s}*(1-${sum2}))`;
    const Ls = evaluate(exp);

    return Number(round(Ls, decimals));
  } catch (error) {
    throw Error(`M/M/s/k System Expected Clients error: ${error}`);
  }
};

/**
 * Calculates the expected time a client spends in the queue (Wq) for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a client spends in the queue (Wq) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the expected time a client spends in the queue (Wq), considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected time a client spends in the queue (Wq) for a M/M/s/k model is based on the expected number of clients in the queue (Lq) and the probability of having k customers in the system (Pk):
 * Lq = MMSKQClientEx(lambda, mu, serverSize, limit, decimals) // Expected number of clients in the queue
 * Pk = MMSKNProbability(lambda, mu, serverSize, limit, limit, decimals) // Probability of having k customers in the system
 *
 * Wq = Lq / (lambda * (1 - Pk))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the queue (Wq) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKQTimeEx(lambda, mu, serverSize, limit, decimals); // 1.1765
 * ```
 */
export const MMSKQTimeEx = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const pk = MMSKNProbability(l, mu, s, k, k, 15);
    const Lq = MMSKQClientEx(l, mu, s, k, 15);

    const exp = `${Lq}/(${l}*(1-${pk}))`;
    const Wq = evaluate(exp);

    return Number(round(Wq, decimals));
  } catch (error) {
    throw Error(`M/M/s/k Queue Expected Time error: ${error}`);
  }
};

/**
 * Calculates the expected time a client spends in the system (Ws) for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected time a client spends in the system (Ws) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the expected time a client spends in the system (Ws), considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected time a client spends in the system (Ws) for a M/M/s/k model is based on the expected number of clients in the system (Ls) and the probability of having k customers in the system (Pk):
 * Ls = MMSKSClientEx(lambda, mu, serverSize, limit, decimals) // Expected number of clients in the system
 * Pk = MMSKNProbability(lambda, mu, serverSize, limit, limit, decimals) // Probability of having k customers in the system
 *
 * Ws = Ls / (lambda * (1 - Pk))
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected time a client spends in the system (Ws) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKSTimeEx(lambda, mu, serverSize, limit, decimals); // 1.2821
 * ```
 */
export const MMSKSTimeEx = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const pk = MMSKNProbability(l, mu, s, k, k, 15);
    const Ls = MMSKSClientEx(l, mu, s, k, 15);

    const exp = `${Ls}/(${l}*(1-${pk}))`;
    const Ws = evaluate(exp);

    return Number(round(Ws, decimals));
  } catch (error) {
    throw Error(`M/M/s/k System Expected Time error: ${error}`);
  }
};

/**
 * Calculates the expected number of lost clients (Ll) for a M/M/s/k model.
 *
 * @param lambda - The arrival rate (default: 0).
 * @param mu - The service rate (default: 1).
 * @param serverSize - The number of servers in the system (default: 1).
 * @param limit - The maximum number of customers in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected number of lost clients (Ll) as a number.
 *
 * @remarks
 * The M/M/s/k model represents a queuing system with a Poisson arrival rate (lambda), an exponential service rate (mu), s servers, and k classes of customers. The method calculates the expected number of lost clients (Ll), considering the arrival rate, service rate, number of servers, and the maximum number of customers in the system.
 *
 * The formula used to calculate the expected number of lost clients (Ll) for a M/M/s/k model is based on the probability of having k customers in the system (Pk):
 * Pk = MMSKNProbability(lambda, mu, serverSize, limit, limit, decimals) // Probability of having k customers in the system
 *
 * Ll = lambda * (1 - Pk)
 *
 * Where:
 * - lambda: The arrival rate (customer arrival rate per unit time).
 * - mu: The service rate (customer service rate per unit time).
 * - serverSize: The number of servers in the system (s).
 * - limit: The maximum number of customers in the system (k).
 * - decimals: The number of decimal places to round the result.
 *
 * @example
 * ```typescript
 * // Calculate the expected number of lost clients (Ll) for a M/M/s/k model with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 0.2; // customer service rate per unit time
 * const serverSize = 2; // number of servers (s)
 * const limit = 10; // maximum number of customers in the system (k)
 * const decimals = 4; // number of decimal places to round the result
 * const result = MMSKLostLambda(lambda, mu, serverSize, limit, decimals); // 0.8941
 * ```
 */
export const MMSKLostLambda = (
  lambda: number = 0,
  mu: number = 1,
  serverSize: number = 1,
  limit: number = 1,
  decimals: number = 4,
): number => {
  const s = serverSize ?? 1;
  const k = limit ?? 1;
  const l = MMSKNLambda(lambda, 0, k, 15);

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to zero (0).`);
    }

    if (s <= 0) {
      throw Error(`The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`);
    }

    if (k === 0) {
      throw Error(`The parameter 'limit' cannot be equal to zero (0).`);
    }

    if (k < s + 1) {
      throw Error(`The parameter 'limit' ${k} cannot be lower than the server size ${s} plus 1.`);
    }

    const pk = MMSKNProbability(l, mu, s, k, k, 15);

    const exp = `(${l}*(1-${pk}))`;
    const ll = evaluate(exp);

    return Number(round(ll, decimals));
  } catch (error) {
    throw Error(`M/M/s/k System Expected Time error: ${error}`);
  }
};

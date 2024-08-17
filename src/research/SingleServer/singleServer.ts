import { evaluate, round } from 'mathjs';
import { Rho } from '../../basic';

/**
 * Calculates the initial probability in a single server model.
 *
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The initial probability of the single server model as a number.
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
export const SSInitialProbability = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    const rho = Rho(lambda, mu, 1, 15);
    const exp = `1-${rho}`;
    const p = evaluate(exp);
    return Number(round(p, decimals));
  } catch (error) {
    throw Error(`Single Server Initial Probability error: ${error}`);
  }
};

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
export const SSNProbability = (
  lambda: number = 0,
  mu: number = 1,
  iteration: number = 1,
  decimals: number = 4,
): number => {
  const n = iteration;

  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    if (n < 1) {
      throw Error(`The parameter 'iteration' cannot be lower than 1.`);
    }

    const rho = Rho(lambda, mu, 1, 15);
    const po = SSInitialProbability(lambda, mu, 15);
    const exp = `(${rho}^${n})*${po}`;
    const p = evaluate(exp);
    return Number(round(p, decimals));
  } catch (error) {
    throw Error(`Single Server n Probability error: ${error}`);
  }
};

/**
 * Calculates the expected value of the number of customers in the system.
 *
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the system as a number.
 *
 * @remarks
 * The expected value of the number of customers in the system, denoted as 'Ls', represents the average number of customers present in the system. It is calculated based on the system utilization factor 'rho'.
 *
 * 'Ls' is computed using the formula 'rho / (1 - rho)'. 'rho' is the system utilization factor, which is calculated as the ratio of the customer arrival rate 'lambda' to the product of the service rate 'mu' and the number of servers 'serverSize'.
 *
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const result = SSSClientEx(lambda, mu); // 0.333
 * ```
 */
export const SSSClientEx = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    const rho = Rho(lambda, mu, 1, 15);
    const exp = `${rho}/(1-${rho})`;
    const Ls = evaluate(exp);
    return Number(round(Ls, decimals));
  } catch (error) {
    throw Error(`Expected value of the number of customers in the system error: ${error}`);
  }
};

/**
 * Calculates the expected value of the number of customers in the queue.
 *
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The expected value of the number of customers in the queue as a number.
 *
 * @remarks
 * The expected value of the number of customers in the queue, denoted as 'Lq', represents the average number of customers waiting in the queue.
 *
 * 'Lq' is computed using the formula '(rho^2) / (1 - rho)'. 'rho' is the system utilization factor, which is calculated as the ratio of the customer arrival rate 'lambda' to the product of the service rate 'mu' and the number of servers 'serverSize'.
 *
 * @example
 * ```typescript
 * // Calculate the expected value of the number of customers in the queue in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const result = SSQClientEx(lambda, mu); // 0.083
 * ```
 */
export const SSQClientEx = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    const rho = Rho(lambda, mu, 1, 15);
    const exp = `(${rho}^2)/(1-${rho})`;
    const Lq = evaluate(exp);
    return Number(round(Lq, decimals));
  } catch (error) {
    throw Error(`Expected value of the number of customers in the queue error: ${error}`);
  }
};

/**
 * Calculates the average waiting time in the system.
 *
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The average waiting time in the system as a number.
 *
 * @remarks
 * The average waiting time in the system, denoted as 'Ws', represents the average time a customer spends in the system, including both waiting time in the queue and service time.
 *
 * 'Ws' is computed using the formula '1 / (mu - lambda)'. 'lambda' is the customer arrival rate, and 'mu' is the service rate. Both rates are expressed in units of customers per unit of time.
 *
 * @example
 * ```typescript
 * // Calculate the average waiting time in the system in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const result = SSSTimeEx(lambda, mu); // 0.666
 * ```
 */
export const SSSTimeEx = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    const exp = `1/(${mu}-${lambda})`;
    const Ws = evaluate(exp);
    return Number(round(Ws, decimals));
  } catch (error) {
    throw Error(`Average waiting time in the system error: ${error}`);
  }
};

/**
 * Calculates the average waiting time in the queue.
 *
 * @param lambda - The customer arrival rate to the system (default: 0).
 * @param mu - The rate of clients served in the system (default: 1).
 * @param decimals - The number of decimal places to round the result (default: 4).
 * @returns The average waiting time in the queue as a number.
 *
 * @remarks
 * The average waiting time in the queue, denoted as 'Wq', represents the average time a customer spends waiting in the queue before being served.
 *
 * 'Wq' is computed using the formula 'rho / (mu * (1 - rho))', where 'rho' is the system utilization factor or traffic intensity. 'lambda' is the customer arrival rate, and 'mu' is the service rate. Both rates are expressed in units of customers per unit of time.
 *
 * @example
 * ```typescript
 * // Calculate the average waiting time in the queue in a single server system with the following parameters:
 * const lambda = 0.5; // customer arrival rate per unit time
 * const mu = 2; // service rate per unit time
 * const result = SSQTimeEx(lambda, mu); // 0.166
 * ```
 */
export const SSQTimeEx = (lambda: number = 0, mu: number = 1, decimals: number = 4): number => {
  try {
    if (mu === 0) {
      throw Error(`The parameter 'mu' cannot be equal to 0.`);
    }

    const rho = Rho(lambda, mu, 1, 15);
    const exp = `${rho}/(${mu}(1-${rho}))`;
    const Wq = evaluate(exp);
    return Number(round(Wq, decimals));
  } catch (error) {
    throw Error(`Average waiting time in the queue error: ${error}`);
  }
};

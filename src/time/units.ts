import { TTimeUnit } from '../interfaces'

/**
 * Array of time units with their respective values in seconds.
 * 
 * @remarks
 * This array provides a set of predefined time units along with their corresponding values in seconds.
 * Each time unit object in the array contains an `id`, `text`, and `value` property representing the unique identifier, name, and value in seconds, respectively.
 * The time units are ordered from smallest to largest.
 * 
 * The array contains a total of 16 time units, starting from id 1 for "Nanosecond" and ending with id 16 for "Millennium".
 * 
 * @example
 * ```typescript
 * // Access the value of "Minute"
 * const minute = time[6].value; // 60 seconds
 * 
 * // Iterate over all time units
 * time.forEach((unit) => {
 *   console.log(unit.text, unit.value);
 * });
 * ```
 */
const time: TTimeUnit[] = [
  { id: 1, text: 'Nanosecond', value: 0.000000001 },
  { id: 2, text: 'Microsecond', value: 0.000001 },
  { id: 3, text: 'Millisecond', value: 0.001 },
  { id: 4, text: 'Centisecond', value: 0.01 },
  { id: 5, text: 'Decitosecond', value: 0.1 },
  { id: 6, text: 'Second', value: 1 },
  { id: 7, text: 'Minute', value: 60 },
  { id: 8, text: 'Hour', value: 3600 },
  { id: 9, text: 'Day', value: 86400 },
  { id: 10, text: 'Week', value: 604800 },
  { id: 11, text: 'Month', value: 2419200 },
  { id: 12, text: 'Year', value: 29030400 },
  { id: 13, text: 'Lustrum', value: 145152000 },
  { id: 14, text: 'Decade', value: 725760000 },
  { id: 15, text: 'Century', value: 7257600000 },
  { id: 16, text: 'Millennium', value: 72576000000 }
]


export default time
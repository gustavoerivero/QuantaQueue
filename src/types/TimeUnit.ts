/**
 * The ``TimeUnit`` data type consists of an object containing 
 * the ``id``, ``text`` and ``value`` properties. The ``id`` property 
 * is used to represent the time with respect to the other time units. 
 * The ``text`` property corresponds to the name given to the corresponding 
 * time unit. Finally, the ``value`` property contains the value in seconds 
 * associated to that time unit.
 */
export type TimeUnit = {
  id: number;
  text: string;
  value: number;
};
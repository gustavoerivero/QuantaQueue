# Único servidor

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> Inglés </a></td>
          <td><a href="./README-ES.md"> Español </a></td>
      </tr>
  </table>
</div>

A continuación, se definen los modelos de un solo servidor:

| **_Índice_**       | **Definición**                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| _[M/M/1](#mm1)_    | Modelo de colas con un servidor, tiempos de llegada y servicio exponenciales.                                                                 |
| _[M/M/1/k](#mm1k)_ | Modelo de colas con un servidor y "k" canales de servicio, tiempos de llegada y servicio exponenciales.                                       |
| _[M/G/1](#mg1)_    | Modelo de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio distribuidos de acuerdo con una distribución general. |

## M/M/1

Este modelo de colas es un modelo simple que se utiliza para modelar sistemas de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio exponenciales. El modelo M/M/1 se puede utilizar para calcular la longitud media de la cola, el tiempo medio de espera en la cola y el tiempo medio de servicio.

### SSInitialProbability

La función `SSInitialProbability` calcula la probabilidad inicial en un modelo de servidor único.

#### Parámetros

La función `SSInitialProbability` tiene tres parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSInitialProbability` devuelve la probabilidad inicial del modelo de servidor único como un número.

#### Errores

La función `SSInitialProbability` puede arrojar el siguiente error:

- `Error`: Si el parámetro `mu` es igual a 0.

#### Ejemplo de uso

El siguiente código calcula la probabilidad inicial para un modelo de servidor único con los siguientes parámetros:

```typescript
// Calculate the initial probability for a single server model with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const result = SSInitialProbability(lambda, mu); // 0.75
```

#### Explicación matemática

La probabilidad inicial representa la probabilidad de que el sistema esté inicialmente vacío, es decir, que no haya clientes en el sistema, en un modelo de servidor único. Se calcula como 1 menos el factor de utilización del sistema.

El factor de utilización del sistema se calcula como la relación de la tasa de llegada de clientes con el producto de la tasa de servicio y el número de servidores en el sistema. La probabilidad inicial se deriva del factor de utilización del sistema.

La siguiente es la fórmula matemática para calcular la probabilidad inicial en un modelo de servidor único:

```matlab
p = 1 - rho
```

donde:

- `p`: La probabilidad inicial.
- `rho`: El factor de utilización del sistema.

La función `SSInitialProbability` utiliza esta fórmula para calcular la probabilidad inicial del modelo de servidor único. El resultado se redondea al número especificado de decimales.

### SSNProbability

La función `SSNProbability` calcula la probabilidad de tener `n` clientes en un modelo de servidor único.

#### Parámetros

La función `SSNProbability` tiene los siguientes parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `iteration`: El número de clientes `n` para los que se calcula la probabilidad. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSNProbability` devuelve la probabilidad de tener n clientes en el modelo de servidor único como un número.

#### Errores

La función `SSNInitialProbability` puede arrojar los siguientes errores:

- `Error`: Si el parámetro `mu` es igual a 0.
- `Error`: Si el parámetro `iteration` es menor que 1.

#### Ejemplo de uso

El siguiente código calcula la probabilidad de tener 3 clientes en un modelo de servidor único con los siguientes parámetros:

```typescript
// Calculate the probability of having 3 customers in a single server model with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const n = 3; // number of customers
const result = SSNProbability(lambda, mu, n); // 0.117
```

#### Explicación matemática

La probabilidad `P(n)` representa la probabilidad de tener `n` clientes en el sistema en un modelo de servidor único. Se calcula utilizando el factor de utilización del sistema `rho` y la probabilidad inicial `P(0)`.

El factor de utilización del sistema `rho` se calcula como la relación de la tasa de llegada de clientes con el producto de la tasa de servicio y el número de servidores en el sistema. La probabilidad inicial `P(0)` representa la probabilidad que el sistema esté inicialmente vacío.

La siguiente es la fórmula matemática para calcular la probabilidad de tener `n` clientes en un modelo de servidor único:

```matlab
P(n) = (rho)^n * P(0)
```

donde:

- `P(n)`: La probabilidad de tener `n` clientes.
- `rho`: El factor de utilización del sistema.
- `P(0)`: La probabilidad inicial.

La función `SSNProbability` utiliza esta fórmula para calcular la probabilidad de tener `n` clientes en el modelo de servidor único. El resultado se redondea al número especificado de decimales.

### SSSClientEx

La función `SSSClientEx` calcula el valor esperado del número de clientes en el sistema.

#### Parámetros

La función `SSSClientEx` tiene los siguientes parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSSClientEx` devuelve el valor esperado del número de clientes en el sistema como un número.

#### Errores

La función `SSSClientEx` puede arrojar los siguientes errores:

- `Error`: Si el parámetro `mu` es igual a 0.

#### Ejemplo de uso

El siguiente código calcula el valor esperado del número de clientes en un sistema de un solo servidor con los siguientes parámetros:

```typescript
// Calculate the expected value of the number of customers in a single server system with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const result = SSSClientEx(lambda, mu); // 0.333
```

#### Explicación matemática

El valor esperado del número de clientes en el sistema, denotado como `Ls`, representa el número promedio de clientes presentes en el sistema. Se calcula en base al factor de utilización del sistema `rho`.

Si el número de servidores `serverSize` es 1, `Ls` se calcula utilizando la fórmula `rho / (1 - rho)`. `rho` es el factor de utilización del sistema, que se calcula como la relación de la tasa de llegada de clientes `lambda` con el producto de la tasa de servicio `mu` y el número de servidores `serverSize` que, para esta función, siempre será igual a 1.

La siguiente es la fórmula matemática para calcular el valor esperado del número de clientes en el sistema:

```matlab
Ls = rho / (1 - rho)
```

donde:

- `Ls`: El valor esperado del número de clientes.
- `rho`: El factor de utilización del sistema.

La función `SSSClientEx` utiliza esta fórmula para calcular el valor esperado del número de clientes en el sistema. El resultado se redondea al número especificado de decimales.

### SSQClientEx

La función `SSQClientEx` calcula el valor esperado del número de clientes en la cola.

#### Parámetros

La función `SSQClientEx` tiene los siguientes parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSQClientEx` devuelve el valor esperado del número de clientes en la cola como un número.

#### Errores

La función `SSQClientEx` puede arrojar los siguientes errores:

- `Error`: Si el parámetro `mu` es igual a 0.

#### Ejemplo de uso

El siguiente código calcula el valor esperado del número de clientes en la cola en un sistema de un solo servidor con los siguientes parámetros:

```typescript
// Calculate the expected value of the number of customers in the queue in a single server system with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const result = SSQClientEx(lambda, mu); // 0.083
```

#### Explicación matemática

El valor esperado del número de clientes en la cola, denotado como `Lq`, representa el número promedio de clientes esperando en la cola.

Lq se calcula utilizando la fórmula `(rho^2) / (1 - rho)`. `rho` es el factor de utilización del sistema, que se calcula como la relación de la tasa de llegada de clientes `lambda` con el producto de la tasa de servicio `mu` y el número de servidores `serverSize` que, para esta función, siempre será 1.

La siguiente es la fórmula matemática para calcular el valor esperado del número de clientes en la cola:

```matlab
Lq = (rho^2) / (1 - rho)
```

donde:

- `Lq`: El valor esperado del número de clientes en la cola.
- `rho`: El factor de utilización del sistema.

La función `SSQClientEx` utiliza esta fórmula para calcular el valor esperado del número de clientes en la cola. El resultado se redondea al número especificado de decimales.

### SSSTimeEx

La función `SSSTimeEx` calcula el tiempo medio de espera en el sistema.

#### Parámetros

La función `SSSTimeEx` tiene los siguientes parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSSTimeEx` devuelve el tiempo medio de espera en el sistema como un número.

#### Errores

La función `SSSTimeEx` puede arrojar los siguientes errores:

- `Error`: Si el parámetro `mu` es igual a 0.

#### Ejemplo de uso

El siguiente código calcula el tiempo medio de espera en el sistema en un sistema de un solo servidor con los siguientes parámetros:

```typescript
// Calculate the average waiting time in the system in a single server system with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const result = SSSTimeEx(lambda, mu); // 0.666
```

#### Explicación matemática

El tiempo medio de espera en el sistema, denotado como `Ws`, representa el tiempo promedio que un cliente pasa en el sistema, incluyendo tanto el tiempo de espera en la cola como el tiempo de servicio.

`Ws` se calcula utilizando la fórmula `1 / (mu - lambda)`. `lambda` es la tasa de llegada de clientes, y `mu` es la tasa de servicio. Ambas tasas se expresan en unidades de clientes por unidad de tiempo.

La siguiente es la fórmula matemática para calcular el tiempo medio de espera en el sistema:

```matlab
Ws = 1 / (mu - lambda)
```

donde:

- `Ws`: El tiempo medio de espera en el sistema.
- `lambda`: La tasa de llegada de clientes.
- `mu`: La tasa de servicio.

La función `SSSTimeEx` utiliza esta fórmula para calcular el tiempo medio de espera en el sistema. El resultado se redondea al número especificado de decimales.

### SSQTimeEx

La función `SSQTimeEx` calcula el tiempo medio de espera en la cola.

#### Parámetros

La función `SSQTimeEx` tiene los siguientes parámetros:

- `lambda`: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- `mu`: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- `decimals`: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función `SSQTimeEx` devuelve el tiempo medio de espera en la cola como un número.

#### Errores

La función `SSQTimeEx` puede arrojar los siguientes errores:

- `Error`: Si el parámetro `mu` es igual a 0.

#### Ejemplo de uso

El siguiente código calcula el tiempo medio de espera en la cola en un sistema de un solo servidor con los siguientes parámetros:

```typescript
// Calculate the average waiting time in the queue in a single server system with the following parameters:
const lambda = 0.5; // customer arrival rate per unit time
const mu = 2; // service rate per unit time
const result = SSQTimeEx(lambda, mu); // 0.166
```

#### Explicación matemática

El tiempo medio de espera en la cola, denotado como `Wq`, representa el tiempo promedio que un cliente pasa esperando en la cola antes de ser atendido.

`Wq` se calcula utilizando la fórmula `rho / (mu * (1 - rho))`, donde `rho` es el factor de utilización del sistema o intensidad de tráfico. `lambda` es la tasa de llegada de clientes, y `mu` es la tasa de servicio. Ambas tasas se expresan en unidades de clientes por unidad de tiempo.

La siguiente es la fórmula matemática para calcular el tiempo medio de espera en la cola:

```matlab
Wq = rho / (mu * (1 - rho))
```

donde:

- `Wq`: El tiempo medio de espera en la cola.
- `lambda`: La tasa de llegada de clientes.
- `mu`: La tasa de servicio.
- `rho`: El factor de utilización del sistema.

La función `SSQTimeEx` utiliza esta fórmula para calcular el tiempo medio de espera en la cola. El resultado se redondea al número especificado de decimales.

## M/M/1/k

Este modelo de colas es una extensión del modelo M/M/1 que se utiliza para modelar sistemas de colas con un servidor y k canales de servicio. El modelo M/M/1/k se puede utilizar para calcular la longitud media de la cola, el tiempo medio de espera en la cola y el tiempo medio de servicio, así como el número medio de clientes en cada canal de servicio.

## M/G/1

Este modelo de colas es un modelo general que se utiliza para modelar sistemas de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio distribuidos de acuerdo con una distribución general.

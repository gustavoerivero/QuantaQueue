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

| **_Índice_**  | **Definición**                                                        |
|---------------|-----------------------------------------------------------------------|
| _[M/M/1](#mm1)_    | Modelo de colas  con un servidor, tiempos de llegada y servicio exponenciales.                     |
| _[M/M/1/k](#mm1k)_ | Modelo de colas con un servidor y "k" canales de servicio, tiempos de llegada y servicio exponenciales. |
| _[M/G/1](#mg1)_    | Modelo de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio distribuidos de acuerdo con una distribución general.                     |

## M/M/1

Este modelo de colas es un modelo simple que se utiliza para modelar sistemas de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio exponenciales. El modelo M/M/1 se puede utilizar para calcular la longitud media de la cola, el tiempo medio de espera en la cola y el tiempo medio de servicio.

### SSInitialProbability

La función ```SSInitialProbability``` calcula la probabilidad inicial en un modelo de servidor único.

#### Parámetros

La función ```SSInitialProbability``` tiene tres parámetros:

- ```lambda```: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- ```mu```: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función ```SSInitialProbability``` devuelve la probabilidad inicial del modelo de servidor único como un número.

#### Errores

La función ```SSInitialProbability``` puede arrojar el siguiente error:

- ```Error```: Si el parámetro ```mu``` es igual a 0.

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

- ```p```: La probabilidad inicial.
- ```rho```: El factor de utilización del sistema.

La función ```SSInitialProbability``` utiliza esta fórmula para calcular la probabilidad inicial del modelo de servidor único. El resultado se redondea al número especificado de decimales.

### SSNProbability

La función ```SSNProbability``` calcula la probabilidad de tener ```n``` clientes en un modelo de servidor único.

#### Parámetros

La función ```SSNProbability``` tiene los siguientes parámetros:

- ```lambda```: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- ```mu```: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- ```iteration```: El número de clientes ```n``` para los que se calcula la probabilidad. El valor predeterminado es 1.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

#### Retorno

La función ```SSNProbability``` devuelve la probabilidad de tener n clientes en el modelo de servidor único como un número.

#### Errores

La función ```SSNInitialProbability``` puede arrojar los siguientes errores:

- ```Error```: Si el parámetro ```mu``` es igual a 0.
- ```Error```: Si el parámetro ```iteration``` es menor que 1.

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

La probabilidad ```P(n)``` representa la probabilidad de tener ```n``` clientes en el sistema en un modelo de servidor único. Se calcula utilizando el factor de utilización del sistema ```rho``` y la probabilidad inicial ```P(0)```.

El factor de utilización del sistema ```rho``` se calcula como la relación de la tasa de llegada de clientes con el producto de la tasa de servicio y el número de servidores en el sistema. La probabilidad inicial ```P(0)``` representa la probabilidad que el sistema esté inicialmente vacío.

La siguiente es la fórmula matemática para calcular la probabilidad de tener ```n``` clientes en un modelo de servidor único:

```matlab
P(n) = (rho)^n * P(0)
```

donde:

- ```P(n)```: La probabilidad de tener ```n``` clientes.
- ```rho```: El factor de utilización del sistema.
- ```P(0)```: La probabilidad inicial.

La función ```SSNProbability``` utiliza esta fórmula para calcular la probabilidad de tener ```n``` clientes en el modelo de servidor único. El resultado se redondea al número especificado de decimales.

### SSSClientEx

#### Parámetros

#### Retorno

#### Errores

#### Ejemplo de uso

#### Explicación matemática

### SSQClientEx

#### Parámetros

#### Retorno

#### Errores

#### Ejemplo de uso

#### Explicación matemática

### SSSTimeEx

#### Parámetros

#### Retorno

#### Errores

#### Ejemplo de uso

#### Explicación matemática

## M/M/1/k

Este modelo de colas es una extensión del modelo M/M/1 que se utiliza para modelar sistemas de colas con un servidor y k canales de servicio. El modelo M/M/1/k se puede utilizar para calcular la longitud media de la cola, el tiempo medio de espera en la cola y el tiempo medio de servicio, así como el número medio de clientes en cada canal de servicio.

## M/G/1

Este modelo de colas es un modelo general que se utiliza para modelar sistemas de colas con un servidor, tiempos de llegada exponenciales y tiempos de servicio distribuidos de acuerdo con una distribución general.

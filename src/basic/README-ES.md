# Fórmulas básicas

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> Inglés </a></td>
          <td><a href="./README-ES.md"> Español </a></td>
      </tr>
  </table>
</div>

Las fórmulas básicas se centran en funciones que se implementan en el resto de funciones dedicadas a cada uno de los modelos de teoría de colas.
Entre estas fórmulas se encuentran:

| **_Índice_**  | **Definición**                                                            |
|---------------|---------------------------------------------------------------------------|
| _[Inverso](#inverso)_     | Calcula el inverso de un número dado.                                     |
| _[Porcentaje](#porcentaje)_  | Calcula el porcentaje de un número.                                       |
| _[Convertidor](#convertidor)_ | Transforma una unidad de tiempo dada en otra.                             |
| _[Sumatoria](#sumatoria)_   | Calcula la sumatoria de una expresión.                                    |
| _[Rho](#rho)_         | Calcula el factor de utilización del sistema o la intensidad del tráfico. |

## Inverso

La función ```Inverse``` calcula la inversa de un número. La inversa de un número es otro número que, cuando se multiplica por el primer número, da como resultado 1. Por ejemplo, la inversa de 2 es 0.5, porque 2 * 0.5 = 1.

### Parámetros

La función Inverse tiene dos parámetros:

- ```val```: El valor del que se calculará la inversa. El valor predeterminado es 1.
- ```decimals```: El número de decimales a los que se redondeará el resultado. El valor predeterminado es 4.

### Retorno

La función ```Inverse``` devuelve la inversa del valor especificado como número.

### Errores

La función Inverse puede arrojar los siguientes errores:

- ```Error```: Si el parámetro ```val``` es igual a 0.
- ```Error```: Si el parámetro ```val``` no es válido.
- ```Error```: Si el parámetro ```decimals``` no es válido.

### Ejemplo de uso

El siguiente código calcula la inversa de 2 y redondea el resultado a 4 decimales:

```typescript
const val = 2;
const decimals = 4;
const result = Inverse(val, decimals);
console.log(result); // 0.5000
```

### Explicación matemática

La función ```Inverse``` calcula la inversa de un número dividiendo 1 por el valor especificado. Matemáticamente, esto se puede expresar como:

```Matlab
Inverse(val) = 1 / val
```

## Porcentaje

La función ```Percent``` convierte un número a un formato de porcentaje. El porcentaje es una forma de expresar una cantidad como una parte de un todo. Por ejemplo, 25% significa 25 de cada 100, o 0.25 de 1.

Se recomienda que, cuando el 100% sea igual a 1 y el valor que se desea calcular el porcentaje sea menor a este 1, utilizar la forma estándar del método (Solo pasando el parámetro ```value```).

El método en su forma estándar representa una multiplicación del parámetro ```value``` por 100%, mientras que el método en su variante divisoria, tiene la forma de la división entre el parámetro ```value``` con el parámetro ```total``` y luego multiplicado por 100%.

### Parámetros

La función ```Percent``` tiene cuatro parámetros:

- ```value```: El valor que se va a convertir a un porcentaje. El valor predeterminado es 0.
- ```total```: El total que se va a utilizar para la conversión. El valor predeterminado es 100.
- ```type```: El tipo de conversión. Puede ser ```true``` (multiplicación), ```false``` (división), ```"MULTIPLY"``` o ```"DIVISION"```. El valor predeterminado es ```true```.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

### Retorno

La función ```Percent``` devuelve el valor convertido a un porcentaje como una cadena de texto.

### Errores

La función ```Percent``` puede arrojar los siguientes errores:

- ```Error```: Si el parámetro ```val``` no es válido.
- ```Error```: Si el parámetro ```total``` no es válido.
- ```Error```: Si el parámetro ```total``` es igual a 0.
- ```Error```: Si el parámetro ```type``` no es válido.
- ```Error```: Si el parámetro ```decimals``` no es válido.

### Ejemplo de uso

El siguiente código convierte 0.25 a un porcentaje usando multiplicación:

```typescript
const value = 0.25;
const result = Percent(value); // "25%"
```

El siguiente código convierte 50 a un porcentaje usando división:

```typescript
const value = 50;
const total = 200;
const result = Percent(value, total, false); // "25%"
```

### Explicación matemática

La función ```Percent``` convierte un número a un porcentaje formateándolo como:

```matlab
Percent(num, total, true) = num * total%
```

o

```matlab
Percent(num, total, false) = num / total * 100%
```

Dependiendo del valor del parámetro ```type```.

## Convertidor

La función ```Convert``` convierte un valor de tiempo de una unidad a otra.

*Nota:* Se recomienda usar la variable [```time```](https://github.com/gustavoerivero/QuantaQueue/blob/main/src/time/README-ES.md) que proporciona la librería.

### Parámetros

La función ```Convert``` tiene cuatro parámetros:

- ```sourceValue```: El valor del tiempo a convertir.
- ```sourceUnit```: La unidad de tiempo de origen.
- ```targetUnit```: La unidad de tiempo destino.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

### Retorno

La función ```Convert``` devuelve el valor convertido a la unidad de tiempo especificada como un número.

### Errores

La función ```Convert``` puede arrojar los siguientes errores:

- ```Error```: Si la variable ```sourceUnit``` no tiene un valor numérico.
- ```Error```: Si la variable ```sourceValue``` no tiene un valor numérico.
- ```Error```: Si la variable ```targetUnit``` no tiene un valor numérico.
- ```Error```: Si la variable ```sourceValue``` es igual a cero.
- ```Error```: Si la variable ```sourceUnit``` es igual a cero.

### Ejemplo de uso

El siguiente código convierte 30 minutos a horas:

```typescript
import { time, Convert } from "quantaqueue"

const minutes = 30;
const sourceUnit = time.find(unit => unit.text === 'Minute')!.value; // 60 (segundos)
const targetUnit = time.find(unit => unit.text === 'Hour')!.value; // 3600 (segundos)
const convertedValue = Convert(minutes, sourceUnit, targetUnit); // 0.5
```

### Explicación matemática

La función ```Convert``` convierte un valor de tiempo de una unidad a otra utilizando la siguiente fórmula:

```matlab
convertedValue = (1 / (sourceValue * sourceUnit)) * targetUnit
```

donde:

- ```sourceValue```: El valor del tiempo a convertir.
- ```sourceUnit```: La unidad de tiempo de origen.
- ```targetValue```: La unidad de tiempo destino.

Por ejemplo, para convertir 30 minutos a horas, se utilizaría la siguiente fórmula:

```matlab
convertedValue = (1 / (30 * 60)) * 3600
```

Esto daría como resultado un valor convertido de ```0,5```, que es equivalente a 30 minutos en horas.

Ahora bien, la primera parte de la fórmula, ```1 / (sourceValue * sourceUnit)```, representa el número de veces que la unidad de tiempo de origen está contenida en la unidad de tiempo de destino. Por ejemplo, 60 minutos están contenidos en 1 hora un total de 60 veces.

La segunda parte de la fórmula, ```* targetUnit```, representa el valor de la unidad de tiempo de destino. Por ejemplo, el valor de 1 hora es 3600 segundos.

El producto de estas dos partes de la fórmula es el valor convertido, que es el número de unidades de tiempo de destino que equivalen al valor de tiempo de origen.

## Sumatoria

La función ```Summation``` calcula la suma de una expresión sobre un rango de valores.

### Parámetros

La función ```Summation``` tiene cuatro parámetros:

- ```lowerLimit```: El límite inferior del rango de suma. El valor predeterminado es 0.
- ```upperLimit```: El límite superior del rango de suma. El valor predeterminado es 0.
- ```expression```: La expresión a evaluar en cada iteración de la suma. El valor predeterminado es ```"n"```.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

### Retorno

La función ```Summation``` devuelve la suma de la expresión sobre el rango de valores como un número.

### Errores

La función ```Summation``` puede arrojar los siguientes errores:

- ```Error```: Si la variable ```lowerLimit``` no tiene un valor numérico.
- ```Error```: Si la variable ```upperLimit``` no tiene un valor numérico.
- ```Error```: Si la variable ```expression``` no tiene un valor de cadena.
- ```Error```: Si la variable ```decimals``` no tiene un valor numérico.

La función ```Summation``` puede ser lenta para grandes rangos de valores.

### Ejemplo de uso

El siguiente código calcula la suma de ```(n+1)/2``` desde 1 hasta 5:

```typescript
// Calcula la suma de (n+1)/2 desde 1 hasta 5:
const lowerLimit = 1;
const upperLimit = 5;
const expression: "(n+1)/2"

const result = Summation(lowerLimit, upperLimit, expression); // 10
```

### Explicación matemática 

La función ```Summation``` calcula la suma de una expresión sobre un rango de valores, utilizando el límite inferior especificado, el límite superior y la expresión. La expresión puede contener la variable ```n``` que representa el valor actual en cada iteración. El resultado se redondea al número especificado de decimales.

La función ```Summation``` funciona de la siguiente manera:

1. Inicializa la variable ```sum``` a 0.
2. Inicializa la variable ```n``` al límite inferior.
3. Itera sobre el rango de valores, desde el límite inferior hasta el límite superior.
4. En cada iteración, evalúa la expresión y agrega el resultado a la variable ```sum```.
5. Al final de la iteración, la variable ```sum``` contiene la suma de la expresión sobre el rango de valores.
6. La función ```Summation``` devuelve la variable ```sum```.

En otras palabras, la función ```Summation``` utiliza la siguiente fórmula para calcular la suma de una expresión sobre un rango de valores:

```typescript
sum = (n_1 + n_2 + ... + n_k)
```

donde:

- ```n_1, n_2, ..., n_k``` son los valores en el rango.

La función ```Summation``` calcula la suma de los valores en el rango sumando los valores uno por uno.

## Rho

La función ```Rho``` calcula el factor de utilización del sistema o intensidad de tráfico. Este factor indica la proporción de tiempo en el que él sistema de colas está ocupado.

### Parámetros

La función ```Rho``` tiene cuatro parámetros:

- ```lambda```: La tasa de llegada de clientes al sistema. El valor predeterminado es 0.
- ```mu```: La tasa de clientes servidos en el sistema. El valor predeterminado es 1.
- ```serverSize```: El número de servidores en el sistema. El valor predeterminado es 1.
- ```decimals```: El número de decimales a los que se va a redondear el resultado. El valor predeterminado es 4.

### Retorno

La función ```Rho``` devuelve el factor de utilización del sistema o intensidad de tráfico como un número.

### Errores

La función ```Rho``` puede arrojar los siguientes errores:

- ```Error```: Si la variable ```lambda``` no tiene un valor numérico.
- ```Error```: Si la variable ```mu``` no tiene un valor numérico.
- ```Error```: Si la variable ```serverSize``` no tiene un valor numérico.
- ```Error```: Si la variable ```decimals``` no tiene un valor numérico.
- ```Error```: Si la variable ```mu``` es igual a 0.
- ```Error```: Si la variable ```serverSize``` es igual a 0.

### Ejemplo de uso

El siguiente código calcula el factor de utilización del sistema para un sistema con los siguientes parámetros:

```typescript
const lambda = 10;
const mu = 5;
const serverSize = 3;

const result = Rho(lambda, mu, serverSize); // 0.6667
```

### Explicación matemática

El factor de utilización del sistema, también conocido como intensidad de tráfico, representa la fracción promedio de tiempo que los servidores del sistema están ocupados atendiendo clientes. Se calcula como la relación entre la tasa de llegada de clientes y el producto de la tasa de servicio y el número de servidores en el sistema.

El factor de utilización del sistema indica el nivel de congestión o actividad del sistema. Un valor menor que 1 indica que el sistema es estable y el número de clientes en el sistema no crecerá indefinidamente. Sin embargo, un valor mayor que 1 sugiere que el sistema está sobrecargado y el número de clientes aumentará sin límite.

Generalmente se requiere que el factor de utilización sea menor a uno. Su fórmula está dada por:

```matlab
Rho = lambda / (serverSize * mu)
```

Donde:

- ```lambda```: Tasa media de llegadas de clientes al sistema.
- ```mu```: Tasa media de clientes servidos en el sistema.
- ```serverSize```: Cantidad de servidores en el sistema.

Por lo tanto:

- Sí ```Rho > 1```: El sistema está sobre copado la mayor parte del tiempo, es decir, la cola está creciendo permanentemente.
- Sí ```Rho < 1```: El sistema es estable.
- Sí ```Rho = 1```: El sistema se encuentra atendiendo sin descanso pero sin dejar que la cola crezca.

Por ejemplo, si ```Rho = 0.9```, indica que el 90% del tiempo el sistema de colas está ocupado y que, el 10% del tiempo no lo está.

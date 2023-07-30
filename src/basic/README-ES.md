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
| _Convertidor_ | Transforma una unidad de tiempo dada en otra.                             |
| _Sumatoria_   | Calcula la sumatoria de una expresión.                                    |
| _Rho_         | Calcula el factor de utilización del sistema o la intensidad del tráfico. |

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

El método en su forma estándar representa una multiplicación del parámetro ```value``` por 100%, mientras que el método en su variante divisoria, tiene la forma de la división entre el parámetro ```value``` con el parámetro ````total``` y luego multiplicado por 100%.

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
num * total * 100%
```

o

```matlab
num / total * 100%
```

Dependiendo del valor del parámetro ```type```.

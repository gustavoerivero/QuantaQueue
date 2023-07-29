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
| _Porcentaje_  | Calcula el porcentaje de un número.                                       |
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

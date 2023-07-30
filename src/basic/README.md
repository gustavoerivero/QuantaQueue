# Basic formulas

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> English </a></td>
          <td><a href="./README-ES.md"> Spanish </a></td>
      </tr>
  </table>
</div>

The basic formulas focus on functions that are implemented in the rest of the functions dedicated to each of the queuing theory models.
Among these formulas are:

| **_Index_**  | **Definition**                                                            |
|---------------|---------------------------------------------------------------------------|
| _[Inverse](#inverse)_     | Calculates the inverse of a given number.                                     |
| _[Percent](#percent)_  | Calculates the percentage of a number.                                       |
| _Convert_ | Transforms a given unit of time into another.                             |
| _Summation_   | Calculates the sum of an expression.                                    |
| _Rho_         | Calculates the system utilization factor or traffic intensity. |

## Inverse

The ```Inverse``` function calculates the inverse of a number. The inverse of a number is another number that, when multiplied by the first number, gives 1. For example, the inverse of 2 is 0.5, because 2 * 0.5 = 1.

### Parameters

The ```Inverse``` function has two parameters:

- ```val```: The value of which the inverse is to be calculated. The default value is 1.
- ```decimals```: The number of decimal places to round the result. The default value is 4.

### Return

The ```Inverse``` function returns the inverse of the specified value as a number.

### Errors

The ```Inverse``` function can throw the following errors:

- ```Error```: If the ```val``` parameter is equal to 0.
- ```Error```: If the ```val``` parameter is not valid.
- ```Error```: If the ```decimals`` parameter is not valid.

### Example

The following code calculates the inverse of 2 and rounds the result to 4 decimal places:

```typescript
const val = 2;
const decimals = 4;
const result = Inverse(val, decimals);
console.log(result); // 0.5000
```

### Mathematical explanation

The ```Inverse``` function calculates the inverse of a number by dividing 1 by the specified value. Mathematically, this can be expressed as:

```Matlab
Inverse(val) = 1 / val
```

## Percent

La función ```Percent``` convierte un número a un formato de porcentaje. El porcentaje es una forma de expresar una cantidad como una parte de un todo. Por ejemplo, 25% significa 25 de cada 100, o 0.25 de 1.

It is recommended that, when 100% is equal to 1 and the value you want to calculate the percentage is less than this 1, use the standard form of the method (Only passing the ```value``` parameter).

The method in its standard form represents a multiplication of the parameter ```value``` by 100%, while the method in its divisional variant, has the form of the division between the parameter ```value``` with the parameter ```total``` and then multiplied by 100%.

### Parameters

The ```Percent``` function has four parameters:

- ```value```: The value to be converted to a percentage. The default value is 0.
- ```total```: The total used for conversion. The default value is 100.
- ```type```: The conversion type. Can be ```true``` (multiplication), ```false``` (division), ```"MULTIPLY"```, or ```"DIVISION"```. The default value is ```true```.
- ```decimals```: The number of decimal places to round the result. The default value is 4.

### Return

The ```Percent``` function returns the value converted to a percentage as a string..

### Errors

The ```Percent``` function can throw the following errors:

- ```Error```: If the ```val``` parameter is invalid.
- ```Error```: If parameter ```total``` is invalid.
- ```Error```: If parameter ```total``` is equal to 0.
- ```Error```: If the ```type``` parameter is invalid.
- ```Error```: If parameter ```decimals``` is invalid.

### Example

The following code converts 0.25 to a percentage using multiplication:

```typescript
const value = 0.25;
const result = Percent(value); // "25%"
```

The following code converts 50 to a percentage using division:

```typescript
const value = 50;
const total = 200;
const result = Percent(value, total, false); // "25%"
```

### Mathematical explanation

The ```Percent``` function converts a number to a percentage by formatting it as:

```matlab
num * total * 100%
```

or

```matlab
num / total * 100%
```

Depending on the value of the ```type``` parameter.

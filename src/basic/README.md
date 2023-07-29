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
| _Percent_  | Calculates the percentage of a number.                                       |
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

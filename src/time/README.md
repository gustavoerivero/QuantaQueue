# Time units

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> English </a></td>
          <td><a href="./README-ES.md"> Spanish </a></td>
      </tr>
  </table>
</div>

Here is an explanation of the ```time``` array and how it can be used:

## Time

The ```time``` array is an array of objects representing time units and their values in seconds. The array contains a total of 16 time units, from ```nanosecond``` (id 1) to ```millennium``` (id 16).

Each time unit object in the array has the following properties:

- ```id```: The unique identifier of the time unit.
- ```text```: The name of the time unit.
- ```value```: The value of the time unit in seconds.

The array is ordered from smallest to largest, according to the value of the time unit in seconds.

### Example

The following code shows how to get the value of the time unit ```Minute```:

```typescript
const minute = time[6].value; // 60 seconds
```

Also, being an array you can iterate over all time units:

```typescript
time.forEach((unit) => {
  console.log(unit.text, unit.value)
})
```

### Errors

It is possible to get errors when trying to access values or time units that the array does not have. For example, the following code will produce an error:

```typescript
const minute = time[17].value; // Error: id 17 does not exist in the array
```

### Obtaining specific values

You can get a specific value of the time unit in two ways:

- By the ```id```: You can use the ```id``` of the time unit to get its value. For example, the following code gets the value of the ```Minute``` time unit:

```typescript
const minute = time[6].value; // 60 seconds
```

- By the ```text```: You can use the ```text``` of the time unit to get its value. For example, the following code gets the value of the ```Minute``` time unit.

```typescript
const minute = time.find((unit) => unit.text === "Minute").value; // 60 seconds
```

### Units supported

A table with the exact values contained in the array is shown below:

| **_id_** | **text**     | **value**   |
|----------|--------------|-------------|
| _1_      | Nanosecond   | 0.000000001 |
| _2_      | Microsecond  | 0.000001    |
| _3_      | Milisecond   | 0.001       |
| _4_      | Centisecond  | 0.01        |
| _5_      | Decitosecond | 0.1         |
| _6_      | Second       | 1           |
| _7_      | Minute       | 60          |
| _8_      | Hour         | 3600        |
| _9_      | Day          | 86400       |
| _10_     | Week         | 604800      |
| _11_     | Month        | 2419200     |
| _12_     | Year         | 29030400    |
| _13_     | Lustrum      | 145152000   |
| _14_     | Decade       | 725760000   |
| _15_     | Century      | 7257600000  |
| _16_     | Millennium   | 72576000000 |

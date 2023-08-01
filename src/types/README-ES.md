# Tipos de datos

<div align="center">
  <table>
      <tr>
          <!-- Do not translate this table -->
          <td><a href="./README.md"> Inglés </a></td>
          <td><a href="./README-ES.md"> Español </a></td>
      </tr>
  </table>
</div>

A continuación, se definen los tipos de datos que contiene la librería:

| **_Índice_**  | **Definición**                                                        |
|---------------|-----------------------------------------------------------------------|
| _[TimeUnit](#timeunit)_    | Tipo de dato que representa una unidad de tiempo.                     |
| _[ModelResult](#modelresult)_ | Tipo de datos que representa la respuesta de las funciones generales. |

## TimeUnit

El tipo ```TimeUnit``` es un tipo que representa una unidad de tiempo. Tiene las siguientes propiedades:

- ```id```: El identificador de la unidad de tiempo.
- ```text```: El nombre de la unidad de tiempo.
- ```value```: El valor de la unidad de tiempo en segundos.

El tipo ```TimeUnit``` se utiliza para representar unidades de tiempo en el código. Se puede utilizar junto al array [```time```](https://github.com/gustavoerivero/QuantaQueue/blob/main/src/time/README-ES.md) para obtener el valor de una unidad de tiempo específica. Por ejemplo, el siguiente código obtiene el valor de la unidad de tiempo "Minuto":

```typescript
let selectedTime: TimeUnit;

selectedTime = time.find((unit) => unit.text === "Minute"); // { id: 7, text: "Minute", value: 60 }

console.log(selectedTime.value); // 60
```

## ModelResult

El tipo ```ModelResult``` es un tipo de dato que representa la respuesta generada por las funciones que contienen a todos los modelos de Teoría de Colas manejados por la librería. Este tipo tiene las siguientes propiedades:

- ```result```: El valor obtenido por el modelo. En el caso de que el modelo no pueda devolver un valor, retorna ```null```.
- ```message```: Texto que indica el resultado de la operación.

Este tipo ```ModelResult``` se utiliza para manejar de forma más precisa los resultados obtenidos de las [funciones generales](https://github.com/gustavoerivero/formulae/blob/main/src/research/General/README-ES.md). Por ejemplo, el siguiente código hace un manejo de este tipo de dato:

```typescript
let result: ModelResult;

result = InitialProbability(3, 2, 3, 1, 10)
console.log(result) // { result: 0.3372, message: "Successful calculation for the M/M/1/k model." }

result = InitialProbability(6, 2, 3) 
console.log(result) // { result: null, message: "Invalid queuing model selected." }
```

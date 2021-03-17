# Ejercicio 3. Javascript.
Este repositorio corresponde al video de prácticas de CSS planteado en: 
- [Teoría de Javascript en tiempo record | Clase 8]( "Youtube")
- [Aplicar Javascript a un formulario | Clase 9]( "Youtube")

## Consigna.
---
Deberás darle funcionalidad al formulario de contacto, a excepción del envío o almacenamiento de los datos, ya que eso se hace con lógica de servidor y aún no llegamos a esa parte.

### Tareas
- Validar datos ingresados
  * Todos los campos deben ser obligatorios, no se permite enviar el formulario si alguno está vacío
  * Cada uno de los campos debe respetar su "tipo" de dato esperado, por ejemplo el email, debe tener formato de correo electrónico y la edad debe permitir sólo números
- Controlar eventos
  * Envío de formulario (obligatorio)
  * Click en botón de enviar (opcional)
  * Carga de la página del formulario (opcional)
- Mostrar mensajes
  * Si hay error debe resaltar el elemento en rojo
  * Si está ok debe ser un alert


## Funciones a utilizar (opcional)
---
Dado que el objetivo de esta clase es dar los primeros pasos en Javascript e incorporar conceptos, te dejo funciones que podés utilizar para validar cada tipo de elemento del formulario en el caso de que lo necesites.

```javascript
/**
 * Valida si el valor enviado no está vacío
 */
function validaTexto(valor){
  return valor != '';
}

/**
 * Valida si el valor enviado es un número
 */
function validaNumero(valor){
  return valor != '' && !isNaN(valor);
}

/**
 * Valida si el valor enviado tiene formato de email
 */
function validaEmail(valor) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(valor).toLowerCase());
}

/**
 * Valida si el elemento enviado (select) tiene una opción seleccionada distinta a la primera
 * Se debe enviar el objeto "select"
 */
function validaPais(elemento){
  return elemento.selectedIndex > 0;
}

/**
 * Valida si algún elemento de los radio / checkbox está seleccionado
 * Se debe enviar el objeto radio / checkbox
 */
function validaOpciones(elementos){
  let some = false;

  for(let i = 0; i < elementos.length; i++){
    if(elementos[i].checked){
      some = true;
    }
  }

  return some;
}
```
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

function validarFormulario(){
  var nombre_completo = document.getElementById('nombre_completo');
  var email = document.getElementById('email');
  var edad = document.getElementById('edad');
  var pais = document.getElementById('pais');
  var intereses = document.querySelectorAll("input[name='intereses']");
  var sexo = document.querySelectorAll("input[name='sexo']");
  var comentarios = document.getElementById('comentarios');
  var boton = document.getElementById('nombre_completo');

  // Resulta más sencillo al principio leer de forma procedural, línea por línea
  // Por ese motivo aparecerán cosas repetidas

  // Antes de validar inicializar variable que indicará si hubo algún error
  var error = false;

  if(!validaTexto(nombre_completo.value)){
    nombre_completo.classList.add('error');

    error = true;
  }else{
    nombre_completo.classList.remove('error');
  }

  if(!validaEmail(email.value)){
    email.classList.add('error');

    error = true;
  }else{
    email.classList.remove('error');
  }

  if(!validaNumero(edad.value)){
    edad.classList.add('error');

    error = true;
  }else{
    edad.classList.remove('error');
  }

  if(!validaPais(pais)){
    pais.classList.add('error');

    error = true;
  }else{
    pais.classList.remove('error');
  }

  if(!validaOpciones(intereses)){
    document.getElementById('intereses').classList.add('error');

    error = true;
  }else{
    document.getElementById('intereses').classList.remove('error');
  }

  if(!validaOpciones(sexo)){
    document.getElementById('sexo').classList.add('error');

    error = true;
  }else{
    document.getElementById('sexo').classList.remove('error');
  }

  if(!validaTexto(comentarios.value)){
    comentarios.classList.add('error');

    error = true;
  }else{
    comentarios.classList.remove('error');
  }

  if(!error){
    alert("Exito! Enviar formulario...");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(e){
    e.preventDefault();

    validarFormulario();
  });
});
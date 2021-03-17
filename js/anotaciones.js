document.addEventListener('DOMContentLoaded', function () {
  console.log("¡Estamos en vivo!");
});

document.querySelectorAll('div');
document.querySelector('#elemento');
document.querySelectorAll('.elemento');
document.querySelectorAll('div#Elemento');

document.getElementById('elemento').className += 'mostrar';
document.getElementById('elemento').classList.remove("mostrar");

elemento.style.display = 'none';
elemento.style.display = 'block';
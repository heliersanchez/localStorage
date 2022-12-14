// Variables
const contenido = document.querySelector('#contenido');
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Listeners
formulario.addEventListener('submit', agregarTweet );

document.addEventListener('DOMContentLoaded', () => {
  tweets = JSON.parse(localStorage.getItem('tweets')) || [];
  console.log(tweets);
  crearHTML();
});

listaTweets.addEventListener('click', borrarTweets);

// Funciones
function agregarTweet(e) {
  e.preventDefault();
  
  const tweet = document.querySelector('#tweet').value; 
  
  if( tweet.trim() === ''){
    mostrarMensaje('No puede agregar mensajes vacios');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  tweets = [...tweets, tweetObj];
  formulario.reset();

  crearHTML();
    
  console.log(tweets);

}

function mostrarMensaje(mensaje) {
  const pErr = document.querySelector('.error');
  if(pErr) return;

  const err = document.createElement('P');
  err.classList.add('error');
  err.textContent = mensaje;
  
  formulario.appendChild(err);

  setTimeout(() => {
    err.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();

  if(tweets.length > 0){
    tweets.forEach(tweet => {
      const btnBorrar = document.createElement('A');
      btnBorrar.textContent = 'X';
      btnBorrar.classList.add('borrar-tweet');

      const tw = document.createElement('li');
      tw.textContent = tweet.tweet;
      tw.dataset.tweetId = tweet.id;
      tw.appendChild(btnBorrar);
      listaTweets.appendChild(tw);
    });

  }
  
  sincronizarStorage();
  
}

function limpiarHTML() {
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweets(e) {
  const id = e.target.parentElement.dataset.tweetId;
  const eliminar = e.target.classList.contains('borrar-tweet');
  
  if(eliminar){
    const respuesta = confirm('Desea eliminar este tweet permanentemente?');

    if(respuesta){
      tweets = tweets.filter( tweet => tweet.id != id);
      crearHTML();
      successMessage();
    }
  }
}

function successMessage(){
  const succesMsj = document.querySelector('.succesMsj');
  if(succesMsj) return; // previene duplicidad de mensajes

  const divMensaje = document.createElement('DIV');
  divMensaje.classList.add('succesMsj');
  divMensaje.textContent = 'Tweet Eliminado Correctamente';

  const parentDiv = document.querySelector('.container');
  const childElement = document.querySelector('.row');
  parentDiv.insertBefore(divMensaje, childElement);

  setTimeout(() => {
    divMensaje.remove();
  }, 3000);

}
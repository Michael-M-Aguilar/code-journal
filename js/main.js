/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
// var $button = document.querySelector('buttoned');

$photoURL.addEventListener('input', function (event) {
  $photoURL.setAttribute('src', event.target.value);
});

// $button.addEventListener('submit' function (event) {

// })

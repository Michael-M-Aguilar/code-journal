/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $preview = document.querySelector('.preview');

$photoURL.addEventListener('input', function (event) {
  document.getElementById('placeholderImg').src = event.target.value;
});

var $form = document.querySelector('#codeForm');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var formData = {};
  formData.title = $title.value;
  formData.photoURL = $photoURL.value;
  formData.notes = $notes.value;
  formData.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formData);
  $form.reset();
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
});

var $tabContainer = document.querySelector('.tab-container');
var $view = document.getElementsByClassName('view');

$tabContainer.addEventListener('click', function (event) {
  var dataView = event.target.getAttribute('data-view');
  for (var j = 0; j < $view.length; j++) {
    if ($view[j].getAttribute('data-view') !== dataView) {
      $view[j].className = 'container view hidden';
    } else {
      $view[j].className = 'container view';
    }
  }
});

// var $newButton = document.querySelector('.newButton');

// $newButton.addEventListener('click', function (event) {
//   console.log(event.target);
//   var dataView =
// });

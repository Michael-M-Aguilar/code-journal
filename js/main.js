/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');

$photoURL.addEventListener('input', function (event) {
  document.getElementById('placeholderImg').src = event.target.value;
});

// var $form = document.querySelector('#codeForm');

// var formTitle = $form.title.value;
// var formURL = $form.photoURL.value;
// var formNotes = $form.notes.value;

// $form.addEventListener('submit' function (event) {
//   event.preventDefault();

//   var formData = {
//     title: formTitle,
//     photoURL: formURL,
//     notes: formNotes
//   }
//   formData.entryId = data.nextEntryId;
//   data.nextEntryId++
// })

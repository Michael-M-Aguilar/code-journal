/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $preview = document.querySelector('.preview');

var $form = document.querySelector('#codeForm');
var $mainPage = document.getElementById('mainPage');
var $secondPage = document.getElementById('secondPage');

var $tabContainer = document.querySelector('.tab-container');
var $view = document.getElementsByClassName('view');
var $newButton = document.querySelector('.newButton');
var queryPosition = document.querySelector('.position');

if (data.view === 'entry-form') {
  $mainPage.className = 'container view';
  $secondPage.className = 'container view hidden';
}
if (data.view === 'entries') {
  $mainPage.className = 'container view hidden';
  $secondPage.className = 'container view';
}
// The preview of the NEW picture when inserted in the form.
$photoURL.addEventListener('input', function (event) {
  document.getElementById('placeholderImg').src = event.target.value;
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var formData = {};
  formData.title = $title.value;
  formData.photoURL = $photoURL.value;
  formData.notes = $notes.value;
  formData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formData);
  // $form.reset();
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
  // localStorage.setItem(data.view, 'entries');
  $mainPage.className = 'container view hidden';
  $secondPage.className = 'container view';
  queryPosition.insertAdjacentElement('afterbegin', renderElements(data.entries[0]));
  data.view = 'entries';
  data.editing = null;
  // location.reload();
});

// The switching of tabs in the header. Will also switch the data-view.
$tabContainer.addEventListener('click', function (event) {
  var dataView = event.target.getAttribute('data-view');
  if (dataView === 'entry-form') {
    data.view = 'entry-form';
  } else {
    data.view = 'entries';
  }
  for (var j = 0; j < $view.length; j++) {
    if ($view[j].getAttribute('data-view') !== dataView) {
      $view[j].className = 'container view hidden';
    } else {
      $view[j].className = 'container view';
    }
  }
});

$newButton.addEventListener('click', function (event) {
  localStorage.setItem(data.view, 'entry-form');
  $mainPage.className = 'container view';
  $secondPage.className = 'container view hidden';
});

// DOM Tree creation under the parent UL.
function renderElements(element) {
  var div = document.createElement('div');
  div.setAttribute('class', 'column-full');

  var divSecond = document.createElement('div');
  divSecond.setAttribute('class', 'column-full row padding');

  var img = document.createElement('img');
  img.setAttribute('class', 'column-half');
  img.setAttribute('src', element.photoURL);

  var divThird = document.createElement('div');
  divThird.setAttribute('class', 'column-half');

  var header = document.createElement('h3');
  header.textContent = element.title;

  var fontAwesome = document.createElement('i');
  fontAwesome.setAttribute('class', 'fas fa-edit fa-lg');
  fontAwesome.setAttribute('data-entry-id', element.entryId);

  var para = document.createElement('p');
  para.textContent = element.notes;

  div.appendChild(divSecond);
  divSecond.appendChild(img);
  divSecond.appendChild(divThird);
  divThird.appendChild(header);
  divThird.appendChild(fontAwesome);
  divThird.appendChild(para);
  return div;
}
// Assist in updating the window with the data.entries made.
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var example = renderElements(data.entries[i]);
    queryPosition.append(example);
  }
});

// Associated with the editing function
queryPosition.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-edit fa-lg') {
    $mainPage.className = 'container view';
    $secondPage.className = 'container view hidden';
    // console.log(event.target.getAttribute('data-entry-id'));
    var length = data.entries.length;
    var $entryId = event.target.getAttribute('data-entry-id');
    var toSubtract = length - $entryId;
    data.editing = data.entries[toSubtract];
    // preview of the form if previous image
    document.getElementById('placeholderImg').src = data.entries[toSubtract].photoURL;
    // how to fill in my form if editing
    $title.value = data.entries[toSubtract].title;
    $photoURL.value = data.entries[toSubtract].photoURL;
    $notes.value = data.entries[toSubtract].notes;
    // location.reload();
  }
});
//

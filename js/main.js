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
  $form.reset();
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
  // localStorage.setItem(data.view, 'entries');
  $mainPage.className = 'container view hidden';
  $secondPage.className = 'container view';
  queryPosition.insertAdjacentElement('afterbegin', renderElements(data.entries[0]));
});

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

  var para = document.createElement('p');
  para.textContent = element.notes;

  div.appendChild(divSecond);
  divSecond.appendChild(img);
  divSecond.appendChild(divThird);
  divThird.appendChild(header);
  divThird.appendChild(para);
  return div;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var example = renderElements(data.entries[i]);
    queryPosition.append(example);
  }
});

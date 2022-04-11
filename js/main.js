/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photolink');
var $photo = document.querySelector('#photo');

$photoUrl.addEventListener('input', handleInput);

function handleInput() {
  $photo.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $photoUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

var $form = document.querySelector('#code-form');
$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  var newObj = {};
  newObj.entryID = data.nextEntryId;
  newObj.title = $form.title.value;
  newObj.photourl = $form.photo.value;
  newObj.notes = $form.notes.value;
  data.nextEntryId++;
  data.entries.push(newObj);
  document.querySelector('#photo').setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

var $newEntry = document.querySelector('#form-entry');
var $list = document.querySelector('#list');
var $switchView = document.querySelector('.switch-view');
var $switchBack = document.querySelector('.switch-back');

$switchView.addEventListener('click', clicked);
$switchBack.addEventListener('click', click);

function clicked(event) {
  if (event.target.matches('.switch-view')) {
    $list.classList.remove('hidden');
  } if (event.target.matches('.switch-view')) {
    $newEntry.classList.add('hidden');
  }
}

function click(event) {
  if (event.target.matches('.switch-back')) {
    $newEntry.classList.remove('hidden');
  } if (event.target.matches('.switch-back')) {
    $list.classList.add('hidden');
  }
}

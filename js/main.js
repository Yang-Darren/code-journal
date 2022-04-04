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
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-data', dataJSON);
}

$form.addEventListener('submit', submitForm);

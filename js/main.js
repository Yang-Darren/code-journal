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
  var newObj = {};
  newObj.entryID = data.nextEntryId;
  newObj.title = $form.title.value;
  newObj.photourl = $form.photo.value;
  newObj.notes = $form.notes.values;
  data.nextEntryId++;
  data.entries.prepend(newObj);
}

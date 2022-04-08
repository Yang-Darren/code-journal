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
  var newEntry = submittedEntries(newObj);
  $allEntries.prepend(newEntry);
}

$form.addEventListener('submit', submitForm);

var $allEntries = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var entryCount = 0;

function submittedEntries(entry) {
  if (data.entries.length === 0) {
    $noEntries.className = 'no-entries';
    return;
  } else {
    $noEntries.className = 'no-entry hidden';
  }

  while (entryCount < (data.nextEntryId - 1)) {
    var $entry = document.createElement('li');
    $entry.className = 'submission';
    $allEntries.appendChild($entry);

    var $row = document.createElement('div');
    $row.className = 'row';
    $entry.appendChild($row);

    var $column1 = document.createElement('div');
    $column1.className = 'column-half';
    $row.appendChild($column1);

    var $image = document.createElement('img');
    $image.setAttribute('src', data.entries[entryCount].photourl);
    $column1.appendChild($image);

    var $column2 = document.createElement('div');
    $column2.className = 'column-half';
    $row.appendChild($column2);

    var $title = document.createElement('h3');
    $title.textContent = entry.title;
    $column2.appendChild($title);

    var $notes = document.createElement('p');
    $notes.textContent = entry.notes;
    $column2.appendChild($notes);
    entryCount++;

  }
}

function handleDomContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = submittedEntries(data.entries[i]);
    $allEntries.append(newEntry);
  }
}
window.addEventListener('DOMContentLoaded', handleDomContent);

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

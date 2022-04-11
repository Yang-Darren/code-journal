/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photolink');
var $photo = document.querySelector('#photo');
var entryCount = 0;
var $allEntries = document.querySelector('ul');
var $newEntry = document.querySelector('#form-entry');
var $list = document.querySelector('#list');
var $switchView = document.querySelector('.switch-view');
var $switchBack = document.querySelector('.switch-back');
var $form = document.querySelector('#code-form');
var $saveButton = document.querySelector('.save-button');
var $hideNoEntries = document.querySelector('.no-entries');

function handleInput() {
  $photo.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $photoUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

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
  var newEntry = renderEntries(newObj);
  $allEntries.prepend(newEntry);
}

function renderEntries(entry) {
  var $entry = document.createElement('li');
  $entry.className = 'submission';

  var $row = document.createElement('div');
  $row.className = 'row saved';
  $entry.appendChild($row);

  var $imageColumn = document.createElement('div');
  $imageColumn.className = 'column-half';
  $row.appendChild($imageColumn);

  var $imageUrl = document.createElement('img');
  $imageUrl.setAttribute('src', data.entries[entryCount].photourl);

  $imageColumn.appendChild($imageUrl);

  var $input = document.createElement('div');
  $row.appendChild($input);
  $input.className = 'column-half';
  var $h3 = document.createElement('h3');
  $h3.textContent = data.entries[entryCount].title;
  var $p = document.createElement('p');
  $p.textContent = data.entries[entryCount].notes;
  $input.appendChild($h3);
  $input.appendChild($p);
  entryCount++;
  return $entry;
}

function handleDomContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntries(data.entries[i]);
    $allEntries.append(newEntry);
  }
}

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

function hideNoEntries(event) {
  if (event.target.matches('.save-button')) {
    $hideNoEntries.className = 'no-entries hidden';
  } if (event.target.matches('.save-button')) {
    $newEntry.classList.add('hidden');
  } if (event.target.matches('.save-button')) {
    $list.classList.remove('hidden');
  }
}

$form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', handleDomContent);
$switchView.addEventListener('click', clicked);
$switchBack.addEventListener('click', click);
$photoUrl.addEventListener('input', handleInput);
$saveButton.addEventListener('click', hideNoEntries);

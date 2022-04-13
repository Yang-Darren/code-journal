/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photolink');
var $photo = document.querySelector('#photo');
var $allEntries = document.querySelector('ul');
var $newEntry = document.querySelector('#form-entry');
var $list = document.querySelector('#list');
var $switchView = document.querySelector('.switch-view');
var $switchBack = document.querySelector('.switch-back');
var $form = document.querySelector('#code-form');
var $hideNoEntries = document.querySelector('.no-entries');
var $saveButton = document.querySelector('.save-button');

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
  $form.reset();
  data.entries.unshift(newObj);
  document.querySelector('#photo').setAttribute('src', 'images/placeholder-image-square.jpg');
  var newEntry = renderEntries(newObj);
  $allEntries.prepend(newEntry);
  $newEntry.className = 'form hidden';
  $list.className = '';
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
  $imageUrl.setAttribute('src', entry.photourl);

  $imageColumn.appendChild($imageUrl);

  var $input = document.createElement('div');
  $row.appendChild($input);
  $input.className = 'column-half';
  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $input.appendChild($h3);
  $input.appendChild($p);
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
    $hideNoEntries.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', handleDomContent);
$form.addEventListener('submit', submitForm);
$switchView.addEventListener('click', clicked);
$switchBack.addEventListener('click', click);
$photoUrl.addEventListener('input', handleInput);
$saveButton.addEventListener('click', hideNoEntries);

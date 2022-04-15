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
var $buttons = document.querySelectorAll('[data-link]');
var $tabView = document.querySelectorAll('[data-view]');

function handleInput() {
  $photo.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $photoUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

function hidePelement() {
  if (data.entries.length > 0) {
    $hideNoEntries.classList.add('hidden');
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
  changeView('entries');
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
  hidePelement();
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
  } data.view = '';
}

function click(event) {
  if (event.target.matches('.switch-back')) {
    $newEntry.classList.remove('hidden');
  } if (event.target.matches('.switch-back')) {
    $list.classList.add('hidden');
  }
}

function activeView(event) {
  var viewContent = event.target.getAttribute('data-link');
  changeView(viewContent);
}
function changeView(viewContent) {
  for (var j = 0; j < $tabView.length; j++) {
    if ($tabView[j].getAttribute('data-view') === viewContent) {
      $tabView[j].className = 'viewTab';
    } else {
      $tabView[j].className = 'viewTab hidden';
    }
  }
}

for (var i = 0; i < $buttons.length; i++) {
  $buttons[i].addEventListener('click', activeView);
}

window.addEventListener('DOMContentLoaded', handleDomContent);
$form.addEventListener('submit', submitForm);
$switchView.addEventListener('click', clicked);
$switchBack.addEventListener('click', click);
$photoUrl.addEventListener('input', handleInput);

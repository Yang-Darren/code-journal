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
var $saveButton = document.querySelector('.save-button');
var $editTitle = document.querySelector('#title');
var $editNotes = document.querySelector('#notes');

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
  newObj.entryId = data.nextEntryId;
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
  $entry.setAttribute('data-entry-id', entry.entryId);

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
  var $editing = document.createElement('div');
  $editing.className = 'edit-container';
  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen';
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $editing.appendChild($h3);
  $editing.appendChild($editIcon);
  $input.appendChild($editing);
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
  }
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

for (var k = 0; k < $buttons.length; k++) {
  $buttons[k].addEventListener('click', activeView);
}

function refreshPage(page) {

  data.view = page;
  if (page === 'entry-form') {
    $newEntry.classList.remove('hidden');
    $list.classList.add('hidden');
  } else if (page === 'entries') {
    $list.classList.remove('hidden');
    $newEntry.classList.add('hidden');
  }
}

function editEntries(event) {
  if (event.target && event.target.tagName === 'I') {
    var $closestEntry = event.target.closest('.submission');
    changeView('entry-form');
  }

  var renderedEntriesId = $closestEntry.getAttribute('data-entry-id');
  for (var l = 0; l < data.entries.length; l++) {
    if (Number(renderedEntriesId) === data.entries[l].entryId) {
      data.editing = data.entries[l];
    }
    $editTitle.value = data.editing.title;
    $photoUrl.value = data.editing.photourl;
    $editNotes.value = data.editing.notes;
  }
}

$switchBack.addEventListener('click', function (event) {
  refreshPage('entry-form');
});

$switchView.addEventListener('click', function (event) {
  refreshPage('entries');
});

$saveButton.addEventListener('click', function (event) {
  refreshPage('entries');
});
window.addEventListener('DOMContentLoaded', function (event) {
  refreshPage(data.view);
});
window.addEventListener('DOMContentLoaded', handleDomContent);
$form.addEventListener('submit', submitForm);
$switchView.addEventListener('click', clicked);
$switchBack.addEventListener('click', click);
$photoUrl.addEventListener('input', handleInput);
$allEntries.addEventListener('click', editEntries);

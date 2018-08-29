const titleInput = document.querySelector('.title-input');
const urlInput = document.querySelector('.url-input');
const enterButton = document.querySelector('.enter-button');
const bookmarkList = document.querySelector('.bookmark-list');
const totalCounter = document.querySelector('#total-counter');
const unreadCounter = document.querySelector('#unread-counter');
const readCounter = document.querySelector('#read-counter');
const clearAllButton = document.querySelector('.js-clear-all-button');
let readButton = document.querySelector('.bookmark-read');
let deleteButton = document.querySelector('.bookmark-delete')
let readBookmarks = 0;
let totalBookmarks = 0;
let unreadBookmarks = 0;

function checkInputValue() {
  if (!!titleInput.value || !!urlInput.value) {
    enterButton.disabled = false;
  } else {
    enterButton.disabled = true;
  }
}

function createBookmarkHTML(newTitle, newUrl) {
  let placeholder = document.querySelector('.placeholder');
  if (placeholder.classList.contains('placeholder')) {
    bookmarkList.innerHTML = '';
  }
  bookmarkList.insertAdjacentHTML('afterbegin', 
    `<article class='bookmark animate-add'>
      <h1 class='bookmark-title'>${newTitle}</h1>
      <a class='bookmark-url css-links' href="${newUrl}">${newUrl}</a>
      <button type='button' class='bookmark-read css-links css-read-and-delete''>Mark as Read</button>
      <button type='button' class='bookmark-delete css-links css-read-and-delete''>Delete</button>
    </article>`);
  totalBookmarks = document.querySelectorAll('article').length;
  unreadBookmarks = totalBookmarks - readBookmarks;
  updateHeader();
  titleInput.value = '';
  urlInput.value = '';
  checkInputValue();
  setTimeout(function() { 
    let bookmark = document.querySelector('.bookmark')
    bookmark.classList.remove('animate-add'); 
  }, 2000);
}

function updateHeader() {
  totalCounter.innerText = totalBookmarks;
  unreadCounter.innerText = unreadBookmarks;
  readCounter.innerText = readBookmarks;
}

function markAsRead() {
  event.target.parentNode.classList.toggle('read');
  event.target.innerText = 'Mark as Unread';
  readBookmarks++;
  unreadBookmarks--;
  updateHeader();
}

function markAsUnread() {
  event.target.parentNode.classList.toggle('read');
  event.target.innerText = 'Mark as Read';
  readBookmarks--;
  unreadBookmarks++;
  updateHeader();
}

function deleteReadBookmark() {
  readBookmarks--;
  totalBookmarks--;
  event.target.parentNode.classList.toggle('animate-delete');
}

function deleteUnreadBookmark() {
  unreadBookmarks--;
  totalBookmarks--;
  event.target.parentNode.classList.toggle('animate-delete');
}

titleInput.addEventListener('input', checkInputValue);

urlInput.addEventListener('input', checkInputValue);

enterButton.addEventListener('click', function(event){
  newTitle = titleInput.value;
  newUrl = urlInput.value;
  if (urlInput.checkValidity() === true) {
    createBookmarkHTML(newTitle, newUrl);
    event.preventDefault();
  }
});

clearAllButton.addEventListener('click', function(event) {
  bookmarkList.innerHTML = '';
  totalBookmarks = 0;
  unreadBookmarks = 0;
  readBookmarks = 0;
  updateHeader();
  titleInput.value = '';
  urlInput.value = '';
  checkInputValue();
  event.preventDefault();
});

bookmarkList.addEventListener('click', function(event) {
  if (event.target.classList.contains('bookmark-read') && event.target.innerText === 'Mark as Read') {
    markAsRead();
  } else if (event.target.classList.contains('bookmark-read') && event.target.innerText === 'Mark as Unread') {
    markAsUnread();
  } else if (event.target.classList.contains('bookmark-delete') && event.target.parentNode.classList.contains('read')) {
    deleteReadBookmark();
    setTimeout(function() {
        event.target.parentNode.remove();
    }, 1900);
    updateHeader();
  } else if (event.target.classList.contains('bookmark-delete') && !event.target.parentNode.classList.contains('read')) {
    deleteUnreadBookmark();
    setTimeout(function() {
        event.target.parentNode.remove();
    }, 1900);
    updateHeader();
  }
});


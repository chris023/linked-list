const titleInput = document.querySelector('.title-input');
const urlInput = document.querySelector('.url-input');
const enterButton = document.querySelector('.enter-button');
const bookmarkList = document.querySelector('.bookmark-list');
const totalCounter = document.querySelector('#total-counter');
const unreadCounter = document.querySelector('#unread-counter');
const readCounter = document.querySelector('#read-counter');
const clearAllButton = document.querySelector('.js-clear-all-button');
let articleId = 0;
let readBookmarks = 0;
let totalBookmarks = 0;
let unreadBookmarks = 0;

function checkInput() {
  if (!!titleInput.value || !!urlInput.value) {
    enterButton.disabled = false;
  } else {
    enterButton.disabled = true;
  }
}


function createBookmarkHTML(newTitle, newUrl) {
  if (articleId === 0) {
    bookmarkList.innerHTML = '';
  }
  bookmarkList.insertAdjacentHTML('afterbegin', 
    `<article class='bookmark' id='bookmark${articleId}'>
      <h1 class='bookmark-title'>${newTitle}</h1>
      <a class='bookmark-url css-links' href="${newUrl}">${newUrl}</a>
      <button type='button' class='bookmark-read css-links css-read-and-delete' id='read${articleId}'>Mark as Read</button>
      <button type='button' class='bookmark-delete css-links css-read-and-delete' id='delete${articleId}'>Delete</button>
    </article>`);
  createReadListener();
  createDeleteListener();
  articleId++;
  totalBookmarks = document.querySelectorAll('article').length;
  unreadBookmarks = totalBookmarks - readBookmarks;
  updateHeader();
  titleInput.value = '';
  urlInput.value = '';
  checkInput();
}

function createReadListener() {
  let readButton = document.querySelector(`#read${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  readButton.addEventListener('click', function() {
    if (readButton.innerText === 'Mark as Read') {
      bookmark.classList.toggle('read');
      readButton.innerText = 'Mark as Unread';
      readBookmarks++;
      unreadBookmarks--;
    } else if (readButton.innerText === 'Mark as Unread') {
      bookmark.classList.toggle('read');
      readButton.innerText = 'Mark as Read';
      readBookmarks--;
      unreadBookmarks++;
    }
    updateHeader();
  });
}

function createDeleteListener() {
  let deleteButton = document.querySelector(`#delete${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  deleteButton.addEventListener('click', function() {
    if(this.parentNode.classList.contains('read')) {
      readBookmarks--;
    } else {
      unreadBookmarks--;
    }
    totalBookmarks--;
    bookmark.classList.toggle('animate-delete');
    setTimeout(function () { bookmark.remove(); }, 2000);
    updateHeader();
  });
}

function updateHeader() {
  totalCounter.innerText = totalBookmarks;
  unreadCounter.innerText = unreadBookmarks;
  readCounter.innerText = readBookmarks;
}

titleInput.addEventListener('input', checkInput);

urlInput.addEventListener('input', checkInput);

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
  checkInput();
  event.preventDefault();
});


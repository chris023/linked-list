const titleInput = document.querySelector('.title-input');
const urlInput = document.querySelector('.url-input');
const enterButton = document.querySelector('.enter-button');
const listSection = document.querySelector('.list-section');
let articleId = 0;

titleInput.addEventListener('input', function() {
  if (!!titleInput.value) {
    enterButton.disabled = false;
  } else
  enterButton.disabled = true;
});

urlInput.addEventListener('input', function() {
  if (!!urlInput.value) {
    enterButton.disabled = false;
  } else
  enterButton.disabled = true;
});

enterButton.addEventListener('click', function(event){
  newTitle = titleInput.value;
  newUrl = urlInput.value;
  if (!newTitle || !newUrl) {
    alert('Please enter a Title and URL for your new bookmark!');
  } else if (urlInput.checkValidity() === true) {
    createBookmarkHTML(newTitle, newUrl);
    event.preventDefault();
  }
});

function createBookmarkHTML(newTitle, newUrl) {
  if (articleId === 0) {
    listSection.innerHTML = '';
  }
  listSection.insertAdjacentHTML('beforeend', 
    `<article class='bookmark' id='bookmark${articleId}'>
      <h1 class='bookmark-title'>${newTitle}</h1>
      <a class='bookmark-url css-links' href="${newUrl}">${newUrl}</a>
      <button type='button' class='bookmark-read css-links css-read-and-delete' id='read${articleId}'>Unread</button>
      <button type='button' class='bookmark-delete css-links css-read-and-delete' id='delete${articleId}'>Delete</button>
    </article>`);
  createReadListener();
  createDeleteListener();
  articleId++;
}

function createReadListener() {
  let readButton = document.querySelector(`#read${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  readButton.addEventListener('click', function() {
    if (readButton.innerText === 'Unread') {
      bookmark.classList.toggle('read');
      readButton.innerText = 'Read';
    } else if (readButton.innerText === 'Read') {
    bookmark.classList.toggle('read');
    readButton.innerText = 'Unread';
    }
  });
}

function createDeleteListener() {
  let deleteButton = document.querySelector(`#delete${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  deleteButton.addEventListener('click', function() {
    bookmark.remove();
  });
}



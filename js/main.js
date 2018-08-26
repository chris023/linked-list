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
  } else
  createBookmarkHTML(newTitle, newUrl);
  event.preventDefault();
});

// function createBookmarkHTML(newTitle, newUrl){
//   bookmarksHTMLArray.push(
//     `<article class='bookmark'>
//       <h1 class='bookmark-title'>${newTitle}</h1>
//       <a class='bookmark-url css-links' href="${newUrl}">${newUrl}</a>
//       <p class='bookmark-read css-links css-read-and-delete'>Read</p>
//       <p class='bookmark-delete css-links css-read-and-delete'>Delete</p>
//     </article>`);
// }

function createBookmarkHTML(newTitle, newUrl) {
  listSection.insertAdjacentHTML('beforeend', `<article class='bookmark' id='bookmark${articleId}'>
      <h1 class='bookmark-title'>${newTitle}</h1>
      <a class='bookmark-url css-links' href="${newUrl}">${newUrl}</a>
      <p class='bookmark-read css-links css-read-and-delete' id='read${articleId}'>Read</p>
      <p class='bookmark-delete css-links css-read-and-delete' id='delete${articleId}'>Delete</p>
    </article>`);
  createReadListener();
  createDeleteListener();
  articleId++;
}

// function createListHTML(arr) {
//   booksmarksString = '';
//   for (let i = 0; i < bookmarksHTMLArray.length; i++) {
//     booksmarksString += bookmarksHTMLArray[i];
//   }
//   listSection.innerHTML = booksmarksString;
// }

// function createReadListeners() {
//   readButtonArray = document.querySelectorAll('.bookmark-read');
//   for (let i = 0; i < readButtonArray.length; i++) {
//     readButtonArray[i].addEventListener('click', function() { 
//       document.querySelectorAll('.bookmark')[i].classList.toggle('read');
//     });
//   }
// }

function createReadListener() {
  let readButton = document.querySelector(`#read${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  readButton.addEventListener('click', function() {
    bookmark.classList.toggle('read');
  });
}

function createDeleteListener() {
  let deleteButton = document.querySelector(`#delete${articleId}`);
  let bookmark = document.querySelector(`#bookmark${articleId}`);
  deleteButton.addEventListener('click', function() {
    bookmark.remove();
  });
}

// function createDeleteListeners() {
//   let articles = document.querySelectorAll('.bookmark');
//   deleteButtonArray = document.querySelectorAll('.bookmark-delete');
//   for (let i = 0; i < deleteButtonArray.length; i++) {
//     deleteButtonArray[i].addEventListener('click', function() { 
//       // bookmarksHTMLArray.splice(i, 1);
//       // createListHTML(bookmarksHTMLArray);
//       createReadListeners();
//       createDeleteListeners();
//     });
//   }
// }


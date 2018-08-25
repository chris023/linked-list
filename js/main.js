const titleInput = document.querySelector('.title-input');
const urlInput = document.querySelector('.url-input');
const enterButton = document.querySelector('.enter-button');
const listSection = document.querySelector('.list-section');
let readButtonArray = [];
let deleteButtonArray = [];
let bookmarksHTMLArray = [];

enterButton.addEventListener('click', function(){
  newTitle = titleInput.value;
  newUrl = urlInput.value;
  createBookmarkHTML(newTitle, newUrl);
  createListHTML(bookmarksHTMLArray);
  createReadListeners();
  createDeleteListeners();
  event.preventDefault();
});

function createBookmarkHTML(newTitle, newUrl){
  bookmarksHTMLArray.push(`<article class='bookmark'>
  <h1 class='bookmark-title'>${newTitle}</h1>
  <a class='bookmark-url'>${newUrl}</a>
  <p class='bookmark-read'>Read</p>
  <p class='bookmark-delete'>Delete</p>
  </article>`);
}

function createListHTML(arr) {
  booksmarksString = '';
  for (let i = 0; i < bookmarksHTMLArray.length; i++) {
    booksmarksString += bookmarksHTMLArray[i];
  }
  listSection.innerHTML = booksmarksString;
}

function createReadListeners() {
  readButtonArray = document.querySelectorAll('.bookmark-read');
  for (let i = 0; i < readButtonArray.length; i++) {
    readButtonArray[i].addEventListener('click', function() {
      document.querySelectorAll('.bookmark')[i].classList.toggle('read');
    });
  }
}

function createDeleteListeners() {
  deleteButtonArray = document.querySelectorAll('.bookmark-delete');
  for (let i = 0; i < deleteButtonArray.length; i++) {
    deleteButtonArray[i].addEventListener('click', function() {
      bookmarksHTMLArray.splice(i, 1);
      createListHTML(bookmarksHTMLArray);
      createReadListeners();
      createDeleteListeners();
    });
  }
}


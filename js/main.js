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
  let readButton = document.querySelectorAll('.bookmark-read')[readButtonArray.length];
  readButtonArray.push(readButton);
  readButton.addEventListener('click', function() {
    readButton.classList.toggle('read');
  });
}

function createDeleteListeners() {
  let deleteButton = document.querySelectorAll('.bookmark-delete')[deleteButtonArray.length];
  deleteButtonArray.push(deleteButton);
  let currentArrayLength = deleteButtonArray.length;
  deleteButtonArray[currentArrayLength - 1].addEventListener('click', function(currentArrayLength) {
    let index = deleteButtonArray.findIndex(function(element) {
      return element === deleteButton;
    });
    bookmarksHTMLArray.splice(index, 1);
    readButtonArray.splice(index, 1);
    deleteButtonArray.splice(index, 1);
    createListHTML(bookmarksHTMLArray);
  });
}


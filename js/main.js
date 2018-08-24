const titleInput = document.querySelector('.title-input');
const urlInput = document.querySelector('.url-input');
const enterButton = document.querySelector('.enter-button');
const listSection = document.querySelector('.list-section');

enterButton.addEventListener('click', function(){
  newTitle = titleInput.value;
  newUrl = urlInput.value;
  createNewBookmark(newTitle, newUrl);
  event.preventDefault();
});

function createNewBookmark(newTitle, newUrl){
  listSection.innerHTML += `<article class='bookmark'>
  <h1 class='bookmark-title'>${newTitle}</h1>
  <a class='bookmark-url'>${newUrl}</a>
  <p class='bookmark-read'>Read</p>
  <p class='bookmark-delete'>Delete</p>
</article>`;
}
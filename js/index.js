const baseUrl = 'http://localhost:3000/books'

document.addEventListener("DOMContentLoaded", function() {
  init()
});

function init(){
  getBooks()
}

function getBooks(){
  fetch(baseUrl)
    .then(res => res.json())
    .then(renderBookLists)
}

function renderBookLists(books){
  
  books.forEach(book => {
    renderOneList(book)
  });
}

function renderOneList(book){
  const bookUl = document.querySelector('#list')
  const bookLi = document.createElement('li')
  bookLi.textContent = book.title
  bookUl.append(bookLi)
  bookLi.addEventListener('click', e => {
    console.log(e.target.innerText)
    console.log(book)
    renderBookDetail(book)
  })
  
}

function renderBookDetail(book){
  const showPanel = document.querySelector('#show-panel')
  showPanel.innerHTML = `
    <h2>${book.title}</h2>
    <img src=${book.img_url}>
    <p>${book.description}</p>
    <ul class="users">
    </ul>
    <button>like</button>
  `
  const users = book.users
  renderUsers(users)

  const likeBtn = showPanel.querySelector('button')
  likeBtn.addEventListener('click', e =>{
    console.log(e.target)
    console.log(book.users)
    book.users.push({"id":1, "username":"pouros"})
    updateLikes(book)
  })

}

function renderUsers(users){
  const userList = document.querySelector('.users')
  users.forEach(function(user){
    userList.innerHTML += `
    <li>${user.username}</li>
    `
  })
}
// http://localhost:3000/books/:id
function updateLikes(book){
  console.log(book.users)
  const userObj = {
    "users": [...book.users]
  }
  fetch(baseUrl+`/${book.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(userObj)
  }).then(res => res.json())
  .then(renderBookDetail)
}
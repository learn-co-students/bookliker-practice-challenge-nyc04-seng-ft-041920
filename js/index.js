const bookArr = []
const panel = document.querySelector("#list-panel")
const bookList = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

const booksUrl = "http://localhost:3000/books"

function fetchBooks(url) {
  return fetch(url)
  .then(r => r.json())
}

function renderBook(book) {
  const bookItem = document.createElement('li')
  bookItem.dataset.id = book.id
  bookItem.className = "listItem"
  bookItem.textContent = book.title
  panel.appendChild(bookItem)

  bookItem.addEventListener('click', e => {
    showPanel.innerHTML = ""
    renderBookInfo(book)
  })
}

function renderBookInfo(book) {
  const bookSection = document.createElement('section')
  bookSection.className = "bookSection"
  bookSection.dataset.id = book.id
  bookSection.innerHTML = `
    <h1 class="title">${book.title}</h1>
    <img src="${book.img_url}" alt="${book.title} Cover" class="bookImg">
    <p class="description">${book.description}</p>
    <h2>${book.users.length} people like this book</h2>
    <ul class="usersLiked"></ul>
    <!-- Use string interpolation to toggle the likes -->
    <button class="readBook">Like</button>
  `
  showPanel.appendChild(bookSection)
  // BUT... we got users
  let userList = document.querySelector('.usersLiked')
  let user;
  book.users.forEach(users => {
    // console.log(users)
    user = document.createElement('li')
    user.dataset.id = users.id
    user.textContent = users.username
    userList.appendChild(user)
  })

  let likeBtn = document.querySelector('.readBook')
  likeBtn.addEventListener('click', e => {
    // console.log('clicked')
    likeBook(book.id, book.users)
  })

}

// how do you do this without calling the book too?
function likeBook(book, users) {
  let user1 = { id: 1, username: "pouros"}
  if (!users.includes(user1)) {
    users.push(user1)
    console.log(users)
    let newUsers = {
      "users": [...users]
    }
    fetch(`http://localhost:3000/books/${book}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUsers)
    }).then(r => r.json()).then(list => console.log(list))
  }
}

function renderAllBooks(books) {
  books.forEach(renderBook)
}

fetchBooks(booksUrl).then().then(renderAllBooks)

document.addEventListener("DOMContentLoaded", function() {


//DOM Elements
const listPanel = document.querySelector("#list")
const detailsPanel = document.querySelector("#show-panel")
console.log(detailsPanel)
// Event Listeners

// Render Helpers
function renderOneBookOnSide(bookObj){
  const bookLi = document.createElement("li")
  bookLi.textContent = bookObj.title
  listPanel.append(bookLi)

  bookLi.addEventListener("click", function(e){
    displayBookDetails(bookObj)
    console.log(bookObj)
  })
}

function displayBookDetails(bookObj){
  detailsPanel.innerHTML = `<h1>${bookObj.title}</h1><img src="${bookObj.img_url}" alt="${bookObj.title}">
  <p>${bookObj.description}</p>
  <h4 id="likes-list">${displayLikesList(bookObj.users)}</h4>
  <button class="like-btn" data-id="${bookObj.id}">${bookObj.users.includes({"id":1, "username":"pouros"}) ? "Unlike" : "Like!"}</button>
  `

  const likeBtn = document.querySelector(".like-btn")
  likeBtn.addEventListener("click", function(e){
    // if they didn't like it yet
    // like it and switch textContent
    if (likeBtn.textContent === "Like!"){
      likeBook(bookObj, true)
      likeBtn.textContent = "Unlike"
    }
    // unlike it 
    else{
      likeBook(bookObj, false)
      likeBtn.textContent = "Like!"
    }
  })
}

function displayLikesList(userArray){
  let userList = ""
  userArray.forEach(function(user){
    console.log(user.username)
    userList += `${user.username} `
  })
  return userList
}

// will unlike if book is false
function likeBook(bookObj, bool){
  likesArray = bookObj.users
  // if true, we are liking
  if (bool){
    likesArray.push({"id":1, "username":"pouros"})
  }
  // else unlike
  else{
    likesArray.pop() //remove self from the array
  }
  console.log(bookObj)
  console.log(likesArray)
  fetch(`http://localhost:3000/books/${bookObj.id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"users": likesArray}) 
  })
  .then(r => r.json())
  .then(bookObj => {
    const likesList = document.querySelector("#likes-list")
    likesList.textContent = displayLikesList(bookObj.users)

  })

}

//initialize

fetch("http://localhost:3000/books")
.then(r => r.json())
.then(bookArray => {
  bookArray.forEach(function(bookObj){
    renderOneBookOnSide(bookObj)
  })

  displayBookDetails(bookArray[0])
})













}); //DOMContentLoaded

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});


function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        json.forEach(function(book) {
            renderBookList(book)
        })
    })
}

function renderBookList(book) {
    const bookList = document.querySelector("#list")
    const bookTitleLi = document.createElement("li")
    bookTitleLi.innerText = book.title
    bookList.append(bookTitleLi)

    //add event listener 
    bookTitleLi.addEventListener("click", function(e) {
        renderBook(book)
    })
}

function renderBook(book) {
    const showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.img_url}">
        <p>${book.description}</p>
    `
    displayUsers(book.users,showPanel)
    const readButton = document.createElement("button")
    readButton.innerText = "Read me"
    showPanel.append(readButton)

    readButton.addEventListener("click", function(e) {
        addUserPatchReq(book)
        renderBook(book)
    })
}

function displayUsers(userArray, showPanel) {
    userArray.forEach(function(user) {
        const userP = document.createElement("section")
        userP.innerText = user.username;
        showPanel.append(userP)
    })
}

function addUserPatchReq(book) {
    book.users.push({"id":1, "username":"aleksa"})
    const patchObj = 
        {
            "users": [...book.users]
        }
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(patchObj)
        }
        fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(function(res) {
        return res.json();
        })
        .then(function(obj) {
        console.log(obj)
        })

}

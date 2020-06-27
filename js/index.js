const list = document.getElementById("list")
const panel = document.getElementById("show-panel")
// const listUsers = document.getElementById("list-readers")

fetch("http://localhost:3000/books")
.then(resp => resp.json())
.then(bookData => {
  bookData.forEach(book => {
    console.log(book)
    const li = document.createElement('li') 
    li.innerText = book.title
    list.append(li)
    li.addEventListener("click", (event) => {
      panel.innerHTML = `
        <h2>${book.title}</h2>
        <img src=${book.img_url} alt="${book.title}">
        <p>${book.description}</p>
        <div>
        <ul id="list-readers">
        </ul>
      </div>
        <button>Read book</button>
      `
      const btn = panel.querySelector("button")
      btn.addEventListener("click", (event) => {
        const listUsers = document.getElementById("list-readers")
        book.users.forEach(user => {
          const currentUser = {"id": 1, "username": "Marlon"}
          listUsers.innerHTML = `
            <li>${user.username}</li>
          `
          fetch(`http://localhost:3000/books/${currentUser.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(
              {
                "users": [ ...book.users, currentUser ]
              }
            )
          })
          li.innerText = currentUser.username
          listUsers.append(li)
        })
      })
    })
  })
})
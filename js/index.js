document.addEventListener("DOMContentLoaded", function() {

    //DOM element 
    const booksCollector = document.querySelector("#list")
    const oneBook = document.querySelector("#show-panel")

    //Event listeners

    //Render helper 
    function renderOneBook(bookObject) {
        oneBook.innerHTML = `<h1>${bookObject.title}</h1><img src="${bookObject.img_url}" alt="${bookObject.title}">
        <p>${bookObject.description}</p>`

    }

    function renderAllBooks(bookObject) {
        const bookLi = document.createElement("li")
        bookLi.className = "item"
        bookLi.dataset.id = bookObject.id
        bookLi.textContent = bookObject.title

        booksCollector.append(bookLi)

        bookLi.addEventListener("click", function(event) {
            renderOneBook(bookObject)
        })

    }

    //initial render

fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookArray => {
        bookArray.forEach(renderAllBooks)
    });














    
});

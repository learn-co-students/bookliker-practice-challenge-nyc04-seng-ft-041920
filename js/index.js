const url = 'http://localhost:3000/books';
const ul = document.getElementById('list');
const panel = document.getElementById('show-panel');
fetch(url).then(rsp => rsp.json()).then(json => {
    json.forEach(element => {
        let users = element.users;
        let bookDiv = document.createElement('div');
        let usUl = document.createElement('ul');
        //conditional to iterate user object 
        if (element.users !== undefined) {
            element.users.forEach((ele) => {
                let usLi = document.createElement('li');
                usLi.innerText = ele.username
                usUl.appendChild(usLi);
            })
        }

        bookDiv.dataset.id = element.id
        let li = document.createElement('li');
        li.innerHTML = element.title;
        ul.appendChild(li)
        let h3 = document.createElement('h3');
        let img = document.createElement('img');
        let p = document.createElement('p');

        h3.innerText = element.title
        img.src = element.img_url
        p.innerText = element.description

        bookDiv.appendChild(h3)
        bookDiv.appendChild(img)
        bookDiv.appendChild(p)
        bookDiv.appendChild(usUl)

        let likebtn = document.createElement('button');
        likebtn.innerText = 'like';
        likebtn.addEventListener('click', (event) => {
            url2 = `http://localhost:3000/books/${element.id}`
            users.push({ "id": 1, "username": "pouros" })
            fetch(url2, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'Application/json'
                },
                body: JSON.stringify({
                    users: users
                })
            })
            let li = document.createElement('li');
            li.innerHTML = 'pouros';
            usUl.appendChild(li);
        })

        bookDiv.appendChild(likebtn)

        bookDiv.style.display = "none"
        panel.appendChild(bookDiv);

        li.addEventListener('click', (event) => {
            if (bookDiv.style.display === "none") {
                bookDiv.style.display = "block";
            } else {
                bookDiv.style.display = "none";

            }

        })
    });
})


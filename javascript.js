const myLibrary = []
const myTable = document.querySelector('#book');
const form = document.querySelector('#dialog');

function book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function createTable() {
    let x = 0
    myTable.innerHTML = '';
    myTable.innerHTML = '<thead><th>Title</th><th>Author</th><th>Pages</th><th>Status</th><th></th></thead>';
    for (myBook of myLibrary) {
        const newRow = document.createElement("tr");
        const newTitle = document.createElement('td');
        const newAuthor = document.createElement('td');
        const newPages = document.createElement('td');
        const newStatus = document.createElement('td');
        const newButton = document.createElement('td');
        newButton.classList.add('button');
        const readButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        newTitle.textContent = myBook.title;
        newAuthor.textContent = myBook.author;
        newPages.textContent = myBook.pages;
        newStatus.textContent = myBook.status;
        newStatus.classList.add(`status${x}`);
        readButton.classList.add('read')
        readButton.textContent = 'Toggle Read';
        deleteButton.classList.add('delete')
        deleteButton.textContent = 'Delete';
        newRow.appendChild(newTitle);
        newRow.appendChild(newAuthor);
        newRow.appendChild(newPages);
        newRow.appendChild(newStatus);
        newRow.appendChild(newButton);
        newButton.appendChild(readButton);
        newButton.appendChild(deleteButton);
        myTable.appendChild(newRow);
        x++
    }
    const del = document.querySelectorAll('.delete');
    console.log(del);
    for (let d = 0; d < del.length; d++) {
        del[d].addEventListener('click', () => { delRow(d) });
    }

    const toggle = document.querySelectorAll('.read');
    console.log(toggle);
    for (let t = 0; t < toggle.length; t++) {
        toggle[t].addEventListener('click', () => { toggleRead(t) });
    }
}

function delRow(a) {
    console.log(a);
    myLibrary.splice(a, 1);
    myTable.deleteRow(a + 1);
    createTable();
};

function toggleRead(a) {
    let status = document.querySelector(`.status${a}`);
    if (status.textContent === 'Already read') { status.textContent = 'Not yet read' }
    else { status.textContent = 'Already read' }
}

function addBookToLibrary() {
    const bookTitle = document.querySelector('#title').value;
    const BookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#page').value;
    const BookStatus = document.querySelector('input[name="read"]:checked').value;
    console.log(bookTitle);
    const newBook = new book(bookTitle, BookAuthor, bookPages, BookStatus)
    console.log(newBook);
    myLibrary.push(newBook);
    console.log(myLibrary);
    createTable();
    const inputs = document.querySelectorAll('#title, #author, #page');
    inputs.forEach(input => {
        input.value = '';
    });
    document.querySelector('input[name="read"]:checked').checked = false;
}

function openDialog() {
    form.showModal();
}

function closeDialog() {
    form.close();
}

const addBook = document.querySelector('#addbook');
addBook.addEventListener('click', openDialog);

const close = document.querySelector('#exit');
close.addEventListener('click', closeDialog);

const submit = document.querySelector('#submit');
submit.addEventListener('click', function (event) {
    event.preventDefault();
    addBookToLibrary();
    closeDialog();
});

createTable();
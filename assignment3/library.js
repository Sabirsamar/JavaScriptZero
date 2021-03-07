//get form data
let form = document.getElementById('bookForm');
//get book Type
let bookType = document.bookForm.bookType;
//get book Name
let bookName = document.getElementById('BookName');
//get author Name
let authorName = document.getElementById('AuthorName');

document.addEventListener("load", getLocalMemory());
//submit form event
form.addEventListener('submit', addBookhandle);

function addBookhandle(event) {
    if (event != null) {
        addBook();
    }
}



//addBook function
function addBook(book = null, author = null, type = null, dateti = null) {
    //e.preventDefault();
    let dateTime = new Date().toLocaleDateString();
    if (book != null) {
        bookName.value = book;
        authorName.value = author;
        bookType.value = type;
        dateTime = dateti;

    }


    if (bookType.value.length <= 0) {
        alert("Please select book type");
    }
    if (validateInput() && bookType.value.length != 0) {
        let values = [bookName.value, authorName.value, bookType.value, dateTime];
        let table = document.getElementById("myTable");
        let tr = document.createElement('tr');
        tr.setAttribute("class", "row");

        for (let i = 0; i <= 2; i++) {
            let td = document.createElement("td");
            td.id = "row" + table.rows.length + "_" + "col" + i;
            td.textContent = values[i];
            tr.appendChild(td);
        }
        let td = document.createElement("td");
        let datetd = document.createElement("td");
        datetd.innerText = dateTime;
        let span = document.createElement('span');
        span.id = "action_col";
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.id = "DeleteButton";
        deleteBtn.addEventListener("click", deleteBook);
        deleteBtn.setAttribute("class", "action");

        span.appendChild(deleteBtn);
        td.appendChild(span);
        tr.appendChild(td);
        tr.appendChild(datetd);

        table.appendChild(tr);
        if (book == null) {
            addLocalMemory(values[0], values[1], values[2], values[3]);
            resetForm(bookName);
            resetForm(authorName);
            setFlashMessage("Congratulations!", "Your book is added successfully", "success");
        }

    } else {
        setFlashMessage("Warning!", "Please enter valid input!", "warning");
    }
}

// add item funct for local
function addLocalMemory(bookName, authorName, bookType, dateTime) {
    let bookObj = { "bookName": bookName, "authorName": authorName, "bookType": bookType, "dateTime": dateTime };
    let bookKey = JSON.parse(localStorage.getItem("bookData"));
    if (bookKey == null) {
        let books = [];
        books.push(bookObj);
        bookKey = { books };
    } else {
        bookKey.books.push(bookObj);
    }
    localStorage.setItem("bookData", JSON.stringify(bookKey));

}

function isprime(n) {
    if (isNaN(n)) {
        return false;
    } else {
        for (let i = 2; i < n; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
}


// deleted row 
function deleteBook() {
    let currentRow = this.parentNode.parentNode.parentNode;
    //alert(currentRow.rowIndex);
    if (currentRow) {

        currentRow.remove();

        setFlashMessage("Congratulations!", "Your book has been removed successfully", "success");
    }
}

//flash message on screen
function setFlashMessage(boldText, normalText, type) {
    let messageBox = document.getElementById('alertBox');
    let newSpan = document.createElement('span');
    newSpan.innerHTML = "<strong>" + boldText + "</strong><br/>" + normalText;
    if (type == "success") {
        messageBox.style.backgroundColor = "grey";
    }
    if (type == "warning") {
        messageBox.style.backgroundColor = "red";
    }
    messageBox.appendChild(newSpan);
    setTimeout(function() {
        messageBox.innerHTML = "";
    }, 2000);
    location.reload();
}

//validated book and author name
function validateInput() {
    if (bookName.value.length >= 5 && bookName.value.length <= 20 && isNaN(bookName.value) && authorName.value.length > 0) {
        return true;
    }
    return false;
}

// reset input data
function resetForm(e) {
    e.value = "";
}

//read book data from local memory
function getLocalMemory() {
    let getBookArray = JSON.parse(localStorage.getItem("bookData"));

    if (getBookArray == null) {
        return null;
    } else {
        for (let i = 0; i < getBookArray.books.length; i++) {

            let book = getBookArray.books[i].bookName;
            let author = getBookArray.books[i].authorName;
            let type = getBookArray.books[i].bookType;
            let dateti = getBookArray.books[i].dateTime;
            addBook(book, author, type, dateti);
        }
        return getBookArray;
    }
}


//Search book data
function searchBook(bookname, author, type, date) {
    let getBookItem = JSON.parse(localStorage.getItem("bookData"));
    for (let i = 0; i <= getBookItem.books.length - 1; i++) {
        // console.log(getBookItem.books[i]);
        //console.log(bookname+"::"+author+"::"+type+"::"+date);
        //console.log(getBookItem.books[i]["bookName"]+"::"+getBookItem.books[i]["authorName"]+"::"+getBookItem.books[i]["bookType"]+"::"+getBookItem.books[i]["dateTime"]);
        if (getBookItem.books[i]["bookName"] == bookname && getBookItem.books[i]["authorName"] == author && getBookItem.books[i]["bookType"] == type && getBookItem.books[i]["dateTime"] == date) {
            return i;
        }
    }
}
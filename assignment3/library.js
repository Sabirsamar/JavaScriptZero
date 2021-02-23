var ac ;    
//get form data
let form = document.getElementById('bookForm');
//get book Type
let bookType = document.bookForm.bookType;
//get book Name
let bookName = document.getElementById('BookName');
//get author Name
let authorName = document.getElementById('AuthorName');

//submit form event
form.addEventListener('submit', addBook);

//addBook function
function addBook(e) {
    e.preventDefault();
    let dateTime = new Date().toLocaleDateString();

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
        addLocalMemory(values[0],values[1],values[2],values[3]);
        resetForm(bookName);
        resetForm(authorName);
        setFlashMessage("Congratulations!", "Your book is added successfully", "success");
    } else {
        setFlashMessage("Warning!", "Please enter valid input!", "warning");
    }
}

//
// add item funct for local



function addLocalMemory(bookName,authorName,bookType,dateTime) {
    let bookObj = {"bookName":bookName,"authorName":authorName,"bookType":bookType,"dateTime":dateTime};
    let bookKey = JSON.parse(localStorage.getItem("bookData"));
    if(bookKey == null)
    {
        let books = [];
        books.push(bookObj);
        bookKey = {books};
    }
    else
    {
        bookKey.books.push(bookObj);
    }
    localStorage.setItem("bookData",JSON.stringify(bookKey));

}

function deleteBook() {
    let currentRow = this.parentNode.parentNode.parentNode;
    if (currentRow) {
        currentRow.remove();
        setFlashMessage("Congratulations!", "Your book has been removed successfully", "success");
    }
}

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
    setTimeout(function () {
        messageBox.innerHTML = "";
    }, 2000);
}

function validateInput() {
    if (bookName.value.length >= 5 && bookName.value.length <= 20 && isNaN(bookName.value) && authorName.value.length > 0) {
        return true;
    }
    return false;
}

function resetForm(e) {
    e.value = "";
}
// get values from local value

// function getLocalMemorys(){
//     console.log("local storage");
//     for (let i = 0; i < localStorage.length; i++)   {
//     console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
// }

// }

function getLocalMemory() {
    let getBookArray = JSON.parse(localStorage.getItem("bookData"));

    console.log(getBookArray);
    if(getBookArray == null)
    {
        return "";
    }
    for (let i = 0; i < getBookArray.books.length; i++) {
        let bookdata = console.log(getBookArray.books[i]['bookName']);
        }

    }

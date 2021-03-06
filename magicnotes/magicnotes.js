let btnaddnotes = document.getElementById("btnAddNotes");

btnaddnotes.addEventListener("click", createNotes);

var notesArray = [];

/*
Display Notes and
Add add to local memory
*/
function createNotes() {
    var title = document.getElementById("notesTitle").value;
    var description = document.getElementById("notesDescription").value;

    console.log(description + ',', title);

    //validate input
    if (title == '' || description == '') {
        alertMessage("Please enter valid input!", "warning");
        return true;
    }
    else {
        let notesObj = { title: title, description: description };
        notesArray.push(notesObj);
        console.log(notesArray);
        localStorage.setItem("notesRecord", JSON.stringify(notesArray));

        createNotesElement(title, description);
        alertMessage("Notes added successfully!", "success");
        resetForm();
    }
}
/*
Create Notes Element
function BookNameValidation() 
*/
function createNotesElement(title, description) {

    let notes_container = document.getElementById("notesContent");
    let div_col_4 = document.createElement("div");
    div_col_4.setAttribute("class", "col-sm-4");

    let div_card = document.createElement("div");
    div_card.setAttribute("class", "card");

    let div_card_body = document.createElement("div");
    div_card_body.setAttribute("class", "card-body");

    let h5_title = document.createElement("h5");
    h5_title.setAttribute("class", "card-title");

    let p_text = document.createElement("p");
    p_text.setAttribute("class", "card-text");

    let button_del = document.createElement("button");
    button_del.setAttribute("class", "btn btn-primary");
    button_del.setAttribute("type", "button");
    button_del.innerText = "Delete Note";

    // append notes data to element
    h5_title.innerText = title;
    p_text.innerText = description;

    // append element
    div_card_body.appendChild(h5_title);
    div_card_body.appendChild(p_text);
    div_card_body.appendChild(button_del);

    div_card.appendChild(div_card_body);
    div_col_4.appendChild(div_card);

    notes_container.appendChild(div_col_4);
    console.log(notes_container);

}

/*
Reset form Data
*/

function resetForm() {
    document.querySelector('#notesTitle').value = '';
    document.querySelector('#notesDescription').value = '';
}

/*
  Display Alert Message
*/

function alertMessage(message, className) {
    let div = document.createElement('div');
    div.className = 'alert alert-'+ className;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector(".container");
    let form = document.querySelector("#notesForm");

    container.insertBefore(div, form);
    console.log(div);

    setTimeout(() => {
        document.querySelector('.alert').remove()
        
    }, 3000);

}

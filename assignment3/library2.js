let addbook=document.getElementById("addbook");
addbook.addEventListener("click",Addbookpressed);
var row = 1;
var radiovalue;
var BookArray = [];
function InitialiseBookData()
{
    if(localStorage.BookRecords)
    {
        BookArray=JSON.parse(localStorage.BookRecords);
        for(var i=0; i < BookArray.length; i++)
        {
            var bookname = BookArray[i].bookname;
            var author = BookArray[i].author;
            var booktype = BookArray[i].booktype;
            InsertBooktableCell(bookname,author,booktype);
        }
    }
}

function Addbookpressed(){
    var bookname = document.getElementById("bookname").value;
    var author = document.getElementById("author").value;
    var Type = document.getElementsByName("booktype");
    
    for(i = 0; i < Type.length; i++) { 
        if(Type[i].checked) {
           radiovalue = Type[i].value; 
        }
    }

        var bookObj = {bookname:bookname,author:author,booktype:radiovalue};
        BookArray.push(bookObj);
        console.log(BookArray);

        localStorage.BookRecords=JSON.stringify(BookArray);
        InsertBooktableCell(bookname,author,radiovalue);
       
        row ++;
}


function InsertBooktableCell(bookname,author,radiovalue)
{
    var display = document.getElementById("display");
    
        var newrow = display.insertRow(row);
        

        var cell1 = newrow.insertCell(0);
        var cell2 = newrow.insertCell(1);
        var cell3 = newrow.insertCell(2);
        var cell4 = newrow.insertCell(3);
        var cell5 = newrow.insertCell(4);
        var day_time=DateAndTime();
        
        let delBtn = document.createElement('button');
		delBtn.innerHTML = "Delete";
		delBtn.id = "Delete";
		delBtn.addEventListener("click",deleteRow);

        
        cell1.innerHTML = bookname;
        cell2.innerHTML = author;
        cell3.innerHTML = radiovalue;
        cell4.innerHTML = day_time;
       // cell5.innerHTML = `<button id="Delete" onclick="deleteRow(this)">Delete</button>`;
        cell5.appendChild(delBtn);    

}
function DateAndTime()
{
    var d=new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        var s=d.getSeconds();
        var da=d.getDate();
        var mo=d.getMonth() + 1;
        var yr=d.getFullYear();
        if(h < 10 )
            h = "0"+ h;
        if(m < 10)
            m = "0"+ m;
        if(s < 10)
            s = "0"+ s;
        var day_time=h+":"+m+":"+s+"  "+da+"/"+mo+"/"+yr;
        return day_time;
}
function deleteRow()
{

     var i = this.parentNode.parentNode.rowIndex;
     BookArray=JSON.parse(localStorage.BookRecords);
    var length = BookArray.length;

     document.getElementById("display").deleteRow(i);
     BookArray.splice(length - i,1);
     localStorage.BookRecords=JSON.stringify(BookArray);
  
         
}

function radioButton()
{
    var rdval;
    var type = document.getElementsByName("booktype");
        for(i = 0; i < type.length; i++) { 
            if(type[i].checked) {
               rdval = type[i].value; 
            }
        }
    return rdval;
} 

//Book name validation
function BookNameValidation(){
    var Bookname = document.getElementById("bookname");
    if(Bookname.value =="")
    {
        document.getElementById('errormsg').innerHTML="Please fill the Book name";
        Bookname.focus();
        return false;
    }
    else if(!(isNaN(Bookname.value)))
    {
        document.getElementById('errormsg').innerHTML="Numberic value not allow in Name of the Book";
        Bookname.focus();
        return false;
    
    }
    else if(Bookname.value.length < 6)
    {
        document.getElementById('errormsg').innerHTML="Book name is more than 6 character";
        Bookname.focus();
        return false;
        
    }
    else if(noSpaceAllowed(Bookname.value))
    {
        document.getElementById('errormsg').innerHTML="No Special Keyword allowed for Book Name";

    }
    else{
        return true;
    }
   
}

/* For Author name validation*/
function AuthorNameValidation(){
    var Author = document.getElementById("author");
    if(Author.value =="")
    {
        document.getElementById('errormsg').innerHTML="Please fill the Author name";
        Author.focus();
        return false;
    }
    else if(!(isNaN(Author.value)))
    {
        document.getElementById('errormsg').innerHTML="Numberic value not allow in Name of the Author Name";
        Author.focus();
        return false;
    
    }
    else if(Author.value.length < 6)
    {
        document.getElementById('errormsg').innerHTML="Author name is more than 6 character";
        Author.focus();
        return false;
        
    }
    else if(noSpaceAllowed(Author.value))
    {
        document.getElementById('errormsg').innerHTML="No Special Keyword allowed for Book Name";
        return false;

    }
    else{
        return true;
    }
   
}

function radioButtonValidation(){
    var selectedType = radioButton();

		if(selectedType.length<=0)
		{
			alert("Please Select type");
		}
}


function noSpaceAllowed(str)
{
	let specialkey = '!@#$%^&*()';
		for(let i = 0; i < specialkey.length-1; i++)
		{
			for (var j = 0; j<str.length-1; j++) {
				if(st.charAt(j) == spe.charAt(i))
				{
					return false;
				}
			}
		}
	return true;
}
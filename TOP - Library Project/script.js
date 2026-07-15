const dialogToAddBook = document.getElementById('dialogToAddBook');
const dialogOpen = document.getElementById('dialogOpen');
const dialogSubmit = document.getElementById('dialogSubmit');

dialogOpen.addEventListener('click', () => {
  dialogToAddBook.showModal();
});

dialogSubmit.addEventListener('click', () => {
  let name = document.getElementById('name').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let readBox = document.getElementById('read');
  // We need ".checked" to get boolean value for checkbox input type
  let read = readBox.checked;

  addBookToLibrary(name,author,pages,read);
  dialogToAddBook.close();
});

let myLibrary = [];

function Book(name,author,pages,read,id) {
  if(!new.target) {
    throw Error("Pleae use as constructor");
  }  
  this.Name = name;
  this.Author = author;
  this.Pages = pages;
  this.Finished_Reading = read ? "Yes" : "No";
  this.ID = id;
}

Book.prototype.changeRead = function() {
  this.Finished_Reading = (this.Finished_Reading === 'Yes') ? 'No' : 'Yes';
}


function addBookToLibrary(Name = "NA", Author = "NA", Pages = "NA", Read = false) {
  let newBook = new Book(Name,Author,Pages, Read, crypto.randomUUID());
  myLibrary.push(newBook);
  displayBook(newBook);
}


const displayLibrary = document.querySelector(".library");

function displayBook(book) {

    let displayNewBook = document.createElement("ul");

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Book';
    deleteButton.addEventListener('click', () => {
      displayNewBook.remove();

      //Delete from the original array as well.
      myLibrary = myLibrary.filter(eachBook => eachBook.ID !== book.ID);
      console.log('Book removed');
    }) 

    Object.entries(book).forEach(([key, value]) => {
      let displayEachDetail = document.createElement("li");

      if(key == 'Finished_Reading') {

        // Altering the textContent of the <li> removes the Change button. So using <span> to update the Yes/No of Finished_Reading. 

        let readValue = document.createElement('span');
        readValue.textContent = value;

        let buttonChangeRead = document.createElement('button');
        buttonChangeRead.innerText = 'Change';

        buttonChangeRead.addEventListener('click', () => {
          value = (value === 'Yes') ? 'No' : 'Yes';
          book.changeRead(); // Update the Orignal Library array too
          readValue.textContent = value;
        })

        displayEachDetail.textContent = `${key} : ` ;
        displayEachDetail.appendChild(readValue);
        displayEachDetail.appendChild(buttonChangeRead);
      }
      else {
        displayEachDetail.textContent = `${key} : ${value}`;
      }

      displayNewBook.appendChild(displayEachDetail);
    });
    displayNewBook.appendChild(deleteButton);

    displayNewBook.classList.add('displayed');
    displayLibrary.appendChild(displayNewBook);
}

// interface Book {
//     title: string,
//     author: string,
//     isBorrowed: boolean
// }

// const book: Book[] = [
//     {title: "1984", author: "George Orwell", isBorrowed: false},
//     {title: "To kill a Mockingbird", author: "Harper Lee", isBorrowed: false},
//     {title: "The Great Gatsby", author: "F. Scott Fitzgerald", isBorrowed: false},
// ]

// const bookGrid = document.getElementById('bookGrid') as HTMLDivElement;

// function renderBooks():void {
//     bookGrid.innerHTML = '';
//     book.forEach((book, index) => {
//         const bookDiv = document.createElement('div');
//         bookDiv.className = "book";

//         const title = document.createElement('h3');
//         title.textContent = `${book.title} by ${book.author}`

//         const borrowStatus = document.createElement('p');
//         borrowStatus.className = 'status';
//         borrowStatus.textContent = `is borrowed: ${book.isBorrowed}`

//         const borrowButton = document.createElement('button');
//         borrowButton.textContent = "Borrow";
//         borrowButton.id = `borrowButton-${index}`;
//         borrowButton.className = "borrowButton";
//         borrowButton.disabled = book.isBorrowed;
//         borrowButton.addEventListener('click', ()=> {
//             borrowBook(index);
//         })

//         const returnButton = document.createElement('button');
//         returnButton.textContent = "Return";
//         returnButton.id = `returnButton-${index}`;
//         returnButton.className = "returnButton";
//         returnButton.disabled = !book.isBorrowed;
//         returnButton.addEventListener('click', ()=> {
//             returnBook(index);
//         })

//         bookDiv.appendChild(title);
//         bookDiv.appendChild(borrowStatus);
//         bookDiv.appendChild(borrowButton);
//         bookDiv.appendChild(returnButton);

//         bookGrid.appendChild(bookDiv)
//     })
// }

// const borrowBook = (index: number):void => {
//     book[index].isBorrowed = true;
//     renderBooks();
// }


// const returnBook = (index: number):void => {
//     book[index].isBorrowed = false;
//     renderBooks();
// }

// document.addEventListener('DOMContentLoaded', ()=> {
//     renderBooks();
// })


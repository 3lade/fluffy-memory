var book = [
    { title: "1984", author: "George Orwell", isBorrowed: false },
    { title: "To kill a Mockingbird", author: "Harper Lee", isBorrowed: false },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isBorrowed: false },
];
var bookGrid = document.getElementById('bookGrid');
function renderBooks() {
    bookGrid.innerHTML = '';
    book.forEach(function (book, index) {
        var bookDiv = document.createElement('div');
        bookDiv.className = "book";
        var title = document.createElement('h3');
        title.textContent = "".concat(book.title, " by ").concat(book.author);
        var borrowStatus = document.createElement('p');
        borrowStatus.className = 'status';
        borrowStatus.textContent = "is borrowed: ".concat(book.isBorrowed);
        var borrowButton = document.createElement('button');
        borrowButton.textContent = "Borrow";
        borrowButton.id = "borrowButton-".concat(index);
        borrowButton.className = "borrowButton";
        borrowButton.disabled = book.isBorrowed;
        borrowButton.addEventListener('click', function () {
            borrowBook(index);
        });
        var returnButton = document.createElement('button');
        returnButton.textContent = "Return";
        returnButton.id = "returnButton-".concat(index);
        returnButton.className = "returnButton";
        returnButton.disabled = !book.isBorrowed;
        returnButton.addEventListener('click', function () {
            returnBook(index);
        });
        bookDiv.appendChild(title);
        bookDiv.appendChild(borrowStatus);
        bookDiv.appendChild(borrowButton);
        bookDiv.appendChild(returnButton);
        bookGrid.appendChild(bookDiv);
    });
}
var borrowBook = function (index) {
    book[index].isBorrowed = true;
    renderBooks();
};
var returnBook = function (index) {
    book[index].isBorrowed = false;
    renderBooks();
};
document.addEventListener('DOMContentLoaded', function () {
    renderBooks();
});

document.addEventListener("DOMContentLoaded", () => {
        const searchInput=document.getElementById('search-input');
        const message=document.getElementById('message');
        const bookList=document.getElementById('book-list');

        searchInput.addEventListener('input', (e) => {
            const searchTerm=e.target.value.toLowerCase();
            const filteredItems=books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm)
            );

            bookList.innerHTML='';

            if(filteredItems.length===0) {
                message.textContent='No books found.';
                return;
            }
            else {
                message.textContent='';
            }
            //use forEach and array instead of map
            filteredItems.forEach((item) => 
            {
                const bookDiv = document.createElement('div');
                bookDiv.className='book'
                bookDiv.innerHTML=`
                    <h3>${item.title}</h3>
                    <p><strong>Author:</strong> ${item.author}</p>
                    <p><strong>Year:</strong> ${item.year}</p>
                    <p><strong>Genre:</strong> ${item.genre}</p>
                `;
                bookList.appendChild(bookDiv);
            });
        });


    })
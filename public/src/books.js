// helper function
function findById(arr, id) {
  return arr.find(arrId => arrId["id"] === id)
} 

function findAuthorById(authors, id) {
  return findById(authors, id)
}

function findBookById(books, id) {
  return findById(books, id)
}

function partitionBooksByBorrowedStatus(books) {
  let returned = []
  let borrowed = []
  books.forEach(book => {
    borrows = book.borrows
    borrows[0].returned ? returned.push(book) : borrowed.push(book)
    })
  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) {
  // get IDs from borrows for each book
  const borrows = book.borrows
  let borrowId = []
  let accts = []
  let accountIndex = null
  borrows.forEach(borrow => borrowId.push(borrow.id))

  // find account associated with ID
  accounts.forEach(account => {
    if (borrowId.includes(account.id)) {
      accountIndex = borrowId.indexOf(account.id);
      accts.push(account)
      account.returned = borrows[accountIndex].returned
    }
  })
  
  return accts.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

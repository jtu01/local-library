function findAccountById(accounts, id) {
  return accounts.find(accountId => accountId["id"] === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acctA, acctB) => acctA.name.last > acctB.name.last ? 1 : -1)
}

function numberOfBorrows(account, books) {
  let id = account.id
  let count = 0
  books.forEach(book => {
    borrowed = book["borrows"];
    borrowed.forEach(obj => {if (obj["id"] === id) {count++}})
    })
  return count
}

function getBooksPossessedByAccount(account, books, authors) {
  // initial variables
  let id = account.id
  let bookArray = null
  let isArray = false

  // get array of books that are checked out
  filtered = books.forEach(book => {
    borrowed = book["borrows"];
    borrowedFilter = borrowed.filter(obj => obj["id"] === id && obj["returned"] === false);
    if (borrowedFilter.length > 0) {
      if (!isArray) {
        bookArray = [book]
        isArray = true
      }
      else {
        bookArray.push(book)
      }
    }
    })
  
  // add author object to each book in bookArray
  for (book in bookArray) {
    bookArray[book].author = authors.find(author => author.id === bookArray[book].authorId)
  }

  return bookArray
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};

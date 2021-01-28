function totalBooksCount(books) {
  return books.length
}

function totalAccountsCount(accounts) {
  return accounts.length
}

function booksBorrowedCount(books) {
  borrowed = books.filter(book => (book.borrows)[0].returned === false)
  return borrowed.length
}

function getMostCommonGenres(books) {
  // get list of genres
  let genreList = []
  books.forEach(book => genreList.push(book.genre))

  // reduce list of genres and get count
  let countedGenres = genreList.reduce(function (genres, genre) {
    if (genre in genres) {
      genres[genre]++
    } else {
      genres[genre] = 1
    }
    return genres
  }, {})

  // properly format output with name/count keys
  let results = []
  for (item in countedGenres) {
    genreObj = {}
    genreObj["name"] = item
    genreObj["count"] = countedGenres[item]
    results.push(genreObj)
  }

  // sort results and slice to 5 
  sortedResults = results.sort(function(genreA, genreB) {return genreB.count - genreA.count});
  return sortedResults.slice(0, 5)
}

function getMostPopularBooks(books) {
  // get list of books
  let results = []
  books.forEach(book => {
    bookBorrows = {}
    bookBorrows["name"] = book.title
    bookBorrows["count"] = book.borrows.length
    results.push(bookBorrows)});

  // sort list and slice to 5
  sortedResults = results.sort(function(idA, idB) {return idB.count - idA.count});
  return sortedResults.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  // populate array of authors and use id as reference
  let results = []
  authors.forEach(author => {
    authorName = {}
    authorName["name"] = `${author["name"].first} ${author["name"].last}`
    authorName["count"] = 0
    authorName["id"] = author.id
    results.push(authorName)
  })

  // get count
  books.forEach(book => {
    borrowed = book.borrows.length
    findId = results.find(result => result.id === book.authorId)
    findId.count += borrowed
  })

  // remove id as reference
  results.forEach(result => delete result.id)
  
  // sort results and slice to 5
  sortedResults = results.sort(function(authorA, authorB) {return authorB.count - authorA.count});
  return sortedResults.slice(0, 5)
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

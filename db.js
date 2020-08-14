const fs = require('fs');

const saveBooks = (books) => {
  const dataJSON = JSON.stringify(books);
  fs.writeFileSync('books.json', dataJSON);
};

const loadBooks = () => {
  try {
    const dataBuffer = fs.readFileSync('books.json');
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  saveBooks,
  loadBooks,
};

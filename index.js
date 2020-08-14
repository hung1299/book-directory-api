const express = require('express');
const books = require('./books');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/books', books);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const Book = require("../models/Book.model");

exports.getBook = (req, res, next) => {
  try {
    const book = Book.getAll();
    if (!book) return res.status(404).json({ error: "Book non trouvé" });
    return res.status(200).json(book);
  } catch (e) {
    next(e);
  }
};

exports.createBook = (req, res, next) => {
  try {
    const { title, author, available } = req.body;
    if (
      title === undefined ||
      author === undefined ||
      available === undefined
    ) {
      return res
        .status(400)
        .json({ error: "title, author et available (booolean) sont requis" });
    }
    const created = Book.create({ title, author, available });
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

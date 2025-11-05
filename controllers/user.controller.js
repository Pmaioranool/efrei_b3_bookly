const User = require("../models/User.model");

exports.getUser = (req, res, next) => {
  try {
    const user = User.getAll();
    if (!user) return res.status(404).json({ error: "User non trouvé" });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (name === undefined || email === undefined) {
      return res.status(400).json({ error: "name et emailsont requis" });
    }
    const created = User.create({ title, author, available });
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

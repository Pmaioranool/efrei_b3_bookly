const User = require("../models/User.model");

exports.getUser = async (req, res, next) => {
  try {
    let user = await User.getAll();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (name === undefined || email === undefined) {
      return res.status(400).json({ error: "name et email sont requis" });
    }
    const created = await User.create(req.body);
    console.log(created);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

const Profile = require("../models/Profile.model");

exports.getProfile = (req, res, next) => {
  try {
    const profile = Profile.getById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile non trouvé" });
    return res.status(200).json(profile);
  } catch (e) {
    next(e);
  }
};

exports.createProfile = (req, res, next) => {
  try {
    const { preferences, history } = req.body;
    if (preferences === undefined || history === undefined) {
      return res
        .status(400)
        .json({ error: "preferences et history sont requis" });
    }
    const created = Profile.create({ preferences, history });
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

exports.updateProfile = (req, res, next) => {
  try {
    const updated = Profile.updateOne(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: "Profile non trouvé" });
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

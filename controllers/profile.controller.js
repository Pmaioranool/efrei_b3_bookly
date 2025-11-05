const Profile = require("../models/Profile.model");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.getById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile non trouvé" });
    return res.status(200).json(profile);
  } catch (e) {
    next(e);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const { preferences, history } = req.body;
    if (preferences === undefined || history === undefined) {
      return res
        .status(400)
        .json({ error: "preferences et history sont requis" });
    }
    const created = await Profile.create(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updated = await Profile.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Profile non trouvé" });
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

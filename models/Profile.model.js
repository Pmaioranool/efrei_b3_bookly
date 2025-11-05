const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    preferences: {
      favoriteGenres: [String],
      favoriteAuthors: [String],
    },
    history: [
      {
        bookId: {
          type: Number,
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        readDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    _id: false,
  }
);

const ProfileModel = mongoose.model("Profile", profileSchema);

class Profile {
  static async create({ preferences = {}, history = [] }) {
    const doc = await ProfileModel.create({ preferences, history });
    return doc.toObject();
  }

  static async getAll() {
    return await ProfileModel.find().lean();
  }

  static async getById(id) {
    return await ProfileModel.findById(id).lean();
  }

  static async update(id, fields = {}) {
    if (Object.keys(fields).length === 0) return this.getById(id);
    return await ProfileModel.findByIdAndUpdate(id, fields, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async deleteById(id) {
    await ProfileModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}

module.exports = Profile;

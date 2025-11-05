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

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

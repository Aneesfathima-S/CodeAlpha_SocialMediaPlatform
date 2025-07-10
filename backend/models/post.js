const mongoose = require('mongoose');
module.exports = mongoose.model('Post', new mongoose.Schema({
  user: String,
  content: String,
  likes: [String],
  comments: [{ user: String, text: String }],
  createdAt: { type: Date, default: Date.now }
}));

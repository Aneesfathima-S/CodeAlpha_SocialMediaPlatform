const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/user');
const Post = require('./models/post');

app.post('/api/register', async (req, res) => {
  const user = await new User(req.body).save();
  res.json(user);
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/posts', async (req, res) => {
  const post = await new Post(req.body).save();
  res.json(post);
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post('/api/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.user)) post.likes.push(req.body.user);
  await post.save();
  res.json(post);
});

app.post('/api/posts/:id/comment', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.body.user, text: req.body.text });
  await post.save();
  res.json(post);
});

app.listen(5000, () => console.log('🟢 Server running at http://localhost:5000'));

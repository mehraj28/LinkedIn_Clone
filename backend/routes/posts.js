const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { text, image } = req.body;
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({ author: user.id, text, image: image || '' });
    await newPost.save();
    await newPost.populate('author', 'name avatarUrl');
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts (feed)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('author','name avatarUrl').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Edit post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    if(post.author.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    post.text = req.body.text ?? post.text;
    post.image = req.body.image ?? post.image;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    if(post.author.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like/unlike
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    const idx = post.likes.indexOf(req.user.id);
    if(idx === -1) post.likes.push(req.user.id);
    else post.likes.splice(idx,1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Comment
router.post('/comment/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    const comment = { author: req.user.id, text: req.body.text };
    post.comments.unshift(comment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const router = require('express').Router();
// const sequelize = require('../config/connection');
const withAuth = require('../utils/auth.js')
const {
    User,
    Post,
    Comment
} = require('../models');


// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [    
        {
          model: User,
          attributes: [
            'username',
          ],
        },
      ],
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the post
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          required: false,
          attributes: [
            'comment_text', 'created_at'
          ],
          include: [{
            model: User,
            required: false,
            attributes: [
              'username',
            ],
          },],
        },
        {
          model: User,
          attributes: [
            'username',
          ],
        },
      ],
    });
    const post = dbPostData.get({ plain: true });

    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/dashboard', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the post
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: Comment,
          required: false,
          attributes: [
            'comment_text',
          ],
        },
        {
          model: User,
          attributes: [
            'username',
          ],
        },
      ],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/dashboard/new', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the post
  try {

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      newPost: true,
      editPost: false
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/dashboard/edit', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the post
  try {

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      newPost: false,
      editPost: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/dashpost/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the post
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username',
          ],
        },
      ],
    });
    const post = dbPostData.get({ plain: true });

    res.render('dashboard', {
      post, loggedIn: req.session.loggedIn, newPost: false,
      editPost: true, id: req.params.id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
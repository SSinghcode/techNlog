const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
// const withAuth = require('../../utils/auth');


  // create a new post
  router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
          comment_text: req.body.comment_text,
          blog_id: req.body.blogid,
          user_id: req.session.user_id
        });
        res.status(200).json(commentData);
      } catch (err) {
        res.status(400).json(err);
      }
    });


  // update a post
  router.put('/:id', async (req, res) => {
    try {
      const commentData = await Comment.update({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id
      },
        { where: { id: req.params.id } });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // delete a post
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ======================

router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: [
              'username',
              'created_at',
            ],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// ======================


// Find one post
router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: [
              'title',
            ],
          },
          {
            model: User,
            attributes: [
              'username',
              'created_at',
            ],
          },
        ],
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;
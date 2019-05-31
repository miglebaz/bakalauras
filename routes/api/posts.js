const express = require('express');
const router = express.Router();

const passport = require('passport');


const Post = require('../../models/Post');

const Profile = require('../../models/Profile');

// Validation
const validateUsersPostInput = require('../../validation/post');


// api/posts
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

//  api/posts/:id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

//POST api/posts
  // If any warnings, send 400 with warnings object
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { warnings, isValid } = validateUsersPostInput(req.body);

    if (!isValid) {
    
      return res.status(400).json(warnings);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      userType: req.body.userType,
      user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
  }
);

//  DELETE api/posts/:id

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {  // WHAT user's post
            return res
              .status(401)
              .json({ notauthorized: 'Vartotojas yra neprisiregistravęs' });
          }
          post.remove().then(() => res.json({ success: true })); // remove post
        })
        .catch(err => res.status(404).json({ postnotfound: 'Skelbimas nerastas' }));
    });
  }
);


router.post( // api/posts/like/:id 
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          post.likes.unshift({ user: req.user.id }); // add id of user to (likes)array 

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Skelbimas nerastas' }));
    });
  }
);


router.post( //  api/posts/unlike/:id
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'Dar nepamėgtas skelbimas' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { warnings, isValid } = validateUsersPostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any warnings, send 400 with warnings object
      return res.status(400).json(warnings);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// api/posts/comment/:id/:comment_id

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
    
        post.comments.splice(removeIndex, 1); // Remove comment
// save new 
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;

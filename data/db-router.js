const router = require("express").Router();

const Posts = require("./db");
// const Comments = require("./db");

// ******* POSTS ******* //

// 3. GET POSTS
router.get("/", (req, res) => {
  Posts.find(res.query)
    .then(posts => {
      res.status(200).json(posts);
    })

    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

// 1. POST POSTS

router.post("/", (req, res) => {
  // const { title , contents } = req.body
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(404).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(postInfo)
      .then(posts => {
        console.log(`Post Created`, posts);
        res.status(201).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

// ******* COMMENTS ******* //

// 2. GET COMMENTS

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;

  if ((!id, req.body)) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    Comments.insert(req.body)
      .then(comments => {
        console.log(`Comment Posted`, comments);
        res.status.json(comments);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

// 4. GET POSTS by id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    Posts.findById(id).then(posts => {
      res.status(200).json(posts);
    });
  }
});

// #5 Get Comments

router.get("/:id/comments", (req, res) => {
  // const getComments = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    Posts.findCommentById(id).then(posts => {
      res.status(200).json(posts);
    });
  }
});

// #6

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    Posts.remove(id).then(post => {
      res.status(200).json({
        message: `user with id deleted`,
        post
      });
    });
  }
});

// #7

module.exports = router;

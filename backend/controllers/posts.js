const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  let range = req.query.dateRange;
  let currentDate = req.query.currDate;
  if (range) {
    let presentDate = new Date(currentDate);
    let returnPosts = [];
    //I guess a switch statement would have worked too --> does
    //it make a performance difference?
    if (range === "Past week") {
      let weekAgo = new Date();
      weekAgo.setTime(Math.abs(currentDate - 604800000));
      Post.find().forEach(function(currPost) {
        if (currPost.date > weekAgo) {
          returnPosts.push(currPost);
        }
      })

    } else if (range === "Past month") {
      let monthAgo = new Date();
      monthAgo.setTime(Math.abs(currentDate - (4 * 604800000)));
      Post.find().forEach(function(currPost) {
        if (currPost.date > monthAgo) {
          returnPosts.push(currPost);
        }
      })

    } else if (range === "Past year") {
      let yearAgo = new Date();
      yearAgo.setTime(Math.abs(currentDate - (52 * 604800000)));
      Post.find().forEach(function(currPost) {
        if (currPost.date > yearAgo) {
          returnPosts.push(currPost);
        }
      })

    } else if (range === "Ancient times") {
      let longTimeAgo = new Date();
      longTimeAgo.setTime(Math.abs(currentDate - (520 * 604800000)));
      Post.find().forEach(function(currPost) {
        if (currPost.date > longTimeAgo) {
          returnPosts.push(currPost);
        }
      })
    }
    res.send(returnPosts);
  } else {
    Post.find()
      .populate('comments')
      .sort('-createdAt')
      .then(posts => {
        res.locals.data = { posts }
        res.locals.status = 200
        return next()
      })
      .catch(err => {
        console.error(err)
        res.locals.error = { error: err.message }
        return next()
      })
  }
}

module.exports.get = (req, res, next) => {
  Post.findById(req.params.id)
    .populate('comments')
    .then(post => {
      res.locals.data = { post }
      res.locals.status = post === null ? 404 : 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.errors = { error: err.message }
      return next()
    })
}

module.exports.store = (req, res, next) => {
  const newPost = new Post(req.body)
  newPost
    .save()
    .then(post => {
      res.locals.data = { post }
      res.locals.status = 201
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      res.locals.status = 400
      return next()
    })
}

module.exports.test = (req, res, next) => {
  let testDate = new Date(req.body.createdAt);
  let testTitle = "Test Title";
  let testText = "Test text 123";
  let testAuthor = "Test Author";
  let newPost = new Post({
    author: testAuthor,
    title: testTitle,
    text: testText,
    createdAt: testDate.toISOString()
  });
  newPost.save();
  res.send(newPost);
}

module.exports.update = (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  })
    .then(post => {
      res.locals.data = { post }
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      res.locals.status = 400
      return next()
    })
}

module.exports.delete = (req, res, next) => {
  Post.findByIdAndCascadeDelete({ _id: req.params.id })
    .then(_ => {
      res.locals.data = { deleted: 'Success' }
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      res.locals.status = 400
      return next()
    })
}

module.exports.comment = (req, res, next) => {
  Post.findByIdAndAddComment(req.params.id, req.body)
    .then(post => {
      res.locals.data = { post }
      res.locals.status = 201
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      res.locals.status = 400
      return next()
    })
}

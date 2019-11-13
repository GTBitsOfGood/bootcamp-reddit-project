const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  let curr = new Date(req.query.currDate)
  let start = new Date()
  if (req.query.dateRange === "Past week") {
    start.setDate(curr.getDate() - 7)
    Post.find({"createdAt": {"$gte": start, "$lt": curr}})
    .populate("comments")
    .then(posts => {
      res.locals.data = { posts };
      res.locals.status = 200;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };
      return next();
    });
  }
  if (req.query.dateRange === "Past month") {
    start.setMonth(curr.getMonth() - 1)
    Post.find({"createdAt": {"$gte": start, "$lt": curr}})
    .populate("comments")
    .then(posts => {
      res.locals.data = { posts };
      res.locals.status = 200;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };
      return next();
    });
  }
  if (req.query.dateRange === "Past year") {
    start.setFullYear(curr.getFullYear() - 1)
    console.log(start)
    console.log(curr)
    Post.find({"createdAt": {"$gte": start, "$lt": curr}})
    .populate("comments")
    .then(posts => {
      res.locals.data = { posts };
      res.locals.status = 200;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };
      return next();
    });
  }
  if (req.query.dateRange === "A year ago") {
    start.setFullYear(curr.getFullYear() - 1)
    Post.find({"createdAt": {"$lt": start}})
    .populate("comments")
    .then(posts => {
      res.locals.data = { posts };
      res.locals.status = 200;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };
      return next();
    });
  }
  if (req.query.dateRange === "Ancient times") {
    start.setFullYear(curr.getFullYear() - 10)
    Post.find({"createdAt": {"$lt": start}})
    .populate("comments")
    .then(posts => {
      res.locals.data = { posts };
      res.locals.status = 200;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };
      return next();
    });
  }
  if (req.query.dateRange === undefined) {
    Post.find()
      .populate("comments")
      .then(posts => {
        res.locals.data = { posts };
        res.locals.status = 200;
        return next();
      })
      .catch(err => {
        console.error(err);
        res.locals.error = { error: err.message };
        return next();
      });
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

module.exports.dummy = (req, res, next) => {
  const createdAt = req.body.createdAt
  if (createdAt === undefined) {
    res.locals.error = {error: "Expected createdAt in body"}
    res.locals.status = 400
    return next();
  }


  const dummyPost = new Post({
    author: "Santa",
    title: "Good List",
    text: "Bootcamper"
  });

  dummyPost.save().then(post => {
    let createdAtDate = new Date(createdAt)
    post.createdAt = createdAtDate.toISOString();
    return post.save();
  })
  .then(post => {
    res.locals.data = {post};
    res.locals.status = 201;
    return next();
  })
  .catch(error => {
    res.locals.error = {error: error.message};
    res.locals.status = 400;
    return next();
  })
}

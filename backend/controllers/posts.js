const { Post } = require('../models')

module.exports.index = (req, res, next) => {


  if (req.query.dateRange != undefined) {
    console.log(req.query.dateRange);
    console.log(req.query.currDate);
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

//This is for the date
module.exports.dummy = (req, res, next) => {

  const createdAt = req.body.createdAt;
  if (createdAt === undefined) {
    res.locals.error = { error: "Expected createdAt in body" }  
    res.locals.status = 400;
    return next();
  }

  //Have a check to make sure date passed in is valid!


  const dummyPost = new Post({
    author: "Taylor",
    title: "Dummy Title",
    text: "Random Text"
  });

  dummyPost.save().then(post => {
    let createdAtDate = new Date(createdAt);
    post.createdAt = createdAtDate.toISOString();
    console.log(post.createdAt);
    return post.save();
  }).then(post => {
    res.locals.data = { post };
    res.locals.status = 201;
    return next();
  }).catch(error => {
    res.locals.error = { error: error.message };
    res.locals.status = 400;
    return next();
  })
}
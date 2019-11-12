const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  if (req.query.dateRange != undefined) {
    let dateRange = req.query.dateRange
    let oldest = new Date(req.query.currDate)
    let newest = new Date(req.query.currDate)
    if (dateRange == 'Past week') {
      oldest = oldest.setDate(oldest.getDate() - 7)
    } else if (dateRange == 'Past month') {
      oldest = oldest.setMonth(oldest.getMonth() - 1)
    } else if (dateRange == 'Past year') {
      oldest = oldest.setFullYear(oldest.getFullYear() - 1)
    } else if (dateRange == 'A year ago') {
      newest = newest.setFullYear(newest.getFullYear() - 1)
      oldest = oldest.setFullYear(oldest.getFullYear() - 10)
    } else if (dateRange == 'Ancient times') {
      console.log("right range")
      newest = newest.setFullYear(newest.getFullYear() - 10)
      oldest = oldest.setFullYear(0)
    }
    Post.find({createdAt: {'$lte': newest, '$gte': oldest}})
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

  } else {
    console.log("wrong logic")
    Post.find()
      .populate('comments')
      .sort('-createdAt')
      .then(posts => {
        res.locals.data = { posts }
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

module.exports.posted = (req, res, next) => {
  let date = new Date(req.body.createdAt)

  let post = new Post({
    author: "Brandon",
    text: "Do crabs think fish can fly?",
    title: "Stay Woke",
    createdAt: date.toISOString(),
  })
  post
  .save()
  .then(post => {
    res.locals.data = { post };
    res.locals.status = 201;
    return next();
  })
  .catch(err => {
    console.error(err);
    res.locals.error = { error: err.message };
    res.locals.status = 400;
    return next();
  });
}
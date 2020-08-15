const { Post } = require('../models')

module.exports.add = (req, res, next) => {
  let date = new Date(req.body.date)
  // Verifies an object was passed in with the request
  if (typeof(req.body) !== "object") {
    res.locals.error = { error: "Must include a date" }
    res.locals.status = 400
    return next()
  }
  // Verifies the object is a valid date object
  if (date == "Invalid Date") {
    res.locals.error = { error: "Invalid date"}
    res.locals.status = 400
    return next()
  } else {
    date = new Date(req.body.date)
  }
  // Creates a post with this valid date object
  const myPost = new Post({
    author: "Jack DiMarco",
    title: "Test title",
    text: "Test text",
    createdAt: date.toISOString()
  })
  myPost
    .save()
    .then(myPost => {
      res.locals.data = {myPost}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
}

module.exports.index = (req, res, next) => {
  // Makes sure a data filter is passed in through a query
  if (req.query.dateFilter == undefined) {
    res.locals.error = { error: "Date range cannot be undefined" }
    res.locals.status = 400
    return next()
  } else {
    // Will return posts that are 10 years old or older
    if (req.query.dateFilter == "Ancient times") {
      Post
      .find({createdAt: {$gte: req.query.currentDate.setFullYear(req.query.currentDate.getFullYear - 10)}})
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
      // Will return posts that are between 1 and 10 years old
    } else if (req.query.dateRange == "A year ago") {
      Post
      .find({createdAt: {$gte: req.query.currentDate.setFullYear(req.query.currentDate.getFullYear - 10),
        $lte: req.query.currentDate.setFullYear(req.query.currentDate.getFullYear - 1)}})
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
      // Will return any posts in the last 1 year
    } else if (req.query.dateRange == "Past year") {
      Post
      .find({createdAt: {$gte: req.query.currentDate.setFullYear(req.query.currentDate.getFullYear - 1)}})
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
      // Will return any posts in the last one month
    } else if (req.query.dateRange == "Past month") {
      Post
      .find({createdAt: {$gte: req.query.currentDate.setMonth(req.query.currentDate.getMonth - 1)}})
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
      // Will return posts in the last one week
    } else if (req.query.dateRange == "Past week") {
      Post
      .find({createdAt: {$gte: req.query.currentDate.setDate(req.query.currentDate.getDate - 7)}})
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

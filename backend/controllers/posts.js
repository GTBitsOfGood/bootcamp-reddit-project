const { Post } = require('../models')

module.exports.date = (req, res, next) => {
  const date = new Date(req.query.createdAt)
  const post = new Post({
    author: "zxczx",
    title: "zxczxc",
    text: "zxx",
    createdAt: date.toISOString()
  })
  post
    .save()
    .then(post => {
      res.locals.data = { post }
      res.locals.status = 201
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
}

module.exports.index = (req, res, next) => {
  // 1. Get date from client
  // 2. Find the target date by subtracting from current date
  // 3. Convert that date to ISO String
  // 4. Query it for all docs with strings >= target date
  // 5. Return it to the user 
  var dateFromClient = new Date(req.query.currDate)
  var dateRange = req.query.dateRange
  var targetDate = null
  if (dateRange == 'Past Week') {
    targetDate = (dateFromClient.setDate(dateFromClient.getDate() - 7))//.toISOString()
    Post
      .find({createdAt: {$gte: targetDate}})
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
  } else if (dateRange == 'Past Month') {
    targetDate = (dateFromClient.setMonth(dateFromClient.getMonth() - 1))//.toISOString()
    Post
      .find({createdAt: {$gte: targetDate}})
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
  } else if (dateRange == 'Past Year') {
    targetDate = (dateFromClient.setFullYear(dateFromClient.getFullYear() - 1))//.toISOString()
    Post
      .find({createdAt: {$gte: targetDate}})
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
  } else if (dateRange == 'A year ago') {
    targetDate = (dateFromClient.setFullYear(dateFromClient.getFullYear() - 1))//.toISOString()
    const minDate = (dateFromClient.setFullYear(dateFromClient.getFullYear() - 2))//.toISOString()
    Post
      .find({$and: [{createdAt: {$gte: minDate}}, {createdAt: {$lte: targetDate}}]})
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
  } else if (dateRange == 'Ancient times') {
    targetDate = (dateFromClient.setFullYear(dateFromClient.getFullYear() - 10))//.toISOString()
    Post
      .find({createdAt: {$lte: targetDate}})
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
    Post
      .find()
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
  // Post
  //   .find()
  //   .populate('comments')
  //   .sort('-createdAt')
  //   .then(posts => {
  //     res.locals.data = { posts }
  //     res.locals.status = 200
  //     return next()
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     res.locals.error = { error: err.message }
  //     return next()
  //   })
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


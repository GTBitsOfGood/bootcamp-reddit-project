const { Post } = require('../models')


module.exports.index = (req, res, next) => {
  currDate = new Date()
  dateRange = req.query.dateRange
  if (dateRange == 'Past week') {
    targetDate = currDate.setDate(currDate.getDate() - 7)
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
    }
    if (dateRange == 'Past month') {
      targetDate = (currDate.setDate(currDate.getDate()-30))
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
      } 
      if (dateRange == 'Past year') {
        targetDate = (currDate.setDate(currDate.getDate()-365))
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
        }    
        if (dateRange == 'A year ago') {
          targetDate = (currDate.setDate(currDate.getDate()-365))
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
          }
          if (dateRange == 'Ancient times') {
            targetDate = (currDate.setDate(currDate.getDate()-3650))
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

module.exports.dates = (req, res, next) => {
  let mydate = new Date("August 15, 1975")
  console.log(mydate.toISOString())
  let thePost = new Post({
    author: 'Harry Potter',
    text: 'Hi',
    title: 'New Post!',
    createdAt: mydate.toISOString()
  })
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

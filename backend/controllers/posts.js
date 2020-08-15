const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  const date = new Date(req.query.currDate)
  if (req.query.dateRange == 'Past week') {
    Post.find({createdAt: { '$lte': date, '$gte': new Date(date - 7 * 60 * 60 * 24 * 1000) }})
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

  if (req.query.dateRange == 'Past month') {
    Post.find({createdAt: { '$lte': date, '$gte': new Date(date - 31 * 60 * 60 * 24 * 1000) }})
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

  if (req.query.dateRange == 'Past year') {
    Post.find({createdAt: { '$lte': date, '$gte': new Date(date - 365 * 60 * 60 * 24 * 1000) }})
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

  if (req.query.dateRange == 'A year ago') {
    Post.find({createdAt: {'$lte': new Date(date - 365 * 60 * 60 * 24 * 1000), '$gte': new Date(date - 365 * 9 * 60 * 60 * 24 * 1000) }})
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

    if (req.query.dateRange == 'Ancient times') {
      Post.find({createdAt: {'$lte': new Date(date - 365 * 9 * 60 * 60 * 24 * 1000)}})
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

function dummyData(req, res, next) {
  const date = new Date(req)
  
  const newPost = new Post({    
    author: "YourWorstNightmare", 
    title: "What am I on", 
    text: "What is this website? I do not understand", 
    createdAt: date.toISOString()
  })
  newPost.save()
}

const data1 = dummyData("December 31, 2018")



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

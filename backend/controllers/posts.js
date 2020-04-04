const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  const dateRange = req.query.dateRange;
  const time = req.query.currDate;
  if (dateRange != undefined) {
    if (dateRange == 'Past week') {
      Post.find()
    .populate('comments')
    .sort('-createdAt')
    .then(posts => {

      const filtered = new Array();
      const curr = new Date(req.query.currDate);
      posts.forEach(element => {
        const days = (element.createdAt.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        if (Math.abs(Math.trunc(days)) <= 7) {
          filtered.push(element)
        }
      })
      posts = filtered
      res.locals.data = { posts}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
    } else if (dateRange == 'Past month') {
      Post.find()
    .populate('comments')
    .sort('-createdAt')
    .then(posts => {

      const filtered = new Array();
      const curr = new Date(req.query.currDate);
      posts.forEach(element => {
        const days = (element.createdAt.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        console.log(days + element.title)
        if (Math.abs(Math.trunc(days)) <= 30) {
          filtered.push(element)
        }
      })
      posts = filtered
      res.locals.data = { posts}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
      
    } else if (dateRange == 'Past year') {
      Post.find()
    .populate('comments')
    .sort('-createdAt')
    .then(posts => {

      const filtered = new Array();
      const curr = new Date(req.query.currDate);
      posts.forEach(element => {
        const days = (element.createdAt.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        if (Math.abs(Math.trunc(days)) <= 365) {
          filtered.push(element)
        }
      })
      posts = filtered
      res.locals.data = { posts}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
    } else if (dateRange =='A year ago') {
      Post.find()
    .populate('comments')
    .sort('-createdAt')
    .then(posts => {

      const filtered = new Array();
      const curr = new Date(req.query.currDate);
      posts.forEach(element => {
        const days = (element.createdAt.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        if (Math.abs(Math.trunc(days)) >= 365) {
          filtered.push(element)
        }
      })
      posts = filtered
      res.locals.data = { posts}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
    } else if (dateRange == 'Ancient times') {
      Post.find()
    .populate('comments')
    .sort('-createdAt')
    .then(posts => {

      const filtered = new Array();
      const curr = new Date(req.query.currDate);
      posts.forEach(element => {
        const days = (element.createdAt.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        if (Math.abs(Math.trunc(days)) >= 3650) {
          filtered.push(element)
        }
      })
      posts = filtered
      res.locals.data = { posts}
      res.locals.status = 200
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error: err.message }
      return next()
    })
    }
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

/*module.exports.testDate = (req, res, next) => {
  let params = {
    author: "Author",
    title: "Title",
    text: "Text",
    createdAt: req.body.createdAt,
  }
  
  const newPost = new Post(params)
  console.log((newPost.createdAt))
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
}*/

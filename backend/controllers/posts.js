const { Post } = require('../models')

module.exports.test = (req, res, next) => {
    const date = new Date(req.query.currDate)
    const newPost = new Post({    
        author: "Smeggy", 
        title: "I’m tweaking", 
        text: "Seattle is lit except for the Corona", 
        createdAt: date.toISOString()
      })
      newPost
        .save()
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

module.exports.index = (req, res, next) => {
  const current = new Date(!req.query.current ? new Date().toISOString() : req.query.current);

  var range = {
    "createdAt" : {
      "$lt" : current
    }
  }

  const gteDate = new Date();
  switch(req.query.dateRange) {
    case "Past week":
      gteDate.setDate(current.getDate() - 7);
      range.createdAt.$gte = gteDate;
      break;
    case "Past month":
      gteDate.setDate(current.getDate() - 31);
      range.createdAt.$gte = gteDate;
      break;
    case "Past year":
      gteDate.setDate(current.getDate() - 365);
      range.createdAt.$gte = gteDate;
      break;
    case "A year ago":
      gteDate.setDate(current.getDate() - 365);
      range.createdAt.$lt = gteDate;
      break;
    case "Ancient times":
      gteDate.setDate(current.getDate() - (365 * 10));
      range.createdAt.$lt = gteDate;
      break;
    default:
      break;
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

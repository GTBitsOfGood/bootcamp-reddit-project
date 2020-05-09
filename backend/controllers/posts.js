const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  const CurrDate = new Date(!req.query.currDate ? new Date().toISOString() : req.query.currDate);

  var range = {
    "createdAt" : {
      "$lt" : currDate
    }
  }
  const gteDate = new Date();
  switch (req.query.dateRange) {
    case "Past Week":
      gteDate.setDate(currDate.gteDate() - 7);
      range.createdAt.$gte = gteDate;
      break;
    case "Past Month":
      gteDate.setDate(currDate.gteDate() - 31);
      range.createdAt.$gte = gteDate;
      break;
    case "Past Year":
      gteDate.setDate(currDate.gteDate() - 365);
      range.createdAt.$gte = gteDate;
      break;
    case "A Year Ago":
      gteDate.setDate(currDate.gteDate() - 365);
      range.createdAt.$lt = gteDate;
      break;
    case "Ancient Times":
      gteDate.setDate(currDate.gteDate() - (365 * 10));
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

module.exports.test = (req, res, next) => {
  const date = new Date(req.params.date);
  const newPost = new Post({    
    author: "Neha", 
    title: "COVID-19", 
    text: "I hate quarantine", 
    createdAt: date.toISOString()
  })
  newPost
    .save()
    .then(post => {
      res.locals.data = { post }
      res.locals.status = 201
      return next()
    })
    .catch(err => {
      console.error(err)
      res.locals.error = { error : err.message }
      res.locals.status  = 400
      return next()
    })
}
}
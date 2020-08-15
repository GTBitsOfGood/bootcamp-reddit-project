const { Post } = require('../models')

module.exports.index = (req, res, next) => {

  const dateRange = req.query.dateRange;
  var currDate = null;
  if (!req.query.currDate) currDate = new Date().toISOString();
  else currDate = new Date(req.query.currDate);

  var range = {
    "createdAt": {
      "$lt": currDate
    }
  }

  var rDate = new Date();


  if (dateRange) {
    switch(dateRange) {
      case "Past week":
        rDate = currDate.getDate() - 7;
        range.createdAt.$gte = rDate;
        break;

      case "Past Month":
        rDate = currDate;
        rDate.setMonth(rDate.getMonth() - 1);
        range.createdAt.$gte = rDate;
        break;

      case "Past Year":
        rDate = currDate;
        rDate.setMonth(rDate.getMonth() - 1);
        range.createdAt.$gte = rDate;
        break;

      case "A year ago":
        rDate = currDate;
        rDate.setFullYear(currDate.getFullYear() - 1);
        range.createdAt.$lt = rDate;
        break;

      case "Ancient times":
        rDate = currDate;
        rDate.setFullYear(currDate.getFullYear() - 10);
        range.createdAt.$lt = rDate;
        break;
    }

    Post.find(range)
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
  //  else {

  //   Post.find()
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

  // }

}

module.exports.test = (req, res, next) => {
  const newPostDate = new Date(req.params.newPostDate);
  const newPost = new Post({
    "author": "Brockhampton",
    "title": "sugar",
    "text": "remix",
    "createdAt": newPostDate.toISOString()
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
      res.locals.error = { error: err.message }
      res.locals.status = 400
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
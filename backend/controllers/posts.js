const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  const dateRange = req.query.dateRange;
  const currDate = new Date(req.query.currDate);
  if(dateRange != undefined) {
    if(dateRange === "Past week") {
      query = {
        "createdAt" : {
          $lt: currDate, 
          $gte: new Date(currDate.getTime() - (7 * 24 * 60 * 60 * 1000))
        }
      }
    } else if (dateRange === "Past month") {
      query = {
        "createdAt" : {
          $lt: currDate, 
          $gte: new Date(currDate.getTime() - (31 * 24 * 60 * 60 * 1000))
        }
      }
    } else if (dateRange === "Past year") {
      query = {
        "createdAt" : {
          $lt: currDate, 
          $gte: new Date(currDate.getTime() - (366 * 24 * 60 * 60 * 1000))
        }
      }
    } else if (dateRange === "A year ago") {
      query = {
        "createdAt" : {
          $lte: new Date(currDate.getTime() - (365 * 24 * 60 * 60 * 1000))
        }
      }
    } else if (dateRange === "Ancient times") {
      query = {
        "createdAt" : {
          $lte: new Date(currDate.getTime() - (3650 * 24 * 60 * 60 * 1000))
        }
      }
    }
    Post.find(query)
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

module.exports.dummyPost = (req, res, next) => {
  newDate = new Date(req.body.date);
  const newPost = new Post(req.body);
  newPost.createdAt = newDate;
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

module.exports.dummyExample = (req, res, next) => {
  const createdAt = req.body.createdAt;
  if (createdAt === undefined) {
    res.locals.error = {error: "Expected createdAt in body"}
    res.locals.status = 400;
    return next();
  }
  //TODO: Have a check to make sure the date passed in is valid
  const dummyPost = new Post({
    author: "Unown",
    title: "Good List",
    text: "Bootcampers"
  });
  dummyPost.save().then(post => {
    let createdAtDate = new Date(createdAt);
    post.createdAt = createdAtDate;
    return post.save();
  })
  .then(post => {
    res.locals.data = { post };
    res.locals.status = 201;
    return next();
  })
  .catch(err => {
    console.error(err)
    res.locals.error = { error: err.message }
    res.locals.status = 400
    return next()
  })

}
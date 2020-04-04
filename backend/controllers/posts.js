const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  let dateRange = req.query.dateRange;

  if (dateRange != undefined) {
    let currDate = new Date(req.query.currDate);
    let date = new Date(req.query.date);

    if (dateRange === "Past week") {
      date.setDate(currDate.getDate() - 7);

      Post.find({"createdAt": {"$gte": date, "$lt": currDate}})
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

    } else if (dateRange === "Past month") {
      date.setDate(currDate.getDate() - 31);

      Post.find({"createdAt": {"$gte": date, "$lt": currDate}})
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

    } else if (dateRange === "Past year") {
      date.setDate(currDate.getDate() - 365);

      Post.find({"createdAt": {"$gte": date, "$lt": currDate}})
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

    } else if (dateRange === "A year ago") {
      date.setDate(currDate.getDate() - 365);

      Post.find({"createdAt": {"$gte": date, "$lt": currDate}})
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

    } else { //ancient times
      date.setDate(currDate.getDate() - 3650);

      Post.find({"createdAt": {"$gte": date, "$lt": currDate}})
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
  } else { //if the given date range is undefined, do old stuff
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

//our test endpoint functionality
module.exports.test = (req, res, next) => {
  let date = new Date (req.body);
  
  let newPost = new Post({
    author: "Anand",
    title: "test post",
    text: "test text",
    createdAt: date.toISOString()
  });

  newPost
  .save()
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

const { Post } = require('../models')

module.exports.index = (req, res, next) => {

  if (req.query.dateRange != undefined) {
    if (req.query.dateRange === "Past week") {

      let newestDate = new Date(req.query.currDate);
      let oldestDate = new Date(req.query.currDate);
      oldestDate.setDate(newestDate.getDate() - 7);

      Post.find({createdAt: {$gte: oldestDate, $lte: newestDate}})
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

    } else if (req.query.dateRange === "Past month") {

      let currentDate = new Date(req.query.currDate);
      let monthAgo = new Date(req.query.currDate);
      monthAgo.setDate(0);
      console.log(monthAgo);
      console.log(currentDate);

      Post.find({createdAt: {$gte: monthAgo, $lte: currentDate}})
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

    } else if (req.query.dateRange === "Past year") {

      let currentDate = new Date(req.query.currDate);
      let yearAgo = new Date(req.query.currDate);
      yearAgo.setFullYear(currentDate.getFullYear() - 1);

      Post.find({createdAt: {$gte: yearAgo, $lte: currentDate}})
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



    } else if (req.query.dateRange === "A year ago") {

      let yearAgo = new Date(req.query.currDate);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);

      Post.find({createdAt: {$lte: yearAgo}})
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

    } else if (req.query.dateRange === "Ancient times") {

      let decadeAgo = new Date(req.query.currDate);
      decadeAgo.setFullYear(decadeAgo.getFullYear() - 10);

      Post.find({createdAt: {$lte: decadeAgo}})
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

//This is for the date
module.exports.dummy = (req, res, next) => {

  const createdAt = req.body.createdAt;
  if (createdAt === undefined) {
    res.locals.error = { error: "Expected createdAt in body" }  
    res.locals.status = 400;
    return next();
  }

  //Have a check to make sure date passed in is valid!


  const dummyPost = new Post({
    author: "Taylor",
    title: "Dummy Title",
    text: "Random Text"
  });

  dummyPost.save().then(post => {
    let createdAtDate = new Date(createdAt);
    post.createdAt = createdAtDate.toISOString();
    console.log(post.createdAt);
    return post.save();
  }).then(post => {
    res.locals.data = { post };
    res.locals.status = 201;
    return next();
  }).catch(error => {
    res.locals.error = { error: error.message };
    res.locals.status = 400;
    return next();
  })
}
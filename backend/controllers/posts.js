const { Post } = require('../models')

module.exports.index = (req, res, next) => {
  const userDateRange = req.query.dateRange; 
  let userCurrDate = new Date(req.query.currDate);

  /**
   * TODO
   * 
   * let oldDate = userCurrDate
   * let newDate = userCurrDate
   */
  let oldDate = new Date(req.query.currDate);
  let newDate = new Date(req.query.currDate);

  /**
   * TODO
   * 
   * A challenge for you :)
   * 
   * You don't need to copy & paste the same Post.find.... code snippet for each if & switch block!
   * I encourage you to try and find a way to use Post.find only once in this function.
   */

  if (userDateRange !== undefined) {
    switch (userDateRange) {
      case "Past week":
        oldDate.setDate(userCurrDate.getDate() - 7);
        Post.find({createdAt: {$gte: oldDate, $lte: userCurrDate }})
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
        break;
      case "Past month":
        /**
         * TODO
         * 
         * Look up the "MDN Date" on Google & see the Date.setMonth function :)
         */
        oldDate.setDate(userCurrDate.getDate() - 31);
        Post.find({createdAt: {$gte: oldDate, $lte: userCurrDate }})
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
        break;
      case "Past year":
        /**
         * TODO
         * 
         * Look up the "MDN Date" on Google & see the Date.setYear function :)
         */
        oldDate.setDate(userCurrDate.getDate() - 365);
        Post.find({createdAt: {$gte: oldDate, $lte: userCurrDate }})
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
        break;
      case "A year ago":
        /**
         * TODO
         * 
         * Look up the "MDN Date" on Google & see the Date.setYear function :)
         */
        oldDate.setDate(userCurrDate.getDate() - 3650);
        newDate.setDate(userCurrDate.getDate() - 365);
        Post.find({createdAt: {$gte: oldDate, $lte: newDate }})
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
        break;
      case "Ancient times":
        let oldestTime = new Date(0);
        /**
         * TODO
         * 
         * Look up the "MDN Date" on Google & see the Date.setYear function :)
         */
        newDate.setDate(userCurrDate.getDate() - 3650);
        Post.find({createdAt: {$gte: oldestTime, $lte: newDate }})
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
        break;
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

module.exports.test = (req, res, next) => {
  console.log("hello");

  /**
   * TODO
   * 
   * 1. input the date using the HTTP request *body* instead of query params
   * 
   * 2. How do you know that the client actually formatted their request correctly?
   *      Ideally you should look for the date first, & if its not there, tell the HTTP
   *      client that they gave you a bad request with a 400 Bad Request status code.
   * 
   * #2 above speaks to a more general principle: no matter what happens in your endpoint,
   * you want to always tell the client what went wrong so they're not left hanging!
   * If the client didn't include a date in their HTTP request, then your endpoint
   * would throw an error & they'd never know that they just formatted it wrong :(
   */
  const dateObject = new Date(req.query.date);
  console.log(req.query.date);
  
  const newPost = new Post({
    author: "Anand",
    title: "test post", 
    text: "test",
    createdAt: dateObject.toISOString()
  });

  newPost
    .save()
    .then(post => {
      res.locals.data = { post };
      res.locals.status = 201;
      return next()
    })
    .catch(err => {
      console.error(err);
      res.locals.error = { error: err.message };

      /**
       * TODO
       * 
       * 4XX status codes are for when the *client* messed up.
       * 
       * In this case, when your endpoint has an error, you'd
       * want to send a 5XX status code to tell them that you
       * (the server) messed up.
       */
      res.locals.status = 400;
      return next();
    })
    
}

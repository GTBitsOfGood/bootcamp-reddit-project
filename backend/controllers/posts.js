const { Post } = require("../models");

module.exports.index = (req, res, next) => {
  //const currDate = new Date().toISOString();
  //let minDate = new Date().toISOString();
  const currDate = new Date();
  let minDate = new Date();
  let maxDate = new Date();
  /*
  if (!req.query.currDate){
 currDate = new Date(req.query.currDate);
 let minDate = new Date(req.body.currDate);
  }
  else{
  currDate = new Date().toISOString();
  let minDate = new Date().toISOString();
  }
  */
  console.log(currDate);
  console.log(minDate);
  const dateRange = req.query.dateRange;
  console.log(dateRange);
  if (dateRange != undefined) {
    if (dateRange == "Past week") {
      minDate.setDate(currDate.getDate() - 7);
      Post.find({ createdAt: { $gte: minDate, $lt: currDate } })
        .populate("comments")
        .sort("-createdAt")
        .then((posts) => {
          res.locals.data = { posts };
          res.locals.status = 200;
          return next();
        })
        .catch((err) => {
          console.error(err);
          res.locals.error = { error: err.message };
          return next();
        });
    } else if (dateRange == "Past month") {
      minDate.setMonth(currDate.getMonth() - 1);
      Post.find({ createdAt: { $gte: minDate, $lt: currDate } })
        .populate("comments")
        .sort("-createdAt")
        .then((posts) => {
          res.locals.data = { posts };
          res.locals.status = 200;
          return next();
        })
        .catch((err) => {
          console.error(err);
          res.locals.error = { error: err.message };
          return next();
        });
    } else if (dateRange == "Past year") {
      minDate.setFullYear(currDate.getFullYear() - 1);
      Post.find({ createdAt: { $gte: minDate, $lt: currDate } })
        .populate("comments")
        .sort("-createdAt")
        .then((posts) => {
          res.locals.data = { posts };
          res.locals.status = 200;
          return next();
        })
        .catch((err) => {
          console.error(err);
          res.locals.error = { error: err.message };
          return next();
        });
    } else if (dateRange == "A year ago") {
      minDate.setFullYear(currDate.getFullYear() - 10);
      maxDate.setFullYear(currDate.getFullYear() - 1);
      Post.find({ createdAt: { $gte: minDate, $lt: maxDate } })
        .populate("comments")
        .sort("-createdAt")
        .then((posts) => {
          res.locals.data = { posts };
          res.locals.status = 200;
          return next();
        })
        .catch((err) => {
          console.error(err);
          res.locals.error = { error: err.message };
          return next();
        });
    } else if (dateRange == "Ancient times") {
      minDate.setFullYear(currDate.getFullYear() - 10);
      Post.find({ createdAt: { $lt: minDate } })
        .populate("comments")
        .sort("-createdAt")
        .then((posts) => {
          res.locals.data = { posts };
          res.locals.status = 200;
          return next();
        })
        .catch((err) => {
          console.error(err);
          res.locals.error = { error: err.message };
          return next();
        });
    }
  } else {
    Post.find()
      .populate("comments")
      .sort("-createdAt")
      .then((posts) => {
        res.locals.data = { posts };
        res.locals.status = 200;
        return next();
      })
      .catch((err) => {
        console.error(err);
        res.locals.error = { error: err.message };
        return next();
      });
  }
};

module.exports.get = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("comments")
    .then((post) => {
      res.locals.data = { post };
      res.locals.status = post === null ? 404 : 200;
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.locals.errors = { error: err.message };
      return next();
    });
};

module.exports.store = (req, res, next) => {
  const newPost = new Post(req.body);
  newPost
    .save()
    .then((post) => {
      res.locals.data = { post };
      res.locals.status = 201;
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.locals.error = { error: err.message };
      res.locals.status = 400;
      return next();
    });
};

module.exports.update = (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  })
    .then((post) => {
      res.locals.data = { post };
      res.locals.status = 200;
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.locals.error = { error: err.message };
      res.locals.status = 400;
      return next();
    });
};

module.exports.delete = (req, res, next) => {
  Post.findByIdAndCascadeDelete({ _id: req.params.id })
    .then((_) => {
      res.locals.data = { deleted: "Success" };
      res.locals.status = 200;
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.locals.error = { error: err.message };
      res.locals.status = 400;
      return next();
    });
};

module.exports.comment = (req, res, next) => {
  Post.findByIdAndAddComment(req.params.id, req.body)
    .then((post) => {
      res.locals.data = { post };
      res.locals.status = 201;
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.locals.error = { error: err.message };
      res.locals.status = 400;
      return next();
    });
};

const user1 = require("../../models/user1");

const userauth = async (req, res, next) => {
  try {
    res.locals.results = "none";
    const { username, password } = req.body;
    const results = await user1.findOne({ username });
    if (results) {
      res.locals.results = results;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userauth: userauth,
};

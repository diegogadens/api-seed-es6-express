exports.get = (req, res, next) => {
  res
    .status(200)
    .json({status:'OK'});
  return next();
};

function index(req, res) {
  res.status(200).end('<H1>Mock API - Home Page</H1>');
}

module.exports = { index };

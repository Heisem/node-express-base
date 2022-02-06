const Test = (req, res) => {
  console.log(req.query)
  return res.json({
    test: 'test'
  });
}

module.exports = {
  Test,
};


  exports.get = function (req, res){
    res.status(200).send({
      title: 'API SÉSAMO',
      version: '1.1.0'
    });
}

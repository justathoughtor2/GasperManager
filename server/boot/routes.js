module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('*', function(req, res) {
    //res.send('Hello world!');

    var formidable = require('formidable'),
      util = require('util');

    // Parse a file upload
    if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, field, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });
    }

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">' +
      '<input type="text" name="title" /><br />' +
      '<input type="submit" value="Upload" />' +
      '</form>'
    );
  });

  app.use(router);
}

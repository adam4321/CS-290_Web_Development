var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
}).listen(9513);

console.log('Server started on http://flip2.engr.oregonstate.edu:9513; press Ctrl-C to terminate....');

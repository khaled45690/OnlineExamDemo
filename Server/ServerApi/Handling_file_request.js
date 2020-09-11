// Handling required files requests----------------------------------->
var fs = require('fs');
module.exports = class Handling_file_request {

    required_file(req, res) {

        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var RS = fs.createReadStream(__dirname + '../../build/index.html')
            RS.pipe(res);
        }
        if (req.url.substring(0, 5) === "/sear") {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var RS = fs.createReadStream(__dirname + '../../build/index.html')
            RS.pipe(res);
            console.log(req.url.substring(0, 5));
            console.log(req.url.substring(5, req.url.length));
        }
        if (req.url.substring(0, 5) === "/anim") {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var RS = fs.createReadStream(__dirname + '../../build/index.html')
            RS.pipe(res);
            console.log(req.url.substring(0, 5));
            console.log(req.url.substring(5, req.url.length));
        }
        if (req.url.substring(0, 6) === "/video") {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var RS = fs.createReadStream(__dirname + '../../build/index.html')
            RS.pipe(res);
            console.log(req.url.substring(0, 5));
            console.log(req.url.substring(5, req.url.length));
        }
        if (req.url.split('.').pop() === 'css') {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            var RS = fs.createReadStream(__dirname + '../../build/' + req.url)
            RS.pipe(res);
        }

        if (req.url.split('.').pop() === 'js') {
            res.writeHead(200, { 'Content-Type': 'text/javascript  ' });
            var RS = fs.createReadStream(__dirname + '../../build/' + req.url)
            RS.pipe(res);
        }

        if (req.url.split('.').pop() === 'png') {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            var RS = fs.createReadStream(__dirname + '../../build/' + req.url)
            RS.pipe(res);
        }
        if (req.url.split('.').pop() === 'jpg') {
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            var RS = fs.createReadStream(__dirname + '../../build/' + req.url)
            RS.pipe(res);
        }
        if (req.url.split('.').pop() === 'gif') {
            res.writeHead(200, { 'Content-Type': 'image/gif' });
            var RS = fs.createReadStream(__dirname + '../../build/' + req.url)
            RS.pipe(res);
        }

    }
}

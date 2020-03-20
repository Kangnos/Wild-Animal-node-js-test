var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if (_url == '/') {
        title = 'Welcome';
        description = '한국 야생동물 협회'
    }
    if (_url == '/favicon.ico') {
        return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, `utf8`, function(err, description){
        var template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
            <body>
                <div>
                    <a href="/?id=고라니">고라니</a>
                    <a href="/?id=멧돼지">멧돼지</a>
                    <a href="/?id=너구리">너구리</a>
                    <a href="/?id=홈">홈</a>
                </div>
                
                <div><h1>${title}</h1></div>
                <p>${description}</p>
                
                <div>
                    <img src="img/${queryData.id}.jpg">
                </div>
            </body>
        </html>
        `
        response.end(template);
    })
    
});
app.listen(3000);
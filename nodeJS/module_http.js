const http = require('http');
const { parse } = require('querystring');

http.createServer((req, res) => {
    // if(req.method =="POST"){
    //     let body = '';
    //     req.on('data', (chunk) => {
    //         body += chunk.toString();
    //     });
    //     req.on('end', () => {
    //         let data = parse(body);
    //         console.log("Donnée envoyées à l'url :"+req.url);
    //         console.log(data);
    //         res.write("Données du formulaire : "+JSON.stringify(data));
    //         res.end();
    //     });
    // } else {
    //     res.write('Response HTTP par defaut');
    //     res.end();
    // }

    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("Page d'acceuil");
            res.end();
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("Page not found");
            res.end();
    }
}).listen(8080);



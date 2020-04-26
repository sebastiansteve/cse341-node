const http = require('http');
const fs = require('fs');
 
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const activityList = [];
    if (url === '/') {
       res.write('<html>');
       res.write('<head><title>Activities Page</title></head>');
       res.write('<body>');
       res.write('<h1>Please enter your favorite two activities</h1>');
       res.write('<form action="/add-activity" method="POST">');
       res.write('<input type="text" name="message"><br><br>');
       res.write('<input type="text" name="mess"><br><br>');
       res.write('<button type="submit">Submit</button></form>');
       res.write('</body>');
       res.write('</html>');
       return res.end();
    }
    if (url === '/add-activity' && method === 'POST') {
       const body = [];
       req.on('data', (info) => {
           body.push(info);
       });
       req.on('end',() => {
            var parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            parsedBody = parsedBody.split('&'); 
            activityList.push(parsedBody);
            console.log(activityList);
       })
       res.write('<html>');
       res.write('<head><title>Activities Page</title></head>');
       res.write('<body>');
       res.write('<h1>Possible Activities</h1>')
       res.write('<form action="/add-activity" method="POST">');
       res.write('<ol>');
       for (item of activityList) {
            res.write('<li>' + item + '</li>');
       }
       res.write('</ol>');
       res.write('Add activity<br>')
       res.write('<input type="text" name="message"><br>');
       res.write('<button type="submit">Submit</button></form>');
       res.write('</body>');
       res.write('</html>');
       return res.end();
    };
});
server.listen(3000);
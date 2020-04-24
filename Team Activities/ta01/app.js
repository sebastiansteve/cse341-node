const http = require('http');
const fs = require('fs');
 
const server = http.createServer((req, res) => {
   const url = req.url;
   const method = req.method;
   const activityList = ['Soccer', 'Basketball', 'Swimming'];
   if (url === '/') {
       res.write('<html>');
       res.write('<head><title>Week 01 Teach Assignment</title></head>');
       res.write('<body>');
       res.write('<h1>Something of my choice</h1>');
       res.write('<form action="/activities" method="POST">');
       res.write('<button type="submit">Click Me</button></form>');
       res.write('</body>');
       res.write('</html>');
       return res.end();
   }
   if (url === '/activities') {
       res.write('<html>');
       res.write('<head><title>Activities Page</title></head>');
       res.write('<body>');
       res.write('<h1>Hi there</h1>');
       res.write('<ol>');
       for (item of activityList) {
           res.write('<li>' + item + '</li>');
       }
       res.write('</ol>');
       res.write('<form action="/add-activity" method="POST">');
       res.write('<input type="text" name="message">');
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
       return req.on('end', () => {
           const parseBody = Buffer.concat(body).toString();
           const message = parseBody.split('=')[1];
           fs.writeFile('activities.txt', message, (err) => {
               console.log(message);
               res.statusCode = 302;
               res.setHeader('Location', '/activities');
               res.end();
           });
       });
   };
});
server.listen(3000);
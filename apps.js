//Importing Modules:
const express = require('express'); 

const bodyParser = require('body-parser'); //before using these u need to install in terminal npm install --save body-parser
//why we install because in terminal we get undefined output because when we make user to redirect back to the wepage in terminal we get 'undefined' text
//in order to prevent this we install package bodyParser

// Explanation:
// The code imports the required modules 'express' and 'body-parser'. 
// These modules are essential for creating an Express application and handling the request body, respectively.
// 'express' is the main module for creating an Express application, and 'body-parser' is used to parse the request body.


const app = express();//Creating an Express Application

// Explanation:
// The code creates a new Express application by calling the 'express()' function, and the resulting application object is assigned to the variable 'app'.
// This 'app' object is the main interface for configuring routes and handling HTTP requests.


app.use(bodyParser.urlencoded({extended:false}));

// Explanation:
// The code sets up the 'body-parser' middleware using 'app.use()'. 
// This middleware is responsible for parsing the request body and making it accessible via 'req.body'.
// Here, 'urlencoded' option is used to parse the body as URL-encoded data.


//Middleware Functions: from line 14 - 21
//These lines define middleware functions using the use() method of the Express application. 
//Middleware functions are functions that have access to the request (req) and response (res) objects and can perform operations on them. 
//The next() function is a callback that is used to pass control to the next middleware function in the stack.

//In this example, the first middleware logs the message "In the middleware" and then calls next() to pass control to the next middleware. 
//The second middleware logs "In the another middleware" but doesn't call next(), so it ends the request-response cycle.

// Middleware Functions
app.use('/',(req,res,next)=>{
    console.log('this always run');
    next();
})

// Explanation:
// The code defines a middleware function using 'app.use()'.
// This middleware function is assigned to the root path ('/').
// When a request is made to any route, this middleware function will be executed first.
// It logs the message "This always runs" and then calls 'next()' to pass control to the next middleware function.


app.use('/add-product',(req,res,next) =>{    
    console.log('In the another middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</buuton></form>');
});

// Explanation:
// The code defines another middleware function assigned to the '/add-product' path.
// When a request is made to '/add-product', this middleware function will be executed.
// It logs the message "In the another middleware" and sends an HTML form to the client for adding a product.


app.post('/product',(req,res,next) =>{
    console.log(req.body);
    //console.log(JSON.stringify(req.body)); in this [Object: null prototype] { title: 'book' }
    //we can eliminate [Object: null prototype]
    // we will get only { title: 'book' }
    res.redirect('/')
})

// Explanation:
// The code defines a route handler for the '/product' path.
// This route is specifically for handling POST requests made to '/product'.
// When a POST request is made to '/product', this route handler function will be executed.
// It logs the contents of 'req.body' (which contains the submitted form data) and then redirects the user back to the root path ('/').

app.use('/',(req,res,next) =>{
    console.log('In the another middleware');
    res.send('<h1>Hello from Express.js</h1>');
});


// Explanation:
// The code defines another middleware function assigned to the root path ('/').
// When a request is made to any route, this middleware function will be executed last.
// It logs the message "In the another middleware" and sends a simple HTML response to the client.


app.listen(3000); //create server method and server.listen(3000) can internally done by Express.js only
//(chunk) ,buffer,parsebody,{Content-Type:'text/html'} we can provide if not express.js internally does this
//no need res.write(creatinh html file, internally done by express.js)
//instead we can use res.send

// Explanation:
// The code starts the server by calling the 'app.listen()' method.
// It makes the Express application listen on port 3000 for incoming HTTP requests.


//my explanation 
//whenever i make an request to server by localhost:3000 
//by default it will give us response as Hello from Express.js
//whenever i make request if i do localhost:3000/add-product
//form will be created and i will enter book as a text then submit the button
//i will get [Object: null prototype] { title: 'book' } in terminal
//after { title: 'book' } '/' using this because client is redirecting to the webpage to give more input
//that time i will res as Hello from Express.js(after clicking submit button i will get this response)



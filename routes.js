const fs = require('fs');

//we need to connect apps.js to routes.js
//so we are creating anonymous arrow function called requestHandler consists of req,res as an argument
const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;

    if(url ==='/'){  //client make an request to server consists of /(from route url like http://--)
        //when you open the server 
        //when you enter text(my name is shivan) and click the send button 
        //these text will be stored in an "message.txt" file
        //we are reading the text from "message.txt" file as shown eg below
        //eg: data from filemy+name+is+shivan
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) =>{  //data we are reading from message.txt file,
            //fs.readFile is used to read the contents of the "message.txt" file. 
            //The file is read with the "utf-8" encoding, and if there is no error, the contents of the file are appended to the HTTP response.
            
            
            //fs.readFile: it is an asynchronous task, it executes after some delay
            //character was encoding eg:A : 01000001 ascii value
            if(err){
                console.log(err);
            }
            console.log('data from file' + data); //eg: data from filemy+name+is+shivan
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            //res.write('<body>' + routes.someText +'</body>')
            res.write('<body>' + data + '</body>');
            //creating form has method post, which takes input as a text,adding Send button 
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end(); //stops executing next line, return the controller to fs.-- statement
        })
    
    }
    else if(url ==='/message'  && method === 'POST'){
        const body = [];

        //eg: parsebody>>>>> message=hello+this+is+shreyas
        //suppose if i want to send 1gb of data from front end to back end, sysytem will got hanged
        //what we wiil do here means will will send data as a junk
        //means 1mb we will send data as a junk to backend
    
        req.on("data", (chunk) =>{
            body.push(chunk); //array format
            //we are extracting all the collected data from body which is saved inside "message.txt" 
            
        });
    
    return req.on("end", () =>{  //once we reach 999mb then we are pushing all the data together to backend
        const parseBody = Buffer.concat(body).toString(); //Buffer means if you have seen in earlier if we are opening videos we can see that video was buffering (round white colour symbol keeps running)
        //video does not get fully of its data
        console.log('parsebody>>>>>', parseBody); //output: message=my+name+is+shivan
        //i need to split the data by '=' symbol
        //[1] means i need output only this my+name+is+shivan
        const message = parseBody.split("=")[1];//['message','my name is yash']
        fs.writeFile("message.txt",message, (err) =>{ 

        //fs.writeFile is used to write the data sent by the user to the "message.txt" file. 
        //The data is extracted from the request body and saved to the file asynchronously.
        // If there is an error while writing the data, it is logged to the console. 
        //If the write operation is successful, the server sends a response with a 302 status code and redirects the user back to the homepage ("/").



            //fs.writeFile: it is an asynchronous task, it executes after some delay
            if(err){
                console.log(err);
            }
            console.log('indise fs.writefile');
            res.statusCode = 302;
            res.setHeader("location", "/"); //once user send request and data saved in file
            //iam redirecting user to "/" because he wants send gain, and again the request 
            return res.end();
        });
    });
    
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello from node.js</h1></body>');
        res.write('</html>');
        res.end();
    }
}

//3 ways to export Node.js

//method 1
// we need to export node
module.exports = requestHandler;

//method2
/*module.exports = {
    handler:requestHandler,
    someText:'some hard code text'
};  */

//method3
//exports.handler=requestHandler;
//exports.someText='some hard code text';
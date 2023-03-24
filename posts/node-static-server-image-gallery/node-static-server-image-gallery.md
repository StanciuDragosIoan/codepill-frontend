---
title: "Node Static Server - Image Gallery Project"
date: "2021-06-01"
image: static.png
excerpt: NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.
isFeatured: true
---

Published **1st June 2021**.

As you know or might not know.. [NodeJS](https://nodejs.org/en/about) is very good at serving **dynamic** data. So on our servers we can have complex logic that manipulates data, and 'serves' content dynamically based on that data. However, this time we will also exploit the capabilities of the runtime to serve static data (data that never changes and has just to be read by the 'client').

The project we will be building is a file uploader that will 'upload' images on our server and 'serve' them statically on a webpage, just like an image gallery. All social networks allow you to upload a picture and we'll do just that.

However, we will not use a framework such as [express](https://expressjs.com/). We will still do everything with core [NodeJS](https://nodejs.org/en/about) code. I think it is very important to understand how stuff works 'under the hood' before diving deeper into a framework and we'll do just that.

In the project folder, just run **npm init --y**. This will set up a default npm project.

Next, run the below commands:

```js
  npm i busboy --save
  npm i -D nodemon --save
```

Next add a 'start' script and put it to start the **server.js** file in the **package.json** config file:

```js
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
      }

```

\*Note I always add a 'dev' script to run it with [nodemon](https://www.npmjs.com/package/nodemon) for hot-reloading. In case you do not know, what nodemon is, it's a cool dependency that enables your project to 'auto-restart' the server whenever you change something in the code.

You can read more about it in [this](https://www.code-pill.com/articles/node-js-mini-projects-logger) article.

Next, create the actual **server.js** file and paste the below code to it:

```js
const fs = require("fs"),
  http = require("http");

http
  .createServer(function (req, res) {
    //serve static resources
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(`
      <h1>
        404 Error page not found X_X!
      </h1>
      err message:
      <div>
        ${err}
      </div>
      `);
        return;
      }
      res.writeHead(200);
      return res.end(data);
    });
  })
  .listen(5555);
```

Now our server can 'serve' static files so test it by creating an index.html file and paste some code in it. Here's what I pasted:

```js
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1.0"
    >
    <title>
      Gallery
    </title>
</head>
<body>
    TEST
</body>
</html>

```

Now, if you start the server by running **npm run dev** and we go to [http://localhost:5555/index.html](http://localhost:5555/index.html) you will see the contents of the **index.html** being served.

Note how the serving of the content is performed inside the [readFile()](https://nodejs.dev/en/learn/reading-files-with-nodejs/) method. So the server reads the HTML file and serves it as a response.

Also, if you paste an image (e.g. <img src="./test.jpg" alt="some pic" /> ) tag and the image is in the same folder as the index file, it will be served.

So congratz! You have just implemented your first static server in [NodeJS](https://nodejs.org/en/about) without using Express or some other framework.

Next we will implement the uploader logic. Let's start by modifying the **server.js** file a little bit as per below:

```js
const fs = require("fs"),
  http = require("http");
const imageUploader = require("./imageUploader");

http
  .createServer(function (req, res) {
    //serve static resources
    const url = req.url;
    const method = req.method;
    if (url === "/image-uploader") {
      if (method === "GET") {
        imageUploader.displayWelcomeScreen(res);
        imageUploader.displayUploadForm(res);
        return res.end("");
      } else if (method === "POST") {
        imageUploader.uploadImage(req, res);
      }
    } else {
      fs.readFile(__dirname + req.url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(`
      <h1>
        404 Error page not found X_X!
      </h1>
      err message:
      <div>
        ${err}
      </div>
      `);
          return;
        }
        res.writeHead(200);
        return res.end(data);
      });
    }
  })
  .listen(5555);
```

Next, create the **imageUploader.js** file inside the project directory and paste the below in it:

```js
const os = require("os");
const fs = require("fs");
const path = require("path");
const busboy = require("busboy");

const styles = {
  card: `
        text-align:center;
        padding: 1rem;
        display:block;
        margin: 1rem auto; 
        margin-top:2rem;
        width:60%;
        max-width:600px;
        border: 5px solid #bbb;
        border-radius: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        
        `,
  text: `
          font-weight:900;
          text-align:center;
        `,
  formStyles: `
           display:block; 
              margin:auto; 
              margin-top:1rem;
              padding:2rem; 
              font-size:1rem; 
              background: #ddd; 
              border: 2px solid #000; 
              border-radius:5px;
              max-width:600px;
        `,
  header: `
          text-align:center;
          width:30rem;
          display:block;
          margin:auto;
          padding:3rem;
          background: blue;
          color: #fff;
        `,
};

const imageUploader = {
  displayWelcomeScreen: (res) => {
    res.write(`
                  <div style="${styles.card}">
                      <h1>
                        Welcome to the image uploader
                      </h1>
                      <p 
                        style="${styles.text}">
                        An app to manage your gallery of pictures
                      </p>
                  </div>
                  `);
  },

  displayUploadForm: (res) => {
    res.write(`
          <style>
            .btn:hover {
              background: #000;
              color:#ccc;
              border: 2px solid #ccc!important;
            }
            
            .file-input  {
              display: block;
              margin:auto;
              width: 15rem;
              padding:1rem;
            }
          </style>
          <h1 style="${styles.text}">Upload Image</h1>
            <form 
              style="${styles.formStyles}" 
              action="/image-uploader" 
              method="post" 
              enctype="multipart/form-data"
            >
                    <input 
                      class="file-input" 
                      type="file"  
                      name="filefield"
                    <br />
                    <input 
                      class="btn" 
                      style="${imageUploader.uploadBtn}" 
                      type="submit" 
                      value="Upload img"
                    >
            </form>
            `);
  },

  uploadBtn: `
          display:block!important;
          margin:auto!important;
          margin-top:2rem!important;
          width:15rem;
          font-size: 2rem;
          border: 2px solid #000;
          border-radius:5px; 
        `,

  header: ` 
          text-align:center;
        `,

  uploadImage: (req, res) => {
    return res.end("UPLOAD HERE");
  },
};

module.exports = imageUploader;
```

Now, if you go to go to [http://localhost:5555/image-uploader](http://localhost:5555/image-uploader), you will see the upload form. If you go to the **/index.html** endpoint you see the static file being served.

The **imageUploader** module only displays a welcome screen and an upload form. It also has a method for the upload but we will work on it next. Note that the upload form hits the **/image-uploader** endpoint with a [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request. It also has an [enctype](https://www.w3schools.com/tags/att_form_enctype.asp) attribute set to [multipart/form-data](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects). This is the [encoding](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API) type for files (and that's what our form processes, image files).

This encoding type is used for file inputs (note the form also has an input of type file, which is what 'lets' the user to search through his PC for an image to upload). The **multi-part** thing basically means that the data is divided into multiple parts and sent to the server as a stream.

If you press on the 'Upload File' button, you get the text from our **uploadImage** method displayed. Let's change it so that it does the file upload. So we want the image to be saved from the user into a folder called 'uploads'. Add the below code to **uploadImage**:

```js
uploadImage: (req, res) => {
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    //validation allowing only for .png/.jpg pictures
    const mimetypes = ["image/jpeg", "image/png"];
    const { filename, encoding, mimeType } = info;

    if (!mimetypes.includes(mimeType)) {
      return res.end("Please upload only .jpg or .png files");
    }

    const uploadDirectory = "./uploads";
    //create directory if it does not exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    //assign id to image
    const id = Math.random().toString(12).substring(2, 17);
    const saveTo = path.join(__dirname, "uploads", path.basename(`${id}.jpg`));
    file.pipe(fs.createWriteStream(saveTo));
  });

  bb.on("close", function () {
    return res.end(`
                    <h1 
                      style="${imageUploader.header}"
                    >File uploaded successfully</h1>
                  <script>
                  //redirect to index.html after upload
                    setTimeout(()=> {
                      window.location.href = "http://localhost:5555/index.html";
                    }, 2000);
                  </script>
                    `);
  });
  return req.pipe(bb);
};
```

Now if you try to upload a picture, it gets put into the 'uploads' directory and the application redirects you to **/index.html**. Also, note that we only allow for **.jpg** and **.png** images to be uploaded. We do that by checking the [mimetype](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the uploaded file.

We want now in this file to display all images from the 'uploads' folder and to 'scan' the 'uploads' directory on each request so that all images are displayed instantly. For this we will modify the **server.js** script:

```js
const fs = require("fs"),
  http = require("http");
const imageUploader = require("./imageUploader");

http
  .createServer(function (req, res) {
    //serve static resources
    const url = req.url;
    const method = req.method;
    if (url === "/image-uploader") {
      if (method === "GET") {
        imageUploader.displayWelcomeScreen(res);
        imageUploader.displayUploadForm(res);
        return res.end("");
      } else if (method === "POST") {
        imageUploader.uploadImage(req, res);
      }
    } else {
      fs.readFile(__dirname + req.url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(`
            <h1>
              404 Error page not found X_X!
            </h1>
            err message:
            <div>
              ${err}
            </div>
            `);
          return;
        }

        const testFolder = "./uploads/";
        const fs = require("fs");

        fs.readdir(testFolder, (err, files) => {
          let gallery = "";
          const path = require("path");
          //order images in 'order' of upload
          files
            .sort((a, b) => {
              return (
                fs.statSync(testFolder + a).mtime.getTime() -
                fs.statSync(testFolder + b).mtime.getTime()
              );
            })
            .reverse()
            .forEach((file) => {
              //add an image tag for each image
              gallery += `
                <img  
                  style="
                    display:block; 
                    margin:auto; 
                    margin-top:2rem; 
                    margin-bottom:2rem; 
                    max-width:700px;
                    border: 5px solid #ccc;
                    border-radius:5px;" 
                  src="/uploads/${file}" alt="some image">
              `;
            });

          //put everything in some html output
          let htmlOutput = `
      
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gallery</title>
            </head>
            <body>
                
            <div>
            <h1  style="display:block; margin:auto; text-align:center;">
              Welcome to  the image uploader Gallery
            </h1>
        
        </div>
          
        
        
        ${gallery} 
      
            
        <script>     
          //reload page once in cliend side so that user sees the image
          window.addEventListener('DOMContentLoaded', (event) => {
          if(document.URL.indexOf("#")==-1)
          {
              // Set the URL to whatever it was plus "#".
              url = document.URL+"#";
              location = "#";
              //Reload the page
              location.reload(true);
            }
          });
        </script>
            
      </body>
      </html>
            
            `;

          //write everything to the index.html file on each request
          fs.writeFile("index.html", htmlOutput, (err) => {});
        });

        res.writeHead(200);
        //serve file
        return res.end(data);
      });
    }
  })
  .listen(5555);
```

Now your 'image-gallery' app is done. You can upload images and display them in a gallery in chronological order, you have server side validation (so your users can't just upload anything) and you serve them statically with [NodeJS](https://nodejs.org/en/about).

If you've stuck with me till this point, thank you! 😄 This motivates me to put more content out. [Here's](https://github.com/StanciuDragosIoan/static_server_gallery) the Code for the project if you want to look at it some more. In exchange, I'll give you one more tip: try to extend my project, make it better, tweak it, add something to it. For instance, you could make it so that pictures are displayed with the publication date, or you could add a little like button, and a 'likes' route, and store the data in some JSON file on the server (so as to display the likes).

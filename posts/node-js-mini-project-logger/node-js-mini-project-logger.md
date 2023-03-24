---
title: "NodeJS miniproject - logger"
date: "2021-05-22"
image: node_log.png
excerpt: It's finally the time to build some projects with actual functionality using NodeJS. For starters, we will build little applications but you will learn a lot from doing this.
isFeatured: true
---

It's finally the time to build some projects with actual functionality using [NodeJS](https://nodejs.org/en/docs). For starters, we will build a little application but you will learn a lot from doing this. We will also implement everything using core **NodeJS** code and no framework for now. In this way, you will learn a ton about how the runtime works under the hood and how it handles stuff.

However, before we start, we need to clarify a final 'technical' concept regarding JavaScript and NodeJS, namely [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## JavaScript modules

If you come from a different language such as [PHP](https://www.php.net/) or [Java](https://www.java.com/en/), you are familiar with scripts which are 'imported' inside our application through a syntax such as:

```js
      require_once("my awesome module");//PHP import
      import java.util.ArrayList; //Java import
```

This is very handy as we can have whole bunch of functionalities grouped under separate files (or modules), which we can use throughout our applications.

JavaScript provides this mechanism as well. It did not use to have it, but modules got introduced to the language starting 2009 with the emergence of runtime environments such as **NodeJS**.

There are 2 basic types of JavaScript modules: **Common JS** modules and **ES6 modules**. The common modules are imported using the require("./someModule") statement, while the ES6 modules are imported via the import someModule from "./someModule" statement and these work only with a transcompiler like [Babel](https://babeljs.io/).

NodeJS makes heavy and awesome use of these modules and now we'll see them in action.

## Logger mini project

What cooler starter project could there be than a logger application 🤣?

As the name implies, this little application will allow us to log (so to write) data to a file.

Let's start by generating an npm script inside our project directory. Run the below from a terminal window:

```js
npm init -y
```

\*note that the -y flag will let [npm](https://www.npmjs.com/) fill all the info in the package.json script with some defaults so we don't have to do it manually. If you want to learn more about initializing an npm script, check this NodeJS intro Link for all the steps.

```js
     {
        "name": "intro-node-mini-projects-1",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
      }
```

Replace the "test" line in the "scripts":{} block with this:

```js
"start": "node server.js"
```

\*also, change the name of the main script from index.js to server.js. I like server.js better as a file name 🤣.

Now, let's create the server.js file and add the below code to it:

```js
//import http module for our server
const http = require("http");

const PORT = process.env.port || 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  //set content type Header
  res.setHeader("Content-Type", "text/html");

  if (method === "GET") {
    if (url === "/") {
      res.write(`
      <h1>
        Welcome to the application entry point!
      </h1>
      `);
      res.end();
    } else {
      res.statusCode = 404;
      res.end(`
      <h1>404 Page Not Found X_x</h1>
      `);
    }
  }
});

//log some output to see everything's ok
console.log(`Server is running on port: 
            ${PORT} =)
            `);

//start the server
server.listen(PORT);
```

Now, if we start the server with npm start, we can go to [http://localhost:5000](http://localhost:5000) and see our homepage.

It is time now to write our own custom **node module**. In NodeJS there are 3 types of modules: **core nodeJS modules** (these come built into NodeJS and you do not have to install them separately e.g the [http module](https://nodejs.org/api/http.html) ), 3rd party modules (these have to be installed separately, and I will show you one very soon) and custom modules that we write.

Inside the project directory, create another one and name it 'custom_modules'. Now, inside the 'custom_modules' directory, create a logger.js file and paste the below to it:

```js
const logger = {
  checkLogger() {
    console.log("Logger module up and running *_^!");
  },
};

module.exports = logger;
```

Now, let's import the logger.js in our server.js so add the import up top in the server script, maybe right under the http module import:

```js
const logger = require("./custom_modules/logger");
```

Next, you can use the **checkLogger** method in the entry point script, just add the below line under the initial **console.log** statement in the server:

```js
logger.checkLogger();
```

Stop the server with ctrl + C and re-start it, and the logger will run in your server.

Before finishing the actual implementation of the logger, I will quickly show you a **3rd party node module**, named [nodemon](https://www.npmjs.com/package/nodemon) which is very awesome for development, as it allows you to keep making changes to your code, without having to restart the server every time.

Let's stop the server for a last time with **ctrl + C** and then run:

```js
     npm i -D nodemon
```

\*the **-D** flag is to mark a development dependency, and that's what [nodemon](https://www.npmjs.com/package/nodemon)is since in production we will not want our server to stop and restart.

Once the command above has finished executed, we can see a new block added to our package.json file, namely the devDependencies and it looks like this:

```js
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
```

Let's snow add a second script besides the start one. I will add a dev script that will look like this:

```js
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    }
```

Now, if we want to run the dev script we just execute:

```js
npm run dev
```

The difference since before, is that if we change anything in the code and save, the server will restart by itself. You can try that by changing the text logged by the logger module.

Let's now move on with the logger implementation. Since this is a very basic app, it will only show you how to process form data and write it to a file. Pretty basic, but very useful since you will be doing this in any application you are building.

Let's start by adding the below code in **logger.js**:

```js
const logger = {
  checkLogger() {
    console.log("Logger module up and running *_^!");
  },

  renderLoggerForm: (res) => {
    res.write(`
            <form
                style="${logger.formStyles}"
                action="/logger"
                method="POST"
            >
                <input 
                  name="logText"
                  style="${logger.formField}"
                  type="text">
                <button 
                  style="${logger.formBtn}"
                  type="submit">
                  Log something
                </button>
            </form>
        `);
  },

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

  formBtn: `
    display:block;
    margin:auto;
    width:60%;
    padding:0.5rem;
    font-size:2rem;
    margin-top:3rem;
  `,

  formField: `
    display:block;
    margin:auto;
    text-align:center;
    font-size:2rem;
    margin-top:1rem;
  `,
};

module.exports = logger;
```

We have added a method that displays a form. It uses the [res](https://nodejs.org/api/http.html#class-httpserverresponse) object to render a form on the screen and uses some custom styles to make it look decent. The form has only a field and a button, and it sends a [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request into the /logger route from our server.

We do not have a **/logger** route, so far we only have a **/** route and everything else shows a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) page. Let's change our **server.js** script a bit. Replace the [if(){}else{}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement in the server.js with the below [switch(){}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch):

```js
switch (url) {
  case "/":
    res.write(`
          <h1>
            Welcome to the application entry point!
          </h1>
          `);
    res.end();
    break;
  default:
    res.end(`
        <h1>404 Page Not Found X_x</h1>
        `);
    break;
}
```

\*the switch statement is just a more elegant way to handle multiple conditions logic, it is a good approach to use it when you would otherwise have many **if(){} else {}** statements chained up.

Now the server.js should work just as before. Let's add the /logger route into it. Add the /logger case right under the / case:

```js
   case "/logger":
        res.write(`
        <h1
        style="text-align:center"
        >Welcome to our Logger Application</h1>
        `);
        logger.renderLoggerForm(res);
        res.end();
        break;
```

Now, if we go to [http://localhost:5000/logger](http://localhost:5000/logger) we can see our logger form.

Of course, the logger does nothing yet, so let's start by implementing a **processForm()** method that can grab the data submitted by the form for us. Add it in the **logger.js** file, with a comma right after the formField string:

```js
  processForm: (req, res) => {
    const body = [];
    //on data to start reading data
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    //on end to finish reading stream
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
    });
  },
```

Note, how we are using two built-in [events](https://nodejs.org/api/events.html) inside **processForm**. The submitted data comes as a [stream](https://nodejs.org/api/stream.html), which we are reading inside of our application. A [stream](https://nodejs.org/api/stream.html) is basically a 'flow' of data, from which we can read. And we read this data in ['chunks'](https://nodejs.org/api/stream.html#writableendchunk-encoding-callback) (in small parts, so not all at once). The event to trigger this is on("data", () => {}) so on the "data" event we are executing a callback function. Inside of that callback, we push the chunks onto the 'body' array.

Finally, after all the data has been read and all the chunks "pushed" onto the body array, we use the on("end", () => {}) event with another callback. Inside of that callback we use the built-in [Buffer](https://nodejs.org/api/buffer.html#buffer) object to concatenate the data chunks as a string and log the output to the console.

\*Note that our logger form has an action [attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) set to **/logger** so that's the route it will hit with the [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request, but currently our server does not handle such requests. Let's change the /logger case a bit so it can do that too. Replace it with the below:

```js
  case "/logger":
      if (method === "GET") {
        res.write(`
        <h1
        >Welcome to our Logger Application</h1>
        `);
        logger.renderLoggerForm(res);
        res.end();
      } else if (method === "POST") {
        logger.processForm(req, res);
      }
      break;
```

If you save everything and try to submit the form, you will see the data logged to the form as: "logText='data here...'". The **logText** is the [**name**](https://www.w3schools.com/tags/att_form_name.asp) attribute from the form and that's how the field is submitted to the server. You will also notice that the browser tab looks as if it's continuously loading and never finishing. That's because inside the **processForm** method, we are not calling **res.end()** so our server, never finishes the request. Let's change that by replacing the console.log() line with the below:

```js
logger.logToFile(res, parsedBody);
```

Start by importing the [fs](https://nodejs.org/api/fs.html) module up top in the **logger.js** file. So add the below line:

```js
const fs = require("fs");
```

\*The **[fs](https://nodejs.org/api/fs.html)** module's name stands for 'file system' and it is a core NodeJS module (comes built-in and we did not have to install anything to use it) which allows us to read from and write to files.

Finally, right under **processForm()** add the **logToFile()**:

```js
logToFile: (res, parsedBody) => {
        //define logs dir
        const logDirectory = "./logs";
        //process data to log
        const dataToLog = parsedBody.split("=")[1].split("+").join(" ");
        const date = new Date()
          .toString()
          .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3");
        //create dir if it does not exist
        if (!fs.existsSync(logDirectory)) {
          fs.mkdirSync(logDirectory);
        }
        fs.appendFile(
          "./logs/logs.txt",
          `Logged at: ${date}, textLogged: ${dataToLog} \n`,
          function (err) {
            if (err) throw err;
          }
        );
        //redirect back to homepage
        res.statusCode = 302; //redirect
        res.setHeader("Location", "/");

        return res.end();
      },
```

The **logToFile()** method takes in the **parsedBody** and logs it to a file. It puts all these log files inside a **/logs** directory in a **logs.txt** file and it also redirects us to **/**.

Now our **logger.js** module is fully operational and does the pointless thing of logging stuff to a file. This may seem simple but it will prove handy in time, when you will build complex applications, and you will want to constantly log stuff throughout your applications in both the terminal and to a file.

As a little 'challenge' try making the logfile something like **date_log.txt**.

The full logger.js module now looks like [this](https://www.code-pill.com/articles/node-js-mini-projects-logger). Also [Here's](https://github.com/StanciuDragosIoan/demo-repo-node-mini-projects) the repo with the full code.

\*Note there is a [.gitignore](https://git-scm.com/docs/gitignore) file in the repo, which has **node_modules** written in it. This means that [git](https://git-scm.com/) will not track (add to commits) the **node_modules** directory and that's good. We do not want that because the node_modules directory is very big, and it can be instantly re-created by running **npm install** (the first command you will run in any nodeJS project). Also, note that if you do not run npm install, the project will obviously not work.

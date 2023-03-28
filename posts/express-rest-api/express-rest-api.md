---
title: "Express Rest API"
date: "2022-10-30"
image: express.png
excerpt: After having built an Aplication Programming Interface (in short a REST API ) using core nodeJS so without using any framework, it is now time to rebuilt it in Express.
isFeatured: true
---

After having built an [Application Programming Interface](https://www.mulesoft.com/resources/api/what-is-an-api) (in short a REST API ) using core [NodeJS](https://nodejs.org/en/about) so without using any framework, it is now time to explore Express, one of the most popular and widely used nodeJS frameworks. If you have missed my previous article, and have not yet built the first version of this project, you can do so by following this [Link](/posts/nodejs-rest-api).

If you want to see a demo of this project, I have it running up at this [Link](https://vast-happy-chance.glitch.me/resources) . Also, at the end of the article, you can find the github repo with the code for this project.

We will build this project from scratch, just like the previous one. Start by initializing an npm script:

```js
    npm init --y
```

Next, let's install express do so by running:

```js
   npm i express
```

[Express](https://expressjs.com/) is a minimalistic [NodeJS](https://nodejs.org/en/about) framework that can be used for building scalable and robust web applications. For starters, let's get our server up and running. Create a **server.js** file and paste the below code in it:

```js
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
app.get("/", (req, res) => {
  return res.end("Welcome to the homepage!");
});

console.log(`server up and running on port ${port}`);

app.listen(port);
```

Now, if you run **node server** in a terminal, you will start the server and if you go to [http://localhost:3000](http://localhost:3000), you will see our homepage response. Note that the server is an instance of the [express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction) function being executed (that's the 'app' object).

\*Note also how it has methods for all the [http](https://developer.mozilla.org/en-US/docs/Web/HTTP) methods (we have used **app.get()** but it also supports **post**, **put**, **delete**, etc...).

Another important detail to keep in mind, is the fact that the first argument of the get method (and this is true for all the methods) is a relative path, to which the user has to go, in order for the method to be executed. In our case that relative path is **/** that's why we go to [http://localhost:3000](http://localhost:3000) in order to get our homepage response. If the argument had been '/test', we would have to go to [http://localhost:3000/test](http://localhost:3000/test).

The second argument to the method is a callback function that receives a [request](https://expressjs.com/en/5x/api.html#req) and a [response](https://expressjs.com/en/5x/api.html#res) object. This is similar to the request hadler that we previously used with the createServer() method and you can't help not noticing that the 'express' ones are simply 'wrappers' on top of the native nodejs [request](https://nodejs.org/api/http.html#class-httpclientrequest) and [response](https://nodejs.org/api/http.html#class-httpserverresponse) objects.

Now let's install nodemon and add the start and dev scripts to our package.json file. Run:

```js
   npm i nodemon
```

Next, make the scripts key of your package.json file to look like this:

```js
    "scripts": {
        "start": "node server",
        "dev": "nodemon server"
      },
```

Now we can run the dev script and keep developing without having to re-start the server upon each change. Another cool thing express does for us, is some generic error handling. Try going to: [http://localhost:3000/test](http://localhost:3000/test).

\*Note how you get a 'default' 404 response which comes directly from [express](https://expressjs.com/). Let's now write our own, custom [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) response. Add the below snippet in your **server.js** file right above the console.log(..) line:

```js
//generic middleware
app.use((req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method not allowed");
  }
  res.statusCode = 404;
  return res.end("Unfortunately this page could not be found X_x");
});
```

**app.use()** is a generic method, that responds to all http methods. So it will answer to **POST**, **PUT**, **DELETE** etc... just as if we had written: **app.get()**, **app.post()**, **app.put()**, etc... each with the same logic of checking the request type and aswering appropriately. Instead of that, [express](https://expressjs.com/) gives us the hand use() method and we can create this 'generic middleware'.

When working with [express](https://expressjs.com/) you will often encounter this concept of middleware. A [middleware](https://expressjs.com/en/guide/using-middleware.html#using-middleware), is a function that has access to the request-response lifecycle, and it can be used to further configure the server response or the behaviour of our application. So we can execute a middleware before sending the client response (for instance we can use such a function to check if the user is authenticated to our application or not, or even to authenticate him). Furthermore, we can configure the middleware so that it ends the server response by itself, if needed.

In order to better understand middleware, let's add the below 2 middlewares in our code, paste them above the app.get() line:

```js
app.use((req, res, next) => {
  console.log("middleware1");
});

app.use((req, res, next) => {
  console.log("middleware2");
});
```

Now, make any request to our API, (to the [http://localhost:3000](http://localhost:3000) endpoint or to [http://localhost:3000/test](http://localhost:3000/test) ) and see what's going to happen.

You will notice, that only middleware1 logs, so the second middleware was not reached. Next, modify middleware1 to the below:

```js
app.use((req, res, next) => {
  console.log("middleware1");
  next();
});
```

Now, if you hit one of the endpoints again (so **/** or **/test**) you will notice 2 things. First, the middleware2 is executed and the second log is shown. Secondly, you might have noticed that the server response is not quite finished. It may keep on going (so the browser looks like it keeps loading without finishing) or the whole server response might not be sent at all. This is what happens when we start executing a middleware without actually calling [next()](https://expressjs.com/en/guide/writing-middleware.html) or without ending the server response somehow (by using [res.end()](https://expressjs.com/en/5x/api.html#res.end) for instance).

So what we learn from this? We can use [middleware](https://expressjs.com/en/guide/using-middleware.html#using-middleware) functions to further configure our server response or to perform additional logic before sending the client response. Also, [middlewares](https://expressjs.com/en/guide/using-middleware.html#using-middleware) are called and they can either pass the control flow to the subsequent [middleware](https://expressjs.com/en/guide/using-middleware.html#using-middleware) (so the next one if there is any) or it can end the client response by itself. A [middleware](https://expressjs.com/en/guide/using-middleware.html#using-middleware) function usually receives 3 arguments (req res and next). You already know what req and res are. The 3rd one, next is a function, which once called, executes the subsequent middleware (so the next one).

A middleware function can also receive a 4th argument err which is an [error](https://expressjs.com/en/guide/error-handling.html#error-handling) object. If an error object is caught, we can handle it accordingly so that our application does not crash. We will use this 4th argument with a middleware by the end of the article. For now, remove the 2 middlewares and let's start creating routes.

Routes are endpoints which we configure so our [API](https://www.mulesoft.com/resources/api/what-is-an-api) responds accordingly if a certain request hits a certain route. We will re-create the 'resources' API from the [previous](/posts/nodejs-rest-api/) article.

We will first create some data for our API to read and serve. Create a 'data' directory in your project, and inside of it create a **db.json** file. Inside this file paste the below:

```js
[
  { name: "Haku", color: "amber", id: "68961358a34980885377524a4a8766" },
  { name: "Luka", color: "green", id: "38136754209825b05a81002178108a" },
  { name: "Misaka", color: "Red", id: "32b656a52375984776851a0085792a" },
];
```

Next, create a 'routes' directory, and inside of it create a **resources.js** file. Inside of it, paste the below:

```js
const router = require("express");
const app = router();
const fs = require("fs");
/*
 *  GET
 *  payload null
 *  returns JSON payload with resources
 */
app.get("/", (req, res) => {
  try {
    const rawJSONData = JSON.parse(fs.readFileSync("./data/db.json"));
    return res.send(rawJSONData);
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    const rawJSONData = { resources: [] };
    return res.send(rawJSONData);
  }
});

module.exports = app;
```

The [router](https://expressjs.com/en/5x/api.html#router) variable is another instance of the [express()](https://expressjs.com/en/5x/api.html#express) app. It has the same methods available as our app, and we can use it in this way to better structure our routes based on business logic and in keep each set of routes in dedicated files. (imagine how useful this is if you have many types of business entities like users, products, orders, etc..) in your application.

Now that we have exported the **resources** routes, we can use them in our **server.js** script. Paste the below 2 lines in the **server.js** file, right above the app.get() call:

```js
const resources = require("./routes/resources");
app.use("/resources", resources);
```

\*Note how we are mounting the resources routes at the **/resources** path. In the **resources.js** file, we have called **app.get("/")** but we are actually overwriting that path with **/resources** when mounting the routes in the app entry point (the **server.js**) script.

Now, if we go to [http://localhost:3000/resources](http://localhost:3000/resources) in our browser, we can see our resources being read form the file and served from the server.

You might or might have noticed that in our **resources.js** file we are using the **res.send()** method instead of **res.end()**. The **send()** method is something [express](https://expressjs.com/en/api.html) gives us and it is very handy as it serializes the data for us (so if we send an object it will perform JSON.stringify() onto it before sending it, and it will also set the Content-Type header to application/json for us by itself). This is just one of the many cool things a framework will do for you to speed up your development process.

Now that we can read our resources, let's add a [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) endpoint so we can create them too. Before doing that, however, we need to create a Resource controller. It will be 'responsible' for handling our resources 'resources' (so create, delete, read, etc... them). Create a controller directory and inside of it create a **Resource.js** file. Inside this file paste the below:

```js
const fs = require("fs");

const getId = () => {
  return (
    Math.random().toString(12).substring(2, 17) +
    Math.random().toString(12).substring(2, 17)
  );
};
const read = () => {
  try {
    const rawJSONData = JSON.parse(fs.readFileSync("./data/db.json"));
    return rawJSONData;
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    const rawJSONData = { resources: [] };
    return rawJSONData;
  }
};

const add = (data, res) => {
  const crtData = read();
  crtData.push(data);
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
  return res.status(201).send({ id: data.id });
};

module.exports = {
  read,
  add,
  getId,
};
```

Now, go back to the **routes/resources.js** and change the **app.get("/")** call to the below:

```js
app.get("/", (req, res) => {
  const data = read();
  return res.send(data);
});
```

Also, don't forget to import the read() method up top in the **/routes/resources.js**:

```js
const { read } = require("../controller/Resource");
```

You can also remove the **const fs = require("fs");** line from **routes/resources.js** as the controller is now the one reading the file and needing to use the [fileSystem module](https://nodejs.org/api/fs.html).

Let's next add the POST endpoint. Paste it in the **/routes/resources.js** file under the **app.get("/")** route:

```js
/*
 *  POST
 *  payload color: string, name: string
 *  returns JSON payload with resource id
 */
app.post("/", (req, res) => {
  const { color, name } = req.body;
  const id = getId();
  const data = {
    name,
    color,
    id,
  };
  return add(data, res);
});
```

Finally, we need to import the **add()** method from the controller in the **/routes/resources.js** file. Update the **const { read } = require("../controller/Resource");** line to:

```js
const { read, add, getId } = require("../controller/Resource");
```

Now, we must add one more line to the **server.js** before all of this can work. Add the below line to **server.js** under the port definition line:

```js
app.use(express.json()); // This middleware is available in Express v4.16.0 onwards.
```

This is a middleware that allows us to parse the request body payload as [JSON](https://www.json.org/json-en.html) object.

Now we can test our POST endpoint by running the below command in a terminal:

```js
node -e "http.request('http://localhost:3000/resources', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku', color: 'orange'}))"
```

With this, we confirmed that our **/post** endpoint works. However, we need some improvements in our code as we have only tested and implemented for the ideal case that we get a good, complete and properly formated payload. We are also not handling duplicate cases so if we run the above command again, we can create a duplicate entry which will only have a different id.

Let's deal with the duplicates and with handling the payload. We will create 3 new helper modules. Start by creating a 'helpers' directory, and inside of it create a **securityHelper.js** file. Inside of it, paste the below:

```js
const { getId } = require("../controller/Resource");

const validatePayload = (payload) => {
  if (
    Object.prototype.hasOwnProperty.call(payload, "name") &&
    Object.prototype.hasOwnProperty.call(payload, "color") &&
    typeof payload.name === "string" &&
    typeof payload.color === "string" &&
    payload.color.length <= 15 &&
    payload.name.length <= 15 &&
    Object.keys(payload).includes("color") &&
    Object.keys(payload).includes("name") &&
    Object.keys(payload).length === 2
  ) {
    return true;
  }
  return false;
};

const grabPayload = (payload) => {
  const { color, name } = payload;
  const id = getId();
  const data = {
    name,
    color,
    id,
  };
  return data;
};

module.exports = {
  validatePayload,
  grabPayload,
};
```

This little helper module has 2 functions in it, one of them validates that the payload is good (has all the required properties and that the properties are of the good data type and respect some length restriction) and the second one destructures the payload by taking what we need from it.

Next, create another file inside the 'helpers' directory and name it **resourceHelper.js**. Inside of it, paste the below:

```js
const { read } = require("../controller/Resource");
const checkIfDuplicate = (data) => {
  const crtData = read();
  const duplicate = crtData.find(
    (i) => i.color === data.color && i.name === data.name
  );
  return duplicate;
};

const findById = (id) => {
  const crtData = read();
  const item = crtData.find((i) => i.id === id);
  return item;
};

module.exports = {
  checkIfDuplicate,
  findById,
};
```

The 3rd and final helper we will create is called **errorHandlerHelper.js**, create it and paste the below inside of it:

```js
const badRequest = (res, msg) => {
  res.statusCode = 400;
  return res.send(msg);
};

const sendOk = (res, data, status = 200) => {
  return res.status(status).send(data);
};

module.exports = {
  badRequest,
  sendOk,
};
```

This little helper module allows us to send an [OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses) response from the server (so 200/201 status) and a 400 badRequest response.

Finally, replace the **routes/resources.js** file contents with the below:

```js
const router = require("express");
const { badRequest } = require("../helpers/errorHandlerHelper");
const { checkIfDuplicate } = require("../helpers/resourceHelper");
const app = router();
const { read, add } = require("../controller/Resource");
const { validatePayload, grabPayload } = require("../helpers/securityHelper");
/*
 *  GET
 *  payload null
 *  returns JSON payload with resources
 */
app.get("/", (req, res) => {
  const data = read();
  return res.send(data);
});

/*
 *  POST
 *  payload color: string, name: string
 *  returns JSON payload with resource id
 */
app.post("/", (req, res) => {
  const payload = req.body;
  const isValid = validatePayload(payload);

  if (isValid) {
    const data = grabPayload(payload);
    const duplicate = checkIfDuplicate(data);

    if (duplicate) {
      badRequest(res, "Duplicate Entry");
    } else {
      return add(data, res);
    }
  } else {
    badRequest(res, "Some field is missing or is bad X_X");
  }
});

module.exports = app;
```

Now, if we run the below command again:

```js
      node -e "http.request('http://localhost:3000/resources', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku', color: 'orange'}))"
```

We will get a [400 badRequest](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) response for a 'duplicate entry'. Note how we also validate that the payload is good, it has a certain type and maximum length, or if it's missing some field or is bad in any other way. This is a way more robust approach. Feel free to test some more using a tool such as [Postman](https://www.postman.com/) by making POST requests to [http://localhost:3000/resources](http://localhost:3000/resources) with various payloads.

Now that our create works, let's add an update endpoint. And actualyl we will add 2 of them. We want users to be able to update a resource with both a [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) and a [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request.

Add the [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) endpoint in the **routes/resources.js** right under the first [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) call:

```js
/*
 *  POST
 *  payload color: string, name: string
 *  returns JSON payload with success message with resource id
 */
app.post("/:id", (req, res) => {
  const isValid = validatePayload(req.body);
  const { id } = req.params;

  if (isValid) {
    const found = findById(id);
    if (found) {
      const data = grabPayload(req.body);
      data.id = id;
      update(id, data);
      sendOk(res, `item with id ${id} updated successfully`);
    } else {
      badRequest(res, `item with id ${id} could not be found`);
    }
  } else {
    badRequest(res, "Some field is missing or is bad X_X");
  }
});
```

Next in the same file, update the **const { badRequest } = require("../helpers/errorHandlerHelper");** to:

```js
const { badRequest, sendOk } = require("../helpers/errorHandlerHelper");
```

Update the **const { read, add } = require("../controller/Resource");** to:

```js
const { read, add, update } = require("../controller/Resource");
```

Also, update the **const { checkIfDuplicate } = require("../helpers/resourceHelper");** to:

```js
const { checkIfDuplicate, findById } = require("../helpers/resourceHelper");
```

Finally, add the **update()** method inside the **controller/Resource.js** file:

```js
const update = (id, data) => {
  let crtData = read();
  crtData.forEach((i) => {
    if (i.id === id) {
      (i.color = data.color), (i.name = data.name);
    }
  });
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
};
```

Don't forget to add it to the module export in the same file:

```js
module.exports = {
  read,
  add,
  getId,
  update,
};
```

Now we can test our update command. Try running the below in a terminal:

```js
node -e "http.request('http://localhost:3000/resources/2698a34172627119768788a22bb02a', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku update', color: 'orange_update'}))"
```

\*Note the command worked for me but you should replace **2698a34172627119768788a22bb02a** with your own id.

So our [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) call onto the **resources/:id** endpoint works, let's add a similar [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) method in the routes file. Paste it under the **app.post('/:id')** call:

```js
/*
 *  PUT
 *  payload color: string, name: string
 *  returns JSON payload with success message with resource id
 */
app.put("/:id", (req, res) => {
  const payload = req.body;
  console.log(payload);
  const isValid = validatePayload(payload);
  const { id } = req.params;

  if (isValid) {
    const crtData = read();

    const found = crtData.find((i) => i.id === id);
    if (found) {
      const data = payload;
      data.id = id;
      update(id, data);
      return res.send(`item with id ${id} updated successfully`);
    } else {
      res.statusCode = 400;
      return res.end(`item with id ${id} could not be found`);
    }
  }
  res.statusCode = 400;
  return res.end("Some field is missing or is bad X_X");
});
```

Now, we can simply run the below command to test the [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) endpoint too:

```js
node -e "http.request('http://localhost:3000/resources/2698a34172627119768788a22bb02a', { method: 'PUT', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku update2', color: 'orange_update_2'}))"
```

Next, let's add a [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) endpoint too. Paste it in the **/routes/resources.js** file:

```js
/*
 *  DELETE
 *  payload null
 *  returns JSON payload with deleted item id
 */
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const crtData = read();
  const found = crtData.find((i) => i.id === id);
  if (found) {
    deleteItem(id);
    sendOk(res, `resource with id ${id} deleted successfully`);
  } else {
    res.statusCode = 400;
    return res.end(`item with id ${id} could not be found`);
  }
});
```

In the same file, update the **const { read, add, update } = require("../controller/Resource");** to:

```js
const { read, add, update, deleteItem } = require("../controller/Resource");
```

Finally, add the **deleteItem()** method in the **Resource.js** controller file:

```js
const deleteItem = (id) => {
  let crtData = read();
  crtData.forEach((i, index) => {
    if (i.id === id) {
      crtData.splice(index, 1);
    }
  });
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
};
```

Don't forget to also export it:

```js
module.exports = {
  read,
  add,
  getId,
  update,
  deleteItem,
};
```

Now, we can delete a resource with the below command:

```js
node -e "http.request('http://localhost:3000/resources/2698a34172627119768788a22bb02a', { method: 'DELETE', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

\* Don't forget to put your own id in the command.

Now, we need to create 2 more endpoints: 1 to get a resource individually (with a get request to the **/resources/:id** endpoint ) and a simple delete all endpoint, made to the **/resources** url.

Let's start by adding the endpoint for an individual resource. Paste it in the **resources.js** routes file:

```js
/*
 *  GET
 *  payload null
 *  returns JSON payload with respective item
 */
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const item = findById(id);
  if (item) {
    return res.send(item);
  } else {
    res.statusCode = 404;
    return res.end(`resource with id ${id} not found`);
  }
});
```

Test the endpoint with the below command:

```js
 node -e "http.request('http://localhost:3000/resources/32b656a52375984776851a0085792a', { method: 'GET', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

\* Don't forget to put your own id in the command.

Finally, let's add a delete all endpoint:

```js
/*
 *  DELETE ALL
 *  payload null
 *  returns JSON payload with success message
 */

app.delete("/", (req, res) => {
  deleteAll();
  return res.end("resources deleted successfully");
});
```

Next, update the **const { read, add, update, deleteItem, } = require("../controller/Resource");** import in the **/routes/resources.js** file to:

```js
const {
  read,
  add,
  update,
  deleteItem,
  deleteAll,
} = require("../controller/Resource");
```

Finally, add the **deleteAll()** method in the **controller/Resource.js** file:

```js
const deleteAll = () => {
  const data = {
    resources: [],
  };
  fs.writeFileSync("./data/db.json", JSON.stringify(data));
};
```

Also, add the method to the file's export:

```js
module.exports = {
  read,
  add,
  getId,
  update,
  deleteItem,
  deleteAll,
};
```

Now we can try the below command to delete all resources:

```js
 node -e "http.request('http://localhost:3000/resources/', { method: 'DELETE', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

\* Don't forget to put your own id in the command.

The last thing we are going to do before wrapping up, is create a new middleware function, in order to improve a bit the error handling of our application. With the current setup, if we get a badly formatted payload (like: **{name: "test", color: "red" //note ending curly brace missing** ) the app doesn't crash but it just 'spits' out an error and we do not control this at all. Let's create a middleware to catch this error and any other error for this matter. Create a **/middleware** folder and inside of it create a **middleware.js** file and inside of it paste the below:

```js
const checkIfJson = (err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .send("payload is badly formatted or some other error occurred =)!");
  }
  next();
};
module.exports = {
  checkIfJson,
};
```

\*Note how this middleware has 4 arguments (the last one being an error which we can catch and react to). Once we catch that error, we send a custom error response to the client. If no error is caught, we call **next()** and continue the code execution (so if we match any route we respond accordingly).

Next, in the **server.js** import the middleware up top:

```js
const { checkIfJson } = require("./middleware/middleware");
```

Finally, add this line in the **server.js** file to actually use the middleware (put it right under the **app.use(express.json());** line):

```js
app.use(checkIfJson);
```

With this change, if you try to hit any of the endpoint with a bad payload that is missing a curly brace (e.g. **{name: "test" color: "blue"** you will get our custom configured response).

We have now re-implemented our full [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) functionality but this time using the [Express framework](https://expressjs.com/). As you can see, it is much easier than using core [NodeJS](https://nodejs.org/en/about) code. And if we are speaking of code, I have a github repo with all the code at this [Link](https://github.com/StanciuDragosIoan/express-rest-api) if you want to have a look at it.

I think it is very important to know how the node runtime works under the hood in itself before diving into a framework. Thanks a lot for sticking with me so far and I hope you enjoyed rebuilding this little project.

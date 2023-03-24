---
title: "NodeJS REST API"
date: "2022-07-04"
image: rest.png
excerpt: An API Application Programming Interface is a critical component for both front-end and back-end developers as all of them consume data from these APIs in their apps.
isFeatured: true
---

An API [Application Programming Interface](https://www.mulesoft.com/resources/api/what-is-an-api) is a critical component for both front-end and back-end developers as all of them consume data from these APIs in their apps. In this post we will too build a very basic NodeJS API that will allow us to perform [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) Create Read Update Delete operations on our resources.

I have a live instance of the project deployed at [This Link](https://lively-glass-march.glitch.me/). If you go for instance to [https://lively-glass-march.glitch.me/resources](https://lively-glass-march.glitch.me/resources) you can see the current data.

Also, if you want to test it out quick, just run the below cUrl command from a terminal:

```js
    curl -X POST -H "Content-Type: application/json" \
      -d '{"name": "Moka", "color": "blue"}' \
      https://lively-glass-march.glitch.me//resources
```

This command should add a new resource if it does not already exist.

Enough with this, let's now build this very project from scratch, on our local environment.

We'll start our project by initializing an npm package. In the project folder run:

```js
  npm init --y
```

Next, add a start and a dev scripts in the package.json file:

```js
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
```

Next, install nodemon by running:

```js
     npm install --save-dev nodemon
```

Finally, create a **server.js** file and paste the below code into it:

```js
const http = require("http");

const PORT = process.env.port || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hello there =)!");
  } else {
    res.end("404 bad request X_X");
  }
});
server.listen(PORT);
console.log(`SERVER listening on port: ${PORT}`);
```

Now, if you run **npm run dev**, you will have your API started and running. If you go to [http://localhost:5000/](http://localhost:5000/) you will see our response. Same if you go to any other endpoint, as we set a 404-ish route. I call it '404-ish' because it is not [REST-ful](https://www.codecademy.com/article/what-is-rest) compliant.

REST stands for representational state transfer and it is an architectural style, allowing you to structure your application in a certain way, based on certain conventions. You can read more about this on this [Link](https://en.wikipedia.org/wiki/Representational_state_transfer).

A basic thing that a [REST-ful](https://www.codecademy.com/article/what-is-rest) service does is to set up proper [http status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). These are codes that tell you if a request has completed successfully. You can read more about them on [this Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

If you look at our '404-ish' routes, you will see that they all give back a [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) http status code, although they should give back a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404).

![200 status code](200-status-code.png)

Let's set the status codes properly for the 404 route. Add the below line above the **res.end()** line in the else{}:

```js
res.statusCode = 404;
```

Now, if you go to a random route such as /test you get the 404 status code:

![404 status code](404-status-code.png)

\*Note that since this is a GET request, the browser console also throws a 'NOT FOUND' error:

![not found client err](not-found-client-error.png)

\*Also note that the default statusCode property is set to 200. That's why we got a 200 code by default for our '404-ish' route too.

We now have a [REST-ful](https://www.codecademy.com/article/what-is-rest) [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request implemented successfully. I want our little service to be a bit more complex than that though. I want it to have proper routes, set up in a separate file and some validation/security. It will not be a 'bullet-proof' service, but it should teach you some good practices for designing any service (with or without a framework).

For starters, let's create a **router.js** file and paste the below inside:

```js
const router = {
  routeMethod(req, res) {
    const method = req.method;
    const url = req.url;
    switch (method) {
      case "GET":
        this.routeUrl(url, req, res);
        break;
      default:
        res.statusCode = 405;
        return res.end("405 METHOD NOT ALLOWED");
    }
  },

  routeUrl(url, req, res) {
    switch (url) {
      case "/":
        if (req.method === "GET") {
          return res.end("Hello there =)!");
        } else {
          res.statusCode = 405;
          return res.end("METHOD NOT ALLOWED");
        }
      default:
        if (req.method === "GET") {
          res.statusCode = 404;
          return res.end("Page Not Found X_X");
        } else {
          res.statusCode = 405;
          return res.end("METHOD NOT ALLOWED");
        }
    }
  },
};

module.exports = router;
```

Let's now use the router in the **server.js**. Replace the server file contents with the below:

```js
const http = require("http");
const router = require("./router");

const PORT = process.env.port || 5000;

const server = http.createServer((req, res) => {
  router.routeMethod(req, res);
});
server.listen(PORT);
console.log(`SERVER listening on port: ${PORT}`);
```

The **router.js** file will perform the routing for our API and respond with the appropriate [statusCode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and messages for our little service. We want to have full control over which methods we allow and to which URLs we allow a request. The default response is a no no for URLs that we did not specify or REST methods that we did not allow specifically. So if you try a command such as the below from a terminal window:

```js
      curl -X POST http://localhost:5000
```

We get the [405](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) response. Currently our [REST-ful](https://www.codecademy.com/article/what-is-rest) service allows only [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) requests (the server response for any other type of request is a 'Method not allowed' status and we only send back a different response other than the 404-ish one for the **/** route).

I don't really like the way we check for **req.method === 'GET'** in the **routeUrl()** method in the **router.js** file. Let's create a **requestHelper** file and paste the below code to it:

```js
//requestHelper.js

const requestHelper = {
  validateMethod(req, string) {
    if (req.method === string) {
      return true;
    } else {
      return false;
    }
  },
};

module.exports = requestHelper;
```

Next, import the **requestHelper** file up top in the **router.js** file by pasting the below line inside the router, as the first line:

```js
const { validateMethod } = require("./requestHelper");
```

Now, you can replace the **req.method === 'GET'** bits of logic there (there's 2 of them so far) with: **validateMethod(req, "GET")**.

Now everything works just as before, but we have outsourced a bit of logic to a dedicated module. This is a very good practice and I encourage you to always 'break logic up' into meaningful modules.

Let's create a **db.json** file and paste the below inside:

```js
{
        "resources": [
          {
            "name": "Haku",
            "color": "amber",
            "id": "68961358a34980885377524a4a8766"
          },
          {
            "name": "Luka",
            "color": "green",
            "id": "38136754209825b05a81002178108a"
          },
          {
            "name": "Pikachu",
            "color": "blue",
            "id": "4786b076b69074934574300a894835"
          },
        ]
      }
```

This file will work as our database. We will read from it and write to it through our service. In a real application, this is how you would communicate with an actual database so this is good practice.

Let's now set up the **resources/** endpoint in the **router.js**. We will first open the endpoint only for a GET request, enabling us to read all the resources.

In the **routeUrl()** method, inside the **router.js** file, add the below case to the [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) there, just above the 'default' case:

```js
   case "/resources":
      if (validateMethod(req, "GET")) {
        const resData = readDB();
        return res.end(resData);
      } else {
        res.statusCode = 405;
        return res.end("METHOD NOT ALLOWED");
      }

```

So we are allowing the **/resources** url to be hit with a [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request and we are returning some data from it. The data is being returned through the **readDB()** method call, which we don't have yet. For now, add the below line at the top of the **router.js** file:

```js
const { readDB } = require("./resourceController");
```

Now, let's create the **resourceController.js** file and paste the below code to it:

```js
const fs = require("fs");
const resource = {
  readDB() {
    const rawJSONData = JSON.parse(fs.readFileSync("db.json"));
    const JSONresponse = JSON.stringify(rawJSONData);
    return JSONresponse;
  },
};

module.exports = resource;
```

Now we can read resources, let's make it so that we can add resources too. First we will set the **/resources** endpoint so it can accept [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) requests too.

Add the below case to the **routeMethod()** method from the **router.js** file, just above the default case:

```js
    case "POST":
      this.routeUrl(url, req, res);
      break;
```

Next, replace the log it in the **else {}** block for the **/resources** endpoint with the below:

```js
   else {
        grabPayload(req, res);
      }
      break;
```

We are no longer setting a [405](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) statusCode and sending a 'Method not allowed' response. Instead, we are calling a **grabPayload** method.

This method will belong to a new module called **securityHelper**. Import it up top in the **router.js** file by adding the below line:

```js
const { grabPayload } = require("./securityHelper");
```

Now create the **securityHelper** file and paste the below code to it:

```js
const { add } = require("./resourceController");
const securityHelper = {
  grabPayload(req, res) {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const isPayloadGood = securityHelper.validatePayload(parsedBody);
      if (isPayloadGood) {
        const itemToAdd = {};
        itemToAdd.name = JSON.parse(parsedBody).name;
        itemToAdd.color = JSON.parse(parsedBody).color;
        itemToAdd.id = securityHelper.getId();

        if (req.url === "/resources") {
          add(JSON.stringify(itemToAdd), res);
        }
      } else {
        res.statusCode = 400;
        return res.end(
          "BAD PAYLOAD X___X some field is \nmissing or is bad X_x"
        );
      }
    });
  },

  validatePayload(rawPayload) {
    try {
      const payload = JSON.parse(rawPayload);
      if (payload.hasOwnProperty("name") && payload.hasOwnProperty("color")) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  },

  getId() {
    const id =
      Math.random().toString(12).substring(2, 17) +
      Math.random().toString(12).substring(2, 17);
    return id;
  },
};

module.exports = securityHelper;
```

In the **securityHelper** we are grabbing the payload (so we are reading the data submitted via the [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request), we are validating it, and if everything's good, we are asigning it a new ID by calling the **getId()** method and then saving it to our 'database' by calling the **add** method which is imported at the top of the file and is part of the resourceController.

Replace the contents of **resourceController** with the below:

```js
const fs = require("fs");
const resource = {
  add(payload, res) {
    const crtData = JSON.parse(resource.readDB()).resources;
    const parsed = JSON.parse(payload);
    const found = crtData.filter(
      (i) => i.name === parsed.name && i.color === parsed.color
    );
    if (found.length > 0) {
      res.statusCode = 400;
      return res.end("Duplicate Entry X__X");
    }
    resource.writeToDB(payload, res);
  },

  readDB() {
    const rawJSONData = JSON.parse(fs.readFileSync("db.json"));
    const JSONresponse = JSON.stringify(rawJSONData);
    return JSONresponse;
  },

  writeToDB(data, res) {
    const crtResources = JSON.parse(resource.readDB()).resources;
    crtResources.push(JSON.parse(data));
    const dataToWrite = JSON.stringify({ resources: crtResources });
    fs.writeFileSync("db.json", dataToWrite);
    res.statusCode = 200;
    return res.end("resource added successfully ^__^!");
  },
};

module.exports = resource;
```

Now, we can create new resources, and thanks to the **validatePayload()** method, we are only storing the name and color properties. Any other properties that might be sent will be stripped away. Let's test our new endpoint by running the below from a terminal:

```js
node -e "http.request('http://localhost:5000/resources', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku', color: 'blue', extraProp: 'will be stripped'}))"

```

The command above, will add a new resource with only the 'color' and 'name' properties (and strip the additional one), to the **db.json** file. The server response to that will be a statusCode of [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) and the 'resource added successfully ^\_\_^!' string.

\*Note that if you try running the command a second time, you will get a [400](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) 'Duplicate Entry' response from our server. Also, regarging validation, remember that we are only practicing the basics here. So for instance, we are not validating data types at all. This means that running a command such as the one below, will work and create a new resource:

```js
 node -e "http.request('http://localhost:5000/resources', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 4, color: 123}))"
```

However, given the current setup of our project, I bet you can easily see how simple it would be to implement that, for instance by changing the **validatePayload** method from the securityHelper to the below:

```js
 validatePayload(rawPayload) {
        try {
          const payload = JSON.parse(rawPayload);
          if (
            Object.prototype.hasOwnProperty.call(payload, "name") &&
            Object.prototype.hasOwnProperty.call(payload, "color") &&
            typeof payload.name === "string" &&
            typeof payload.color === "string" &&
            payload.name.length <= 12 &&
            payload.color.length <= 12
          ) {
            return true;
          }
          return false;
        } catch (err) {
          console.log(err);
        }
      }
```

\*note how I also limited the lenght of the payload to be sent.

So we can **create** and **read** data from our API. Let's make it so that a GET request to **/resources/:id** will get us only the resource with the respective id. We will use this setup to implement 'update' and 'delete' endpoints too.

In the **router.js** file, in the **routerUrl()** method we need to change the 'default' case for the switch statement. Change it to the below:

```js
 default:
        const resourceId = req.url.split("/")[2];
        if (resourceId && !req.url.split("/")[3]) {
          if (validateMethod(req, "GET")) {
            const resource = findResource(resourceId);
            if (resource) {
              res.statusCode = 200;
              return res.end(JSON.stringify(resource));
            }
            res.statusCode = 404;
            return res.end(`No resource found for ID: ${resourceId}`);
          } else if (validateMethod(req, "POST")) {
            grabPayload(req, res);
          }
          return;
        }

        if (validateMethod(req, "GET")) {
          res.statusCode = 404;
          return res.end("Page Not Found X_X");
        } else {
          res.statusCode = 405;
          return res.end("Method not allowed X_X");
        }

```

Next we need to implement the findResource() method in the resourceController. Here it is:

```js
    findResource(id) {
        const crtResources = JSON.parse(resource.readDB()).resources;
        const found = crtResources.find((i) => i.id === id);
        if (found) {
          return found;
        }
        return null;
      },
```

Next, import the **findResource()** method in the **router.js** by adding it to the corresponding import:

```js
const { readDB, findResource } = require("./resourceController");
```

Now we can request individual resources. Paste the below command in a terminal prompt and hit enter:

```js
   node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'GET', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

\*Note that the **id** must be real so copy one of the resources you currently have in the **db.json file**.

Now we can easily implement the **update** endpoint. First we will set it up so that it can accept [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) requests on the **/resources/:id** endpoint. After that, we will allow updates via the [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) method too.

We need to implement an **update()** method in the **resourceController**. Copy paste it from below:

```js
update(payload, req, res) {
    let crtResources = JSON.parse(resource.readDB()).resources;
    const parsed = JSON.parse(payload);
    const idToUpdate = req.url.split("/")[2];
    let updateSuccess = false;

    crtResources.map((i) => {
      if (i.id === idToUpdate) {
        i.name = parsed.name;
        i.color = parsed.color;
        updateSuccess = true;
      }
    });

    const dataToWrite = JSON.stringify({ resources: crtResources });
    fs.writeFileSync("db.json", dataToWrite);

    if (updateSuccess) {
      return res.end(
        `Resource with id: ${idToUpdate} updated successfully.. using the ${req.method} http method`
      );
    } else {
      res.statusCode = 400;
      return res.end(
        `Resource with id: ${idToUpdate} could not be found X___X`
      );
    }
  }
```

Next, add the **update** method in the corresponding import in **securityHelper.js** (that's the import for the **resourceController.js**):

```js
const { add, update } = require("./resourceController");
```

Next, add an else{} block in the grabPayload() method of the **securityHelper**:

```js
if (req.url === "/resources") {
  add(JSON.stringify(itemToAdd), res);
} else {
  update(parsedBody, req, res);
}
```

Restart the server and you can update a resource with a command such as:

```js
 node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku update', color: 'orange'}))"
```

\*remember that the id must be real so replace it with one of yours (otherwise you will get a [400](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) statusCode).

\*also notice that our validation is still in place and we cannot send bad data types so a command such as the one below will not work and will throw the 400 error:

```js
   node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 2, color: 'orange'}))"
```

We could have also made it so that we throw a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) error here (this is the beauty of REST as we can implement our service however we see fit).

Also, if you add extra fields, they will be stripped. Try that with a command such as:

```js
 node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'POST', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku update2', color: 'orange', extra: 'will not be stored'}))"
```

We now also want to allow updates via the PUT method. Currently if we try a command such as:

```js
 node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'PUT', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end(JSON.stringify({name: 'Miku update PUT', color: 'orange'}))"
```

We'll get a [405](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) error.

In order to allow the [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) method, you only need to add an additional case for it in the **router.js** file in the **routeMethod()** method:

```js
    case "PUT":
        this.routeUrl(url, req, res);
        break;
```

Add the case right above the default one.

Finally, in the **router.js** switch statement, in the default case, you need an extra **else if(){}** statement:

```js
  else if (validateMethod(req, "PUT")) {
        grabPayload(req, res);
      }
```

Now you can send the command with PUT from above again and it will work.

For better readability, modify the **res.end()** call in the **update()** method to the below:

```js
return res.end(
  `Resource with id: ${idToUpdate} updated successfully.. using the ${req.method} http method`
);
```

Now you can also see the method used to update a resource (['PUT'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or ['POST'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)) in the server response.

Finally, let's implement two [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) endpoints. One will be **/resources/:id** to delete individual resources, and the second one will be only **/resources** to delete all resources. First, let's enable the [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) method in the router.js file in the **routeMethod()** method. Do that by adding one more case above the default one:

```js
  case "DELETE":
        this.routeUrl(url, req, res);
        break;
```

Next, in the **resourceController.js** add a **deleteEntry()** method. Paste it there from below:

```js
   deleteEntry(id) {
        let crtResources = JSON.parse(resource.readDB()).resources;
        crtResources.map((i, index) => {
          if (i.id === id) {
            crtResources.splice(index, 1);
          }
        });
        const dataToWrite = JSON.stringify({ resources: crtResources });
        fs.writeFileSync("db.json", dataToWrite);
      },
```

Add the **deleteEntry** in the **securityHelper.js** import up top:

```js
const { add, update, deleteEntry } = require("./resourceController");
```

In the same **securityHelper.js** file add the below **grabForDelete()** method:

```js
   grabForDelete(req, res, resourceId) {
        deleteEntry(resourceId);
        return res.end(`Resource with id ${resourceId} deleted successfully`);
      },
```

Next, in the **router.js** add the **grabForDelete()** method up top in the import for **securityHelper.js**:

```js
const { grabPayload, grabForDelete } = require("./securityHelper");
```

Finally, add one more **else if(){}** statement in the default case of the **routeUrl()** method:

```js
   else if (validateMethod(req, "DELETE")) {
        const resource = findResource(resourceId);
            if (resource) {
              grabForDelete(req, res, resourceId);
            }
            res.statusCode = 400;
            return res.end(`No resource exists for ID: ${resourceId}`);
      }

```

Restart your server and you can now delete a resource with a command such as:

```js
node -e "http.request('http://localhost:5000/resources/1b62940a1b79a418b5778235690748', { method: 'DELETE', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

\*note that if you run the command a second time, you will get a 400 status code.

Finally, let's make the **deleteAll** endpoint. A ['DELETE'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) request on the endpoint **/resources** should delete all our resources.

First, let's add one more **else if() {}** block in the **routeUrl()** method of the **router.js**, in the **/resources** case:

```js
  else if (validateMethod(req, "DELETE")) {
        deleteAll();
        return res.end("All resources have been deleted successfully");
      }
```

Next, add the **deleteAll** import up top in the **router.js** file:

```js
const { readDB, findResource, deleteAll } = require("./resourceController");
```

Finally, paste the **deleteAll()** method in the **resourceController.js**:

```js
  deleteAll() {
        const clearData = JSON.stringify({ resources: [] });
        fs.writeFileSync("db.json", clearData);
      },

```

Now, we can delete all resources with by running the below command in a terminal:

```js
 node -e "http.request('http://localhost:5000/resources', { method: 'DELETE', headers: {'content-type': 'application/json'}}, (res) => res.setEncoding('utf8').once('data', console.log.bind(null, res.statusCode))).end()"
```

We have now implemented full [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) functionality for our **REST API** and we have some good security built into it. You have also learned how to structure code in modules and make them work together. Thanks for sticking so far. In the next article we will re-build this API using [Express](https://expressjs.com/).

Thanks for sticking with me till now. If you want to see the [Code](https://github.com/StanciuDragosIoan/restful_api_node_js) for the project please do that. Run the project locally and play more with it if you need to in order to better understand it.

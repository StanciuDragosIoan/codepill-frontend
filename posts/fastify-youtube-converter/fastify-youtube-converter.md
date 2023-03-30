---
title: "Fastify Youtube Converter"
date: "2022-12-30"
image: fastify.jpeg
excerpt: Fastify is a new NodeJS upcoming framework and it's gaining quite some popularity and we are going to build a Youtube Converter app.
isFeatured: true
---

[Fastify](https://www.fastify.io/) is a new [NodeJS](https://nodejs.org/en/about) upcoming framework and it's gaining quite some popularity. As its name implies, it is supposed to be fast and performance benchmarks do indicate that. You can start reading on that [here](https://www.fastify.io/benchmarks/).

[Fastify](https://www.fastify.io/) is a modern framework that aims to provide better developer experience and it is based on a [plugin](https://www.fastify.io/docs/latest/Reference/Plugins/) ecosystem. A plugin is basically a custom [NodeJS](https://nodejs.org/en/about) module, that you can use in your application (an there is a complex ecosystem of such plugins).

We will build a **Youtube Converter** using it. If you want to see the project live first, I have it deployed [here](https://interesting-cyan-exception.glitch.me/).

Start by initializing an npm project with:

```js
 npm init --y
```

Let's now install [fastify](https://www.fastify.io/). Run the below command:

```js
 npm i fastify
```

Add the **start** and **dev** scripts in your **package.json** as per below:

```js
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

Next, install [nodemon](https://www.npmjs.com/package/nodemon).

```js
  npm i -D nodemon
```

Finally, create a **server.js** file in your project and paste the below code inside:

```js
// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", async (request, reply) => {
  return { message: "welcome to my fastify App" };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
```

Run **npm run dev** and check your application in the browser, by going to [http://localhost:3000](http://localhost:3000).

So far our **server.js** imports [fastify](https://www.fastify.io/) and initialises it, declares a route and runs the server (the [fastify instance](https://www.fastify.io/docs/latest/Guides/Serverless/#creation-of-fastify-instance)). A very interesting point for me when I first used this framework was the fact that it logs a bunch of details on every request. However, the output of the log is a bit messy, I can barely figure out what it does. Note that for now, we are only passing an object like: **{ logger: true }** to the [fastify instance](https://www.fastify.io/docs/latest/Guides/Serverless/#creation-of-fastify-instance). Let's modify that a bit. Start by installing [pino-pretty](https://github.com/pinojs/pino-pretty).

```js
 npm i pino-pretty
```

Next, paste the below "logging configuration" in **server.js** above everything else:

```js
//logging config
const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const environment = "development";
```

Finally, replace the **logger:true** option with:

```js
logger: envToLogger[environment];
```

[Pino-pretty](https://www.npmjs.com/package/pino-pretty?activeTab=readme) is a library that will make our logs prettier and clearer.

Once installation finished, start the server again with **npm run dev** and you will have much better logs with much clearer contents. Note how they are indented better and we see each request logged individually. I don't know for you but for me, having very clear logs is extremely important during work on any project.

In order to build our [Youtube Converter](https://defiant-trusting-block.glitch.me/) we will need fastify to serve static files. We use a plugin for this. We have to install it and register it. Fastify uses heavily this plugin ecosystem so let's install one by running:

```js
   npm i @fastify/static
```

[fastify-static](https://github.com/fastify/fastify-static) is used to serve static files from [fastify](https://www.fastify.io/).

Once the command has run, paste the below block in **server.js** right after the fastify definition:

```js
fastify.register(require("@fastify/static"), {
  root: require("path").join(__dirname, "templates"),
});
```

Next, create a **/templates** directory in your project. Inside of it, create an **index.html** file and paste the below code to it:

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
    .alert{
      margin-top:2rem;
      text-align:center;
      color: red;
      font-weight:600;
      border: 2px solid red;
    }

    .ok {
      margin-top:2rem;
      text-align:center;
      color: green;
      font-weight:600;
      border: 2px solid green;
    }
  </style>
  </head>

<body>
  <div class="container">
    <div class="row mx-auto">
      <div class="col-sm-12 col-md-7 mx-auto card my-5 p-5">
        <h1 class="text-center">Youtube Conveter</h1>
      </div>


      <div class="col-sm-12 col-md-7 mx-auto card p-5">
        <form>
          <h3 class="text-center">Paste in your youtube url</h3>
          <div class="mb-3 form-check">
            <label for="url" class="form-label">
              URL
            </label>
            <input type="url" class="form-control" id="urlInput" name="url" />
            <p class="mt-1" id="urlAlert"></p>
          </div>


          <div class="my-5 form-check">
            <label for="format" class="form-label">Download Format</label>
            <select class="form-select" id="format" required>
              <option selected disabled value="">Choose format</option>
              <option>audio</option>
              <option>video</option>
            </select>
            <p id="formatAlert"></p>
          </div>

          <div class="container">
            <button id="submitBtn" class="btn btn-primary d-block mx-auto w-100">
              Convert</button>

              <div class="parent">


              <button id="downloadBtn" class="btn btn-warning mx-auto w-100 mt-5">


              </div>

              <div class="spinner">
                <button class="btn btn-primary mx-auto w-100 mt-5" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Converting...</span>
                </button>
              </div>
             </div>
          </div>

      </div>



      </form>
    </div>
  </div>
  </div>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script>
    const btn = document.querySelector("#submitBtn");
    const urlInput = document.querySelector("#urlInput");
    const formatInput = document.querySelector("#format");
    const downloadBtn = document.querySelector("#downloadBtn");
    const parent = document.querySelector(".parent")
    parent.style.display = "none";
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "none";


  </script>
</body>

</html>
```

Next, replace the logic in the declared route by the code below:

```js
fastify.get("/", (req, reply) => {
  reply.sendFile("index.html");
});
```

Now, if you go to [http://localhost:3000](http://localhost:3000) you get to see our bootstrap5 form displayed. [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) is a very powerful CSS framework, which is perfect for quick prototypes such as this little application that we are building. You can read more about it [here](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

Before moving on, we need to add some more custom [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) to our script. I want the form to be validated and to submit some input to our back-end. We will not use the default [bootstrap validation](https://getbootstrap.com/docs/5.0/forms/validation/) as it works on submit, whereas I want our application to 'validate' our form while the user types (so for instance, if they type a bad url, the form should become invalid even before attempting to hit the 'Convert' button). Therefore, in the **index.html** file in the last <script> tag, just add the below custom code:

```js
const formData = {};

const displayAlert = (selector, msg, className) => {
  document.querySelector(selector).innerHTML = msg;
  document.querySelector(selector).className = className;
};

const valdiateUrl = (url) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
};

const grabUrl = () => {
  const url = urlInput.value;

  const isValidUrl = valdiateUrl(url);
  if (isValidUrl) {
    formData.url = url;
    displayAlert("#urlAlert", "Url OK", "ok");
  } else {
    displayAlert("#urlAlert", "invalid Url", "alert");
  }
};

const grabFormat = (e) => {
  formData.format = e.target.value;
};

const submitData = async (e) => {
  e.preventDefault();
  if (!formData["url"]) {
    displayAlert("#urlAlert", "missing Url", "alert");
  } else if (!formData["format"]) {
    displayAlert("#formatAlert", "missing Format", "alert");
  } else {
    displayAlert("#urlAlert", "", "");
    displayAlert("#formatAlert", "", "");
    const { format } = formData;
    try {
      spinner.style.display = "block";
      parent.style.display = "none";
      const reply = await axios.post(`/${format}`, formData);
      triggerDownload(reply);
    } catch (err) {
      console.log(err);
    }
  }
};

const triggerDownload = (reply) => {
  spinner.style.display = "none";
  parent.style.display = "block";
  downloadBtn.ext = reply.data.ext;
  let iconPlaceholder;
  if (reply.data.ext === "mp3") {
    iconPlaceholder = `<i class="fas fa-music"></i>`;
  }
  if (reply.data.ext === "mp4") {
    iconPlaceholder = `<i class="fas fa-film"></i>`;
  }

  if (reply.data.isTooLong === true) {
    downloadBtn.innerHTML = `<h1>Video size is too long</h1>`;
    downloadBtn.disabled = true;
  } else {
    downloadBtn.innerHTML = `Download ${reply.data.title} .${downloadBtn.ext} ${iconPlaceholder}`;
    downloadBtn.id = reply.data.id;
  }
};

const downloadSong = async (e) => {
  e.preventDefault();
  const id = e.target.id;
  const ext = e.target.ext;
  const rootDomain = window.location.origin;
  window.open(`${rootDomain}/download/${id}?extension=${ext}`, "_blank");
};

btn.addEventListener("click", submitData);

downloadBtn.addEventListener("click", downloadSong);
urlInput.addEventListener("input", grabUrl);
formatInput.addEventListener("input", grabFormat);
```

We have added a bunch of methods, but I will discuss only 3 of them. **submitData()** submits the data using the [axios](https://axios-http.com/docs/intro) library. It makes an [http request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) from the client with the user input data (if it passes the validation) so if they paste in a good url and choose a format.

The **triggerDownload()** method shows the download button and sets some attributes onto it (such as disabled if the video is too long or id so that we know which song we want to download).

Finally the **downloadSong()** method opens a new tab and sends 2 parameters (the video/song id as a url parameter and the extension as a query string parameter so that we can download a specific song and a specific format). Note that we want our users to choose if they want to download an [mp3 audio](https://en.wikipedia.org/wiki/MP3) song or a full [mp4 video](https://en.wikipedia.org/wiki/MP4_file_format).

Now we are pretty much done with the front, it's time to move to the back-end.

Let's start by installing [ytdl-core](https://www.npmjs.com/package/ytdl-core) so run the below command:

```js
    npm i ytdl-core
```

Import [ytdl-core](https://www.npmjs.com/package/ytdl-core) and [fs](https://nodejs.org/api/fs.html) up top in the **server.js** file:

```js
const ytdl = require("ytdl-core");
const fs = require("fs");
```

Next, add the below method in the **server.js** file:

```js
const downloadContentAndSendLink = async (srcUrl, ext, reply, opts = {}) => {
  const videoID = ytdl.getVideoID(srcUrl);
  let info = await ytdl.getInfo(videoID);
  const { videoDetails } = info;
  const { title } = videoDetails;

  let isTooLong = false;
  if (videoDetails.lengthSeconds > 7200) {
    isTooLong = true;
    return reply.send({ id: videoID, title, ext, isTooLong });
  }

  ytdl(srcUrl, opts)
    .pipe(fs.createWriteStream(`./templates/downloads/${videoID}.${ext}`))
    .on("finish", async function () {
      return reply.send({ id: videoID, title, ext, isTooLong });
    });
};
```

This method reads the [url](https://en.wikipedia.org/wiki/URL) from the [request.body](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction) (note that just as [Express](https://expressjs.com/), [fastify](https://www.fastify.io/) also uses a [request](https://www.fastify.io/docs/latest/Reference/Request/#request) and a [response](https://www.fastify.io/docs/latest/Reference/Reply/#reply) object, which it calls [reply](https://www.fastify.io/docs/latest/Reference/Reply/#reply)), it checks the length of the video (we have set a limit of 7200 seconds so of 2 hrs) and if length is good it writes a [stream](https://nodejs.org/api/stream.html) with the video to the downloads directory. On the **finish** event, it sends the response to the client (a payload which we use to display the download button in our app and set up the extension and file id in the url on the front).

Create a **/templates/downloads** directory (remember that we registered as 'root' for [fastify-static](https://github.com/fastify/fastify-static) the 'templates' directory). That's where we will be saving our downloaded songs/videos.

Now, we can set up a route for the **/audio** format. Add it in the **server.js** file:

```js
fastify.post("/audio", async (request, reply) => {
  const srcUrl = request.body.url;

  await downloadContentAndSendLink(srcUrl, "mp3", reply, {
    filter: "audioonly",
    format: "mp3",
  });
});
```

Now, if you paste a youtube link in the interface, choose the 'audio' file in the dropdown and hit convert, you will see that the song is actually saved as an **mp3** file in the **/templates/downloads** directory on the server.

All looks good except for the fact that fastify throws an exception with 'reply already sent'. I've had this warning a few times before and it was quite annoying until I figured out how to deal with it. The warning looks like this:

![fastify reply already sent](fastify-reply-already-sent.png)

We need to **"promisify"** our function which is currently using a callback style. [Fastiy](https://www.fastify.io/) thinks these callbacks are unpredictable and throws warnings or errors for them. We are waiting for the 'finish' event to finish. We could move the [reply.send()](https://www.fastify.io/docs/latest/Reference/Routes/#async-await) call outside the 'finish' callback but that would mean that if our downloading takes longer, we generate the download button on the client, without actually having finished downloading the content on the server. In order to fix this in a more elegant way, we need to use a little utility function called [promisify](https://nodejs.org/api/util.html) that wraps the callback-style function in a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Import it up top in the **server.js**:

```js
const { promisify } = require("util");
```

Next, wrap the **downloadContentAndSendLink()** method in [promisify()](https://nodejs.org/api/util.html) like so:

```js
const pDownloadAndSend = promisify(downloadContentAndSendLink);
```

Finally in the **/audio** route, call the **pDownloadAndSend()** method instead of **downloadContentAndSendLink()**.

Try downloading a song again (audio format only for now) and you will see that no [fastify](https://www.fastify.io/) will throw no more warning.

Next, under the [fs](https://nodejs.org/api/fs.html) import up top add:

```js
const { readdirSync, unlinkSync, existsSync, mkdirSync } = fs;
```

Once that done, add the below block of code that will automatically create the downloads directory if it does not exist. Add it right under the **const fastify = ...** line:

```js
//create downloads dir if it does not exist
const downloadsDir = "./templates/downloads";
if (!existsSync(downloadsDir)) {
  mkdirSync(downloadsDir);
}
```

Finally we can set up the **/download** route so we'll be able to actually 'download' our youtube song from the client too (so far ) we have been downloading it only on the server. Paste the route in **server.js**:

```js
fastify.get("/download/:id", async (request, reply) => {
  const { id } = request.params;
  let info = await ytdl.getInfo(id);
  const { videoDetails } = info;
  const { title } = videoDetails;
  const { extension } = request.query;

  return reply.download(
    `./downloads/${id}.${extension}`,
    `${title}.${extension}`
  );
});
```

Now, if we click on the **Download** button in the client interface, we get the song downloaded from our server. This all seems to be working well, let's add the **/video** route too, so we can download in [mp4](https://en.wikipedia.org/wiki/MP4_file_format) format too. Paste it in the server.js:

```js
fastify.post("/video", async (req, reply) => {
  const srcUrl = req.body.url;
  await pDownloadAndSend(srcUrl, "mp4", reply);
});
```

Try submitting the same link, but this time choose the [video](https://en.wikipedia.org/wiki/Video_file_format) format in the interface. Next, once a new download button has been generated, click it and download your video. Try testing with more videos, even longer ones (try even with a more than 2 hr video, to see how everything works and how you get a 'video too long' response).

Our application is pretty much done, I want to do only 2 more things. First, I want the songs/videos to be deleted from the server say 1 minute after their first client download. We don't want our server to get overcrowded with data so that our app will crash. Furthermore, I also want to set up a cron job that will completely delete all the stuff in the **downloads** directory once a day, so that if someone just sends links to our server and downloads stuff in there, without actually downloading it on the client and triggering our custom delete logic, the videos/songs are still deleted automatically every 24 hrs.

Let's start with the bit of logic that deletes every video/song from our server 1 minute after it has been downloaded from the client. In order to do that, we just have to add the following bit of code in the **/download** route:

```js
//delete downloaded file after 1 min
setTimeout(async () => {
  const dir = "./templates/downloads";
  readdirSync(dir).forEach((f) =>
    f === `${id}.${extension}` ? unlinkSync(`${dir}/${f}`) : null
  );
}, 60000);
```

\*add the above code in the **/download** route, right above the return **reply.download()** line.

Next, if you try downloading your song again, from the client, it will get deleted in 1 min.

Now, we only need to set up the cron job that will delete everything in the **/downloads** directory once a day. We need to install another plugin called [fastify-cron](https://www.npmjs.com/package/fastify-cron). Run the below command:

```js
    npm i fastify-cron
```

Once that's done, import it up top in the **server.js** file:

```js
const fastifyCron = require("fastify-cron");
```

Next, we need to configure it. Paste this block in the **server.js** file, right above the block that creates the downloads directory:

```js
//set up cron
fastify.register(fastifyCron, {
  jobs: [
    {
      // Only these two properties are required,
      // the rest is from the node-cron API:
      // https://github.com/kelektiv/node-cron#api
      cronTime: "0 0 * * *", // Everyday at midnight UTC

      // Note: the callbacks (onTick & onComplete) take the server
      // as an argument, as opposed to nothing in the node-cron API:
      onTick: async () => {
        const dir = "./templates/downloads";
        readdirSync(dir).forEach((f) => unlinkSync(`${dir}/${f}`));
      },
    },
  ],
});
```

Finally, at the bottom of **server.js** replace the line **await fastify.listen({ port: 3000 });** with:

```js
await fastify.listen({ port: 3000 }, () => {
  fastify.cron.startAllJobs();
});
```

If you want to test the cron job a bit, you can modify the time for it based on your local time on the machine (or you can put simply **"\* \* \* \* \*"**) to trigger it.

We have now finished implementing our functionalities and even set up a cron tab to clean up our server downloads. If you want to check out the code for this project, you can do so by checking this [GitHub repo](https://github.com/StanciuDragosIoan/youtube-converter).

Thanks for sticking with me so far, and I really hope you've enjoyed this project.

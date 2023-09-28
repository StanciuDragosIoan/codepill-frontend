---
title: "Anime Search Engine"
date: "2023-09-28"
image: mmd.jpg
excerpt: It's been a long time since I last wrote a blog post. Lately I have been pretty busy (｡•́︿•̀｡). This time we are going to build a quick and cool Anime/Manga search engine.
isFeatured: true
---

It's been a long time since I last wrote a blog post. Lately I have been busy with the blog refactoring and with a bunch of other projects but that's no more. This time we are going to build a quick and cool [Anime/Manga search engine](https://anime-search-engine.netlify.app/) application.\
\
We are going to use the [MyAnimeList API](https://rapidapi.com/felixeschmittfes/api/myanimelist) to pull some useful data out of it. We are also using the API through [Rapid API](https://rapidapi.com/) which is a hub allowing us to use APIs and enhancing them with some functionality.\
\
As for [MyAnimeList](https://myanimelist.net/) I hope there's no need to introduce this **awesome website** (づ ᴗ \_ᴗ)づ ♡ to you guys.\
\
But enough with the chit-chat, let's get on to coding. This will be a simple project that will be using only [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), and [Vanilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript), nothing else but this is pretty powerful stuff on its own.\
\
Open an **index.html** file and paste the below inside:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="anime.css" />
    <title>アニメ</title>
  </head>
  <body>
    <header>
      <!-- <h1>アニメ</h1> -->
    </header>
    <!-- images -->
    <div class="container-cards">
      <div class="cards">
        <div class="card">
          <img src="./assets/rin.webp" alt="kagamine rin vocaloid" class="main pt-2" />
          <div class="name" style="color: #f6d349">
            Suggest <br />Anime
            <button class="box-input btn" id="getAnime">Suggest</button>
          </div>
          <div class="bg" style="background-color: #f6d349"></div>
        </div>
        <div class="card">
          <img src="./assets/miku.png" alt="hatsune miku vocaloid" class="main" />
          <div class="name" style="color: #00caea">
            Anime
            <input
              class="box-input"
              type="text"
              id="searchAnime"
              placeholder="Enter title"
            />
          </div>
          <div class="bg" style="background-color: #00caea"></div>
        </div>
        <div class="card">
          <img src="./assets/luka.webp" alt="megurine luka vocaloid" class="main pt-2" />

          <div class="name" style="color: #ffadbd">
            Manga
            <input
              class="box-input"
              type="text"
              id="searchManga"
              placeholder="Enter title"
            />
          </div>
          <div class="bg" style="background-color: #ffadbd"></div>
        </div>
        <div class="card">
          <img src="./assets/teto.png" alt="kasane teto vocaloid" class="main" />

          <div class="name" style="color: #e14f5a">
            Suggest<br />
            Manga
            <button class="box-input btn" id="getManga">Suggest</button>
          </div>
          <div class="bg" style="background-color: #e14f5a"></div>
        </div>
      </div>
    </div>

    <img class="loader" src="./assets/cat.webp" alt="cat spinner" />

    <div id="result" class="container"></div>
    <div id="characters" class="container"></div>

    <div class="not-found">
      <h2>Unfortunately no title was found for your query >◠( ཀ ヘ ཀ)◡&lt;</h2>
      <img src="./assets/not-found.gif" alt="anime girl" />
    </div>

    <div id="more" class="container centered"></div>
    <script src="anime.js"></script>
  </body>
</html>


```

For the image assets just download the **_/assets_** directory from the [github repo](https://github.com/StanciuDragosIoan/anime-search-engine). Make sure you copy/paste the directory alongside the html file or the app won't look/work good.\
\
Let's start working on the **anime.css** file and add the styles. Create the file and paste inside the below:

```js
@import url("https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Roboto:wght@100&display=swap");

* {
  box-sizing: border-box;
}

body {
  background-color: #fff;
  font-family: "Caveat Brush", cursive;
  margin: 0;
}

/* Header */
header {
  background-image: url("./assets/showcase.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  position: relative;
  height: 40vh;
  margin-bottom: 2rem;
}

header::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}


```

So apart from some basic formating what we are doing is apply some background to the [header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) element, we center everything in it and then we use the [::after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) pseudo-selector to style the slightly dark overlay. This is all of course to bring more attention to the lovely づ ᴗ \_ᴗ)づ ♡ [vocaloids](https://vocaloid.fandom.com/wiki/Vocaloid_Wiki) in there!\
\
Let's next add some button styles, just paste them underneath in the css file:

```js

/* buttons */
button {
  cursor: pointer;
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 32px !important;
  padding: 13px 30px;
}

#getAnime {
  background: #f6d349;
}

#getManga {
  background: #e14f5a !important;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

/* small utilities */
.pt-2 {
  padding-top: 2rem;
}

.center {
  text-align: center;
}

.ui-card {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.ui-card:hover {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: 1s;
  transform: scale(1.01);
}

```

These are simple button styles that will make our buttons look cool and some small utility classes that will help us display everything in a nicer way. Let's next do the main cards with the 4 characters:

```js
/* main characters cards */
.box-input {
  display: block;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  padding: 15px 30px;
  width: 170px;
  font-family: "Caveat Brush", cursive;
}

.cards {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-flow: row wrap;
  gap: 4rem;
  margin-bottom: 2rem;
}

.card {
  border-radius: 2rem;
  width: 20rem;
  min-width: 15rem;
  min-height: 15rem;
  overflow: hidden;
  position: relative;
  transition: all 0.25s ease-in-out;
}

.card img {
  width: 10rem;
}

.name {
  position: absolute;
  font-size: 3rem;
  font-weight: 800;
  top: 5rem;
  line-height: 0.8;
  transition: all 0.25s ease-in-out;
}
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  transition: all 0.25s ease-in-out;
}
.main {
  position: absolute;
  z-index: 999;
  transform: translateX(2rem);
  transition: all 0.25s ease-in-out;
}

.card:hover > .bg {
  transform: scaleY(0);
}
.card:hover > .main {
  transform: translateX(10rem);
}
.card:hover {
  min-width: 20rem;
}
.card:hover > .name {
  font-size: 4.2rem;
  margin-top: -2rem;
}

```

The styles for the cards are pretty self explanatory, however I will insist on 2 aspects. The first one is the relative position of the **_.card_** class (this allows us to position the **_.main_** class images properly) and the same thing happen with the **_.bg_** class. Relative containers allow us to position absolute positioned children perfectly inside. You can read more about this [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position). \
\
The second aspect is the [scaleY](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleY) property which makes the colourful background disappear and shows the underlying search field or button and the [translateX](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX) property which just moves the images to the right for some nice effect.\
\
Next, let's add the styles for the spinner image and the not found one:

```js

/* spinner and not found */
.loader {
  display: none;
  margin: 2rem auto;
  border-radius: 50%;
  width: 20rem;
  height: 20rem;
}

.not-found {
  background: linear-gradient(to bottom, #ff6b6b, #ffd166);
  padding: 2rem;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  display: none;
}

.not-found img {
  display: block;
  margin: auto;
  border-radius: 50px;
  margin: 5rem auto;
}

```

We are basically styling a bit the images and then hiding them. We will be displaying them programatically through our JS file. Next, let's do the series, recommendations and characters classes. These are some utility classes that will display the search results nicely for us:

```js

/* series display */
.series {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #0f5863;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.text {
  font-size: 32px;
  margin-bottom: 10px;
}

.series-picture {
  max-width: 100%;
  height: auto;
}

/* recommendations */
.recommendation {
  display: flex;
  align-items: center;
}

.recommendation-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin: 2rem;
  padding: 2rem;
}

.recommendation-description {
  font-size: 16px;
  margin-bottom: 10px;
  margin: auto 2rem;
  padding: auto 2rem;
  font-size: 2rem;
}

.recommendation-picture img {
  width: 4rem;
  border-radius: 15px;
}

/* Characters */
#characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.character {
  flex: 0 0 calc(33.33% - 10px);
  padding: 20px;
  text-align: center;
}

.small-picture img {
  width: 4rem !important;
  border-radius: 50px;
  border: 1px solid #000;
}

.character-link a {
  text-decoration: none;
}

.character-link a:hover {
  color: rgb(3, 7, 17);
  text-decoration: underline;
}

```

We are only aligning stuff with flexbox here, if you want to find out more about that, you can read about it [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). Apart from that we are just playing around with margin, padding and sizes and changing slightly some hover styles, in order to improve the interactivty of our page.\
\
Finally, after all these styles, let's just add in some [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) for some responsiveness, and we are done with the css part:

```js
/* Media Queries */
@media (max-width: 992px) {
  header {
    height: 35vh;
  }
}

@media (max-width: 576px) {
  header {
    height: 25vh;
  }

  .character {
    display: block;
    margin: 2rem auto;
  }

  .not-found {
    font-size: 1rem;
  }
  .not-found img {
    width: 17rem;
  }

  .recommendation {
    flex-direction: column;
  }

  .character {
    flex: 0 0 calc(100%);
  }
}


```

We are done with the UI part! Next, let's start on the **_anime.js_** file where we will be implementing the interactivity logic and the data fetching. First let's add insite of it a couple of [DOM Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors) and some variables:

```js
const form = document.getElementById("form");
const result = document.getElementById("result");
const characters = document.getElementById("characters");
const searchAnimeInput = document.querySelector("#searchAnime");
const searchMangaInput = document.querySelector("#searchManga");
const getAnimeRecommendationsInput = document.querySelector("#getAnime");
const getMangaRecommendationsInput = document.querySelector("#getManga");
const spinner = document.querySelector(".loader");
const notFound = document.querySelector(".not-found");

const apiUrl = "https://myanimelist.p.rapidapi.com";

let typingTimer;

const typingDelay = 500;

const API_KEY = "YOUR_API_KEY";
```

Don't forget to generate an [API key](https://www.fortinet.com/resources/cyberglossary/api-key) for your project. In order to do that you need to go to this [link](https://rapidapi.com/felixeschmittfes/api/myanimelist) and generate a new key for you so you can use it inside the application. Apart from that
we are just declaring some variables (the api url and some variables for some typing mechanism we will be implementing).\
\
Let's move on to the **_search()_** method. This will be the method we will be using to call the [API endpoints](https://blog.hubspot.com/website/api-endpoint):

```js
const search = async (type, query) => {
  spinner.style.display = "block";
  result.innerHTML = "";
  characters.innerHTML = "";
  const encodedQuery = encodeURIComponent(query);
  const rawData = await fetch(
    `${apiUrl}/${type}/search/${encodedQuery}?rapidapi-key=${API_KEY}`
  );
  const actualData = await rawData.json();
  const id = actualData[0].myanimelist_id;
  const animeRawData = await fetch(
    `${apiUrl}/${type}/${id}?rapidapi-key=${API_KEY}`
  );
  const dataToDisplay = await animeRawData.json();
  displayData(dataToDisplay);
};
```

Our method receives 2 parameters (type which will be a string indicating whether we search for manga or anime - that is because we have different endpoints in the API and query which will be a string to search for - a series title for instance). Our function encodes the query (so we can pass it in the URL) and hits some endpoint. From that endpoint's response we take an id which we use to fetch for the full series information. Once we have that, we call a method named **_displayData()_**. Let's add that method too:

```js
const displayData = (actualData) => {
  const stringToTest = actualData.data;
  if (stringToTest && /^no anime found/.test(stringToTest)) {
    spinner.style.display = "none";
    notFound.style.display = "block";
  } else {
    notFound.style.display = "none";
    let output = "";
    let characterOutput = ``;

    output += `
          <div class="series ui-card">
              <div class="title">
                  <h1>${actualData.title_ov}</h1>
              </div>
              <div class="series-picture">
                <img class="anime-img" src="${actualData.picture_url}"/>
              </div>
              <div class="text">
                <p>
                    ${actualData.synopsis}
                </p>
              </div>
              
          </div>
          <h1 class="center">Characters:</h1>
      
      `;

    actualData.characters.map((c) => {
      characterOutput += `
        <div class="character ui-card">
  
              <div class="character-title">
                  <h2>${c.name}</h2>
              </div>
             
              <div class="small-picture">
                <img class="anime-img" src="${c.picture_url}"/>
              </div>

              <div class="character-title">
                <h2>V/A: ${c.voice_actor_name}</h2>
              </div>
            
              <div class="small-picture">
                <img class="anime-img" src="${c.voice_actor_picture_url}"/>
              </div>

              <div class="character-link">
                <a href="${c.voice_actor_myanimelist_url}" target="_blank">Voice Actor Page</a>
              </div>
          </div>
        `;
    });

    spinner.style.display = "none";
    result.innerHTML = output;
    characters.innerHTML = characterOutput;
  }
};
```

This method simply grabs the payload object, checks it and returns its contents mapped as HTML contents (or it shows the not found picture if we get some bad payload). Next, let's test this method. At the bottom of the file add 2 event listeners to call the search() function:

```js
searchAnimeInput.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => search("anime", e.target.value), typingDelay);
});

searchMangaInput.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => search("manga", e.target.value), typingDelay);
});
```

\*Note how we are calling [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) and are passing it the reference to the timer variable we set at the very beginning. Also, note that we
are calling the **_search()_** method (thus hitting the API endpoint) using [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) with a delay of 500 ms. This is because as you probably have noticed we hooked the function onto the "input" event (so every key stroke will trigger a function call and we do not want to hit the API endpoints with too many requests).\
\
Next let's add the **_getRecommendations()_** function. This one will hit a different endpoint and fetch us some series recommendations:

```js
const getRecommendations = async (type) => {
  result.innerHTML = "";
  characters.innerHTML = "";
  spinner.style.display = "block";
  const rawData = await fetch(
    `${apiUrl}/${type}/recommendations/1?rapidapi-key=${API_KEY}`
  );
  const data = await rawData.json();
  console.log("animeRecommendations here...", data);
  displayRecommendations(data.recommendations);
};
```

We also need to create the **_displayRecommendations_** method (it will be similar to displayData but it requires some slightly different markup):

```js
const displayRecommendations = (data) => {
  notFound.style.display = "none";
  let output = "";

  data.map((i) => {
    output += `
     
    <div class="recommendation ui-card">
        <div class="recommendation-title">
            <h1>${i.recommendation.title}</h1>
        </div>
        <div class="recommendation-picture">
        <img class="anime-img" src="${i.recommendation.picture_url}"/>
        </div>
        <div class="recommendation-description">
        <p>
            ${i.description}
        </p>
        <div>
          <h5>Author: ${i.author.name}</h5>
        </div>
        <div class="series-link">
          <a href="${i.author.url}" target="_blank">Author Page</a>
        </div>
        </div>
        
    </div>`;
  });

  spinner.style.display = "none";

  result.innerHTML = output;
};
```

Finally, add 2 more event listeners to call **_getRecommendations_** for both manga and anime:

```js
getAnimeRecommendationsInput.addEventListener("click", () => {
  getRecommendations("anime");
});

getMangaRecommendationsInput.addEventListener("click", () => {
  getRecommendations("manga");
});
```

And there you have it! You have built a nice and quick front-end project. Hopefully I have stirred your interest into manga, anime and vocaloids with it. If you want to compare your code to mine, you can find it in [this repo](https://github.com/StanciuDragosIoan/anime-search-engine).

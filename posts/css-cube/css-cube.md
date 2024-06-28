---
title: "CSS Cube"
date: "2023-12-15"
image: cube-girl.jpg
excerpt: Since it's been a long while since I wrote anything, I figured we'd have some fun building a cool little project that involves mainly css (and just a tiny bit of JS that we'll go through quickly)
isFeatured: true
---

Published **28th June 2024**.

## CSS

\
[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) is a piece of technology I've always loved and strived to get better at. It is amazing what you can build with only [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) and how much cooler your applications will look like with just a bit of it. Today, we will be trying to build [this little application](https://vocaloid-cube.netlify.app/) which I hope you're anjoying (as you'll also enjoy building).

\
So without further ado, let's commence! First create an **_index.html_** file and paste the below code inside:

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vocaloids</title>
</head>

  <body>
      <div class="flex-container">
          <div class="child">
              <div class="scene">
                  <div class="cube">
                      <div class="cube-face front">
                          <img class="thumbnail" src="./vocaloids/haku.webp" />
                      </div>
                      <div class="cube-face back">
                          <img class="thumbnail" src="./vocaloids/lily.webp" alt="">
                      </div>
                      <div class="cube-face right">
                          <img class="thumbnail" src="./vocaloids/luka.webp" />
                      </div>
                      <div class="cube-face left">

                          <img class="thumbnail" src="./vocaloids/meiko.webp" />
                      </div>
                      <div class="cube-face top">
                          <img class="thumbnail" src="./vocaloids/miku.webp" alt="">
                      </div>
                      <div class="cube-face bottom">
                          <img class="thumbnail" src="./vocaloids/teto.webp" alt="">
                      </div>
                  </div>
              </div>
          </div>
          <div class="child">
              <div class="winner"></div>
          </div>

          <div class="child">
              <button class="pushable" id="inputBtn">
                  <span class="shadow-btn"></span>
                  <span class="edge-btn"></span>
                  <span class="front-btn">
                      Roll
                  </span>
              </button>
          </div>
      </div>
  </body>
</html>
```

\
For the images, just download them from the github repo with the project (listed at the end of this article). Next, let's add a **_style.css_** file and reference it in the HTML file. Inside of it, let's add some minimal [flexBox style CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox). This will only center our contents so far. If you want to dive deeper into [FlexBox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) I highly recommend [this article](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

```js
/* flex box classes */

body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        perspective: 800px;
        background-color: #f0f0f0;
    }

.flex-container {
    display: flex;
    flex-direction: column;
    gap: 10rem;
}


.child {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

\
Now, let's start working on our cube a bit. We will style the **_.scene_** class (which will be the container for our cube) and the **_.cube_** class (which will contain the cube's faces). Paste further into **_style.css_\***:

```js
/* scene & cube basic styles*/

.scene {
    width: 150px;
    height: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cube {
    width: 100%;
    height: 100%;
    position: absolute;
    /* rotate horizontally 20deg and vertically 30 deg */
    transform: rotateX(-20deg) rotateY(30deg);
    /* slightly alter rotation for a better 3d effect */
    transform-style: preserve-3d;
}
```

\
\*Note how we use **_position relative_** as container for **_position absolute_** (I'm sure you've heard this many times, or if you have not, then maybe you should study a bit [CSS positions](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/)). Let's further add the generic styles for the cube faces:

```js
/* generic styles for cube faces*/

.cube-face {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 5%;
    border: 2px solid #ddd;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    /*hides stuff from behind*/
    backface-visibility: hidden;
}


.cube-face img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

\
\*Note how now all faces look as if they are stacked together so we can see only the one on the top. The line setting **_position:absolute_** inside the rule for **_.cube-face_** does that (note that although we are inside a div that is positioned absolute, namely the **_.cube_** class the **_.cube-face_** still relates itself to the first relatively positioned ancestor namely the **.scene** class). Apart from positioning, the **_.cube-face_** class just centers the images. The **_.cube-face img_** selector just further positions the images better on the cube faces.
\
Next, let's build the actual cube. Pay attention to each individual face and how it's rotated on the axes in order to give the look and feel of an actual cube:

```js
/* styles for inidvidual cube faces */

.front {
    /* no rotation on vertical axis but  push a bit in front on the Z axis*/
    /* face is visible in default position of cube */
    transform: rotateY(0deg) translateZ(75px);
}

.back {
    /* rotate 180 deg on vertical axis and push in front on  the Z axis */
    /* face not visible in default position of cube */
    transform: rotateY(180deg) translateZ(75px);
}


.right {
    /* rotate 90 degrees on vertical axis and pus in front on the Z axis */
    /* face not visible in default position of cube */
    transform: rotateY(90deg) translateZ(75px);
}

.left {
    /* rotate 90 degrees counter clockwise on vertical  axis and pus in front on the Z axis */
    /* face is visible in default position of cube */
    transform: rotateY(-90deg) translateZ(75px);
}

.top {
    /* rotate horizontally to 90 deg and push in front on the Z axis*/
    /* face is visible in default position of cube */
    transform: rotateX(90deg) translateZ(75px);
}

.bottom {
    /* rotate horizontally to 90 deg counter clockwis and push in front on the Z axis*/
    /* face is not visible in default position of cube */
    transform: rotateX(-90deg) translateZ(75px);
}

```

\
Next, let's add a [keyframe](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) for some dice rolling animation. A [keyframe](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) is a definition for an [animation's](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) steps (from what state to what state will the animation transition). Add the rule:

```js
/* cube rotation keyframe */
@keyframes randomRotate {
    0% {
        /* start from non rotated position */
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    100% {
        /* rotate full 360 deg on all 3 axes */
        transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
}

```

This on it's own will not do anything, so let's add 1 more class:

```js
 .animateCube {
      animation: randomRotate 1s linear;
  }
```

\
Next, apply the **_.animateCube_** class alongside the **_.cube_** class to the respective div, also temporarily add the **infinite** word after the **_1s_** - this will make the animation run infinitely. After having tested it remove the **infinite** word (1 second is enough for us) and remove the **_.animatedCube_** class from the **_.cube_** div (we will be adding/removing it back with JavaScript).

\
Now, let's start working on the JavaScript part. Add a script referencing a **_script.js_** file and inside of it paste the below:

```js
const faceChangeHandler = () => {
  console.log("This function triggers when cube animation finished");
};

function handleCube() {
  const cube = document.querySelector(".cube");
  cube.classList += " animateCube";

  cube.addEventListener("animationend", faceChangeHandler);

  setTimeout(() => {
    cube.classList += " reset";
  }, 2000);

  setTimeout(() => {
    //remove event handler
    cube.removeEventListener("animationed", faceChangeHandler, true);
    //remove animation class
    cube.classList.remove("animateCube");
  }, 2100);
}

document.querySelector("#inputBtn").addEventListener("click", handleCube);
```

\
Now our cube rotates but it just comes back to its original position and it does not display anything. Let's quickly add 1 more class inside the CSS code:

```js
  .reset {
      transform: rotateX(-20deg) rotateY(30deg) !important;
  }
```

Next, replace the contents in the JS code with the below:

```js
//by default last index is one that is not in the array currently
let lastFaceIndex = -1;

//get random face to display a winner
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setRandomFace() {
  const cube = document.querySelector(".cube");
  //positions to display the winner face
  const faces = [
    { x: 0, y: 0 }, // Front
    { x: 0, y: 180 }, // Back
    { x: 0, y: 90 }, // Right
    { x: 0, y: -90 }, // Left
    { x: 90, y: 0 }, // Top
    { x: -90, y: 0 }, // Bottom
  ];

  let randomFaceIndex;

  //make sure index never repeats
  do {
    randomFaceIndex = getRandomInt(faces.length);
  } while (randomFaceIndex === lastFaceIndex);

  //assign new latestFace
  lastFaceIndex = randomFaceIndex;
  //pick random face of dice
  const randomFace = faces[randomFaceIndex];

  //edit cube's styles so that the winner face is displayed
  const transformString = `rotateX(${randomFace.x}deg) rotateY(${randomFace.y}deg)`;
  cube.style.transform = transformString;
}

const faceChangeHandler = () => {
  console.log("This function triggers when cube animation finished");
  setRandomFace();
};

function handleCube() {
  const cube = document.querySelector(".cube");
  cube.classList.remove("reset");
  cube.classList += " animateCube";

  cube.addEventListener("animationend", faceChangeHandler);

  setTimeout(() => {
    cube.classList += " reset";
  }, 2000);

  setTimeout(() => {
    //remove event handler
    cube.removeEventListener("animationed", faceChangeHandler, true);
    //remove animation class
    cube.classList.remove("animateCube");
  }, 2100);
}

document.querySelector("#inputBtn").addEventListener("click", handleCube);
```

\
With this, our functionality is pretty much done. I just want to add 2 more improvements to this little project to make it even cooler.
\
First, I d like for us to display a winner (so the character on the winning face of the cube). Let's start by adding these styles in the CSS:

```js
/*winner styles*/
.winner{
    height: 10rem;
    width: 10rem;
}

.winner img {
     width:20rem;
    height:10rem;

}

.winner .child > h1 {
    text-align: center;
}
```

\
Next, in the JS code add the below 2 methods:

```js
function getSingerName(idx) {
  let name = "";
  switch (idx) {
    case 0:
      name = "Haku";
      break;
    case 1:
      name = "Lily";
      break;
    case 2:
      name = "Meiko";
      break;
    case 3:
      name = "Luka";
      break;
    case 4:
      name = "Teto";
      break;
    case 5:
      name = "Miku";
      break;
    default:
      name = "Miku";
      break;
  }

  return name;
}

function displayWinner(index) {
  const images = document.querySelectorAll("img");
  const arrImg = Array.from(images);
  const target = arrImg[index];

  let srcToShow = "./";

  switch (index) {
    case 0:
      srcToShow = "./vocaloids/haku.gif";
      break;
    case 1:
      srcToShow = "./vocaloids/lily.gif";
      break;
    case 2:
      srcToShow = "./vocaloids/meiko.gif";
      break;
    case 3:
      srcToShow = "./vocaloids/luka.gif";
      break;
    case 4:
      srcToShow = "./vocaloids/teto.gif";
      break;
    case 5:
      srcToShow = "./vocaloids/miku.gif";
      break;
    default:
      srcToShow = "./vocaloids/miku.gif";
  }

  document.querySelector(".winner").innerHTML = `
    <div class="child">
        <h1>${getSingerName(index)} will sing for you: 
            <br>
            <img class="thumbnail-small" src=${srcToShow} />
        </h1>
    </div>
    `;
}
```

\
Finally in the **_setRandomFace()_** call after setting the **_cube.style.transform_** property, add the below lines:

```js
//displayWinner
displayWinner(randomFaceIndex);
```

\
Now before really wrapping it up, I just want to make the button way cooler. However the styles for it are not mine, they belong to [JoshComeau](https://www.joshwcomeau.com/) who is an amazing developer and whose blog I've been reading for a while. He has [this cool button tutorial](https://www.joshwcomeau.com/animation/3d-button/) and I took the liberty of reusing it for this article/project because it just looks way better than anything I ve seen before. So after having credited the [author](https://www.joshwcomeau.com/) properly, let's just paste the button CSS code in the file directly:

```js
  /* button styles */
        .pushable {
            position: relative;
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;
            outline-offset: 4px;
            transition: filter 250ms;
        }

        .shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background: hsl(0deg 0% 0% / 0.25);
            will-change: transform;
            transform: translateY(2px);
            transition:
                transform 600ms cubic-bezier(.3, .7, .4, 1);
        }

        .edge-btn {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background: linear-gradient(to left,
                    hsl(340deg 100% 16%) 0%,
                    hsl(340deg 100% 32%) 8%,
                    hsl(340deg 100% 32%) 92%,
                    hsl(340deg 100% 16%) 100%);
        }

        .front-btn {
            display: block;
            position: relative;
            padding: 12px 42px;
            border-radius: 12px;
            font-size: 1.25rem;
            color: white;
            background: hsl(345deg 100% 47%);
            will-change: transform;
            transform: translateY(-4px);
            transition:
                transform 600ms cubic-bezier(.3, .7, .4, 1);
        }

        .pushable:hover {
            filter: brightness(110%);
        }

        .pushable:hover .front-btn {
            transform: translateY(-6px);
            transition:
                transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .pushable:active .front-btn {
            transform: translateY(-2px);
            transition: transform 34ms;
        }

        .pushable:hover .shadow {
            transform: translateY(4px);
            transition:
                transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .pushable:active .shadow {
            transform: translateY(1px);
            transition: transform 34ms;
        }

        .pushable:focus:not(:focus-visible) {
            outline: none;
        }
```

\
Thanks for sticking with me this far! If you want to check your code against mine, [here's the github repo](https://github.com/StanciuDragosIoan/vocaloid_girls_cube) with it all. See you around!

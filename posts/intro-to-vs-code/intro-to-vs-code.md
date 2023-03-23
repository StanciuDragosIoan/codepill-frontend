---
title: "Intro to VS CODE"
date: "2021-04-07"
image: vs_code.png
excerpt: Before we get to writing any code or understanding what code is and how it works at all, of course we need a good code editor. In this first article, we will explore a bit Visual Studio Code and its capabilities
isFeatured: true
---

Published **7th April 2021**.

Before we get to writing any code or understanding what [code](https://www.freecodecamp.org/news/computer-coding-computer-program-definition-and-code-meaning/) is and how it works at all, of course we need a good code editor. In this first article, we will explore a bit [Visual Studio Code](https://code.visualstudio.com/) and its capabilities. Of course we can write code on any sort of file (even in a plain .txt file with an editor such as notepad, and then converting the file into **.html**, **.js** or any other format that the computer can read, process and do awesome stuff with).

So in order to tell our computer to do awesome stuff, we pass it a set of instructions written in a certain file in a certain cryptic way (there are quite a few types of such files and of such languages heck! even of types of languages). We have to write these **instructions** in a very well defined way.

\*Note that I did not mention a very **clear way**. I did so on purpose in order to draw your attention to the following point. Computers, are quite dumb and can only do specific (and fairly simple) tasks. However, they do them perfectly (if instructed perfectly) and at the speed of light. Thus, for them, it is not relevant if our code instructions are written in a clear way, as long as they respect the 'well defined' cryptic rules. However, writing clean code will help you and your fellow developers maintaining it, changing it or even simply understanding it after a while.

Let me give you an example. Copy the below code as it is:

```js
let message = "123";
console.log(message);
message = window;
message.alert(`
      \Y
      o
      u
      Have
      A
      message but
      it
      Is
      Not
      whatIt
      Was: ${message.name ? message.name : "UFO"}
      `);
```

Now open your browser, hit **f12** and paste the code in the console. Then hit enter. You will see the distorted [alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert/) message which tries to render the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)'s "name" property object onto the screen. The computer did not care that instead of **You Have you wrote**:

```js
\Y
o
u
Have
```

This only made the message itself barely readable by your potential user, so there is definitely meaning behind respecting certain conventions when we code. And please do keep in mind that this is only a very simple example.

A good code editor will make such task of writing good quality code easier. There are many such editors on the market but now we will explore [Visual Studio Code](https://code.visualstudio.com/). The instructions for installing the code editor, are available on its page, which you can access from this [Link](https://code.visualstudio.com/download) so I will not cover that.

I will now show you a few awesome plugins and settings, so that you can get your **VS Code** editor up and about. If you are on a linux distribution (or on windows in a [Git Bash](https://gitforwindows.org/#bash) session) and right click a directory, you can open it with VS Code by running the below command:

This will open the current directory in VS Code and it will look something like this:

![VS code open page](vs_code_open.png)

Note that if you hover on the workspace to the left, so this whole area:

![VS code left side area](vs_code_area.jpg)

You will see the below icons:

![Small icons vs code](small_icons_vs_code.png)

These icons are used (from left to right) to create a new file, create a new folder, refresh the explorer area to the left (the one which you hovered) and to collapse all open folders open inside of it.

Let's now explore some option buttons which are stacked to your left. From top to bottom they do the following: toggle the explorer, Search globally (in all the open folder), check for git changes and history, run the debugger and the last one manages extensions. That's the first one we'll look at. Click on it and you will see this:

![VS code main icons](vs_code_extensions.png)

\*In case you've noticed the docker icon (right below the extensions one) know that that is for [Docker](https://www.docker.com/) a resource we might touch upon in a different article.

The first extension I recommend you use is the Material Icon Theme. Its page looks like this:

![VS code material icons](vs_code_material_icon.png)

\*Funnily enough it seems I did not have it installed 😅 but you will see it's cool.

As you may have figured out, it allows you to have nice material-like icons for your file types just as below:

![VS code material icons sample](vs_code_material_icons_sample.png)

The second extension I am going to show you is one called **Live Server**:

![VS code live server](vs_code_live_server.png)

This one is even cooler because it allows you to have a 'hot reloading' for your files kind of like a real development server. What I mean by that is that with this extention active, whenever you save a change in one of your files, the browser page that you are rendering (say you change something in an **index.html** file or a **.css** or **.js** file that it uses). Well in that case the **.html** file will get refreshed in the browser. Let me show you what I mean. In the **index.html** file that we have created, just type something, next right-click on it and click on the 'open with live server' option.

\*this will open a new tab in your browser with the **.html** file. If you change something inside the file and save it, the browser page will automatically get refreshed without you having to do anything. Pretty cool eh?

The following extension I am going to show you for now is called **Bracket Pair Colorizer** and it does just that, colours open and close curly braces **{ }** or any other type of braces so you can recognize them. It looks like this:

![VS code bracket pair colorizer](vs_code_bracket_pair_colorizer.png)

\*As you may have quessed, this is helpful especially if you have multiple nested if(){} statements:

![VS code bracket pair colorizer](bracket_pair_colorizer_sample.png)

The next extension we will look at is Prettier. This one just makes your code 'prettier' 😅. I m joking, what it actually does is format your code:

![VS code prettier](vs_code_prettier.png)

If you enable this extension, it will format your code properly. You can go to settings and search of the option 'format on save'. Just search for these words and tick the option. Prettier should be also selected as default formatter. If you do that, then you can write code like this:

```js
  *const test =
      () =>
      {

       if (true)
       {
         console.log("test"
         );
       }
       else {
         console.log("test2"
         );
       }
     };
```

And when you hit ctrl + s, it will look like this:

```js
const test = () => {
  if (true) {
    console.log("test");
  } else {
    console.log("test2");
  }
};
```

This feature is very useful because it just tidies up your code. Prettier comes with its own default configurations and formatting settings (highly customizable btw, so you can tell it to preffer single or double quotes, etc...) but it's good for starters.

This should be good to get you started. Of course we can configure our code editor with much more powerful settings and we will do explore that later on, when we will need such features. For now I think this is good.

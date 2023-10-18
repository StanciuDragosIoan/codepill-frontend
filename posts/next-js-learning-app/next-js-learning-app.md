---
title: "NextJS Language App"
date: "2023-10-19"
image: japanese_girl.jpeg
excerpt: After having started the NextJS Bits series, it's high time we actually built our first NextJS project. As you may have guessed, I am a huge anime/manga/Japanese culture fan so what better app to built othe than a  Japanese language learning app?
isFeatured: true
---

Following my [previous introductory article](https://code-pill.com/posts/next-js-bits-routing) on [NextJS](https://nextjs.org/), we are going to use these elements to build a useful application. What we are going to build is a [Momo Learn](https://japanese-learning-app-beta.vercel.app/) a language learning app.

Since this application uses quite a number of assets, I recommend that you start from this [base branch](https://github.com/StanciuDragosIoan/japanese_learning_app/tree/starter).

So clone the repo:

```js
git clone -b starter https://github.com/StanciuDragosIoan/japanese_learning_app.git
```

Next run **yarn** and **yarn dev** and open the app by going to [http://localhost:3000](http://localhost:3000).

In this starter project, we have a web application made up of 5 pages. You can see all the pages inside the **(site)** directory. As you can see, each page has its own dedicated directory and a **page.js** file inside of it. In that file, we have the contents of our page.

Furthermore, we have a **layout.js** file with some styles defined in it. What you should know is that this layout component is wrapped around all the pages in your site. If you want to test this, just add the below attribute onto the body tag in there:

```js
style={{background: "red"}}
```

If you check any page from your application (such as [http://localhost:3000/kanji](http://localhost:3000/kanji) or [http://localhost:3000/hiragana](http://localhost:3000/hiragana)) you will see the red background applied everywhere.\
\
Next, remove the style attribute and create a **/components** directory inside the **/app** one. Inside the **/components** directory create a **/layout** directory and inside of it create a **/navigation** one. Inside this one create a **Navigation.jsx** file. Inside that file paste the below:

```js
"use client";

import Link from "next/link";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    {
      url: "/",
      caption: "Home",
    },
    {
      url: "/hiragana",
      caption: "Hiragana",
    },
    {
      url: "/katakana",
      caption: "Katakana",
    },
    {
      url: "/kanji",
      caption: "Kanji",
    },
    { url: "/readings", caption: "Readings" },
  ];

  return (
    <nav className={`bg-white border-gray-200 dark:bg-gray-900`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 text-white">
            <a href="/" target="_blank">
              <img className="h-16 rounded-full" src="/logo.jpg" alt="Logo" />
            </a>
          </div>
          <button
            className="text-white focus:outline-none lg:hidden"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <ul
          className={`${
            isMenuOpen
              ? "block lg:hidden text-white" // Show on mobile, hide on larger screens
              : "hidden"
          }`}
        >
          {links.map((item, index) => (
            <li className="px-5 py-1" key={index}>
              <Link href={item.url} target="_blank">
                {item.caption}
              </Link>
            </li>
          ))}

          {/* Add more navigation items as needed */}
        </ul>
        {/* Desktop Menu */}
        <ul className="hidden lg:flex lg:space-x-4 px-5 lg:items-center text-white">
          {links.map((item, index) => (
            <li key={index}>
              <Link href={item.url} target="_blank">
                {item.caption}
              </Link>
            </li>
          ))}

          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
};
```

Note the ['use client' directive](https://nextjs.org/docs/app/building-your-application/rendering/client-components) which is at the very top of our component. This is because [NextJS](https://nextjs.org/) by default renders all components as [server side components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). If we want to render them as [client side components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) we need to use this directive.\
\
In the case of this navigation component, we use the [useState hook](https://react.dev/reference/react/useState) which can only run on the client.\
\
Finally, let's use the navigation component in our layout file, replace its contents as per below:

```js
import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "./components/layout/navigation/Navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Momo",
  description: "Japanese Language Learning App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <Navigation />
      </body>
    </html>
  );
}
```

Now, you can navigate through the pages using the new navigation component we just added. Next, let's create a footer component. In the **/layout** directory, create a **/footer** alongisde the **/navigation** directory. Inside the **/footer** directory create a **Footer.jsx** file and inside of it paste:

```js
export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600">
      <div className="container pt-9">
        <div className="mb-9 flex justify-center">
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
          <a href="#!" className="text-neutral-800 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        © {new Date().getFullYear()} Copyright:
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://tailwind-elements.com/"
        >
          Momo Learn
        </a>
      </div>
    </footer>
  );
};
```

Next, import the **Footer** in the layout and use it. Finally our last 'layout' component namely a container. Create a **/mainContainer** directory and inside of it a **MainContainer.jsx** file in which paste the below:

```js
export const MainContainer = ({ children }) => {
  return (
    <div className="bg-indigo-500 min-h-screen text-white">
      <div className="container mx-auto">{children} </div>
    </div>
  );
};
```

Finally, replace the contents of the **layout.js** with this:

```js
import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "./components/layout/navigation/Navigation";
import { MainContainer } from "./components/layout/mainContainer/MainContainer";
import { Footer } from "./components/layout/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Momo",
  description: "Japanese Language Learning App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <Navigation />
        <MainContainer>{children}</MainContainer>
        <Footer />
      </body>
    </html>
  );
}
```

Next, let's work on the homepage to bring some real life into our application. First let's create a **/content** folder inside the **/components** one and inside the **/content** directory, create a **/showcase** directory. Inside of it, create a **Showcase.jsx** file in which paste the below:

```js
import Image from "next/image";
import Link from "next/link";
export const Showcase = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="p-4">
            <Image
              src="/girl_learns.avif"
              width={500}
              height={500}
              alt="Girl Learns Japanese"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-10 w-[80%] mx-auto md:w-[40%]">
          <div className="p-4 mt-5">
            <p className="text-xl py-5 md:py-0 lg:py-5">
              If you ever dreamed of speaking the Japanese language, you are in
              the right place!
            </p>
            <p className="text-xl py-5 md:py-0">
              Kawaii Learn is your go-to app for learning
              <Link
                className="p-5 hover:text-gray-800 underline"
                href="/hiragana"
              >
                Hiragana,
              </Link>
              <br />
              <Link
                className="p-5 hover:text-gray-800 underline"
                href="/katakana"
              >
                Katakana
              </Link>
              <br />
              or
              <Link className="p-5 hover:text-gray-800 underline" href="/kanji">
                Kanji
              </Link>
              as well as some reading.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-10 w-[85%] mx-auto">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          {/* card */}
          <div className="bg-white shadow-md border border-gray-700 rounded-lg max-w-sm dark:bg-gray-800">
            <a href="/hiragana" target="_blank">
              <Image
                src="/hiragana.png"
                width={500}
                height={500}
                alt="Hiragana Octopus"
              />
            </a>
            <div className="p-5">
              <a href="/hiragana" target="_blank">
                <h5 className="text-white font-bold text-2xl tracking-tight mb-2">
                  Learn Hiragana
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                The most basic Japanese Script that will allow you to read and
                understand many things.
              </p>
              <a
                href="/hiragana"
                target="_blank"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go check Hiragana
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          {/* card */}

          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="/katakana" target="_blank">
              <Image
                className="rounded-md"
                src="/kana.jpg"
                width={500}
                height={500}
                alt="Kana face"
              />
            </a>
            <div className="p-5">
              <a href="/katakana" target="_blank">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                  Learn Katakana
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                Next level, for even more words in your vocabulary is of course
                Katakana.
              </p>
              <a
                href="/katakana"
                target="_blank"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go check Katakana
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-10 w-[85%] mx-auto">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          {/* card */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="/kanji" target="_blank">
              <Image
                className="rounded-md"
                src="/kanji_tokyo.avif"
                width={500}
                height={500}
                alt="Kanji for Tokyo"
              />
            </a>
            <div className="p-5">
              <a href="/kanji" target="_blank">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                  Learn Kanji
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                There are thousands of them and you need them for true mastery
                of the language, but do not worry! It is easier than you think
                to start learning them.
              </p>
              <a
                href="/kanji"
                target="_blank"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go check Kanji
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          {/* card */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="/readings" target="_blank">
              <img className="rounded-t-lg" src="girl_reading.jpg" alt="" />
            </a>
            <div className="p-5">
              <a href="/readings" target="_blank">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                  Readings
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                Once you've mastered some of the reading and writing basics, you
                should definitely test out your knowledge with some of our
                stories.
              </p>
              <a
                href="/readings"
                target="_blank"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go check stories
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
```

Next, replace the contents of the **page.js** file that is located at the root of the **/app** directory with this:

```js
import { Showcase } from "./components/content/showcase/Showcase";

export default function Home() {
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold text-center">こんにちは</h1>
      <p className="text-3xl font-bold text-center">Welcome to Momo Learn</p>

      <Showcase />
    </div>
  );
}
```

Now our homepage looks good, let's move on to the other pages. Let's start with the 'Hiragana' page. In the **/components/content** directory create a **Header.jsx** file and inside of it paste the below:

```js
import Link from "next/link";
import Image from "next/image";
import { KatakanaInfo } from "./katakana/KatakanaInfo";
import { HiraganaInfo } from "./hiragana/HiraganaInfo";
import { KanjiInfo } from "./kanji/KanjiInfo";
export const HeaderComponent = ({
  script,
  imgSrc,
  imgAlt,
  katakana = false,
  hiragana = false,
  kanji = false,
}) => {
  return (
    <div className="text-white w-80 mx-auto py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Learn {script}
        </h1>
        <p className="mt-6 leading-8">
          There are 3 alphabetes in Japanese:
          <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
            Hiragana
          </Link>,<Link
            className="p-1 hover:text-gray-800 underline"
            href="/katakana"
          >
            Katakana
          </Link>
          and
          <Link className="p-1 hover:text-gray-800 underline" href="/kanji">
            Kanji
          </Link>.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Image src={imgSrc} width={500} height={500} priority alt={imgAlt} />
        </div>
        {katakana && <KatakanaInfo />}
        {hiragana && <HiraganaInfo />}
        {kanji && <KanjiInfo />}
      </div>
    </div>
  );
};
```

This will be a simple component that just displays some info about our scripts (in Japanese there are 3 main scripts).\
\
Next create a **StrokeOrder.jsx** component:

```js
import Image from "next/image";
export const StrokeOrder = ({ indexes, script, scriptName }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 center">
      {script.map((i, index) => {
        const hiraganaChar = i.split("-")[1].toLocaleLowerCase().trim();
        const translation = i.split("-")[0].toLocaleLowerCase().trim();

        return (
          <>
            {indexes.includes(index) ? <br /> : ""}

            <div className="text-center" key={hiraganaChar}>
              <p className="text-xl">
                {translation} - {hiraganaChar}
              </p>
              <Image
                className="mx-auto m-5 rounded-full"
                src={`/assets/${scriptName}/${scriptName}_${translation}.gif`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "90px", height: "auto" }}
                alt={`${scriptName} ${translation}`}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};
```

This component will help us render the [GIFs](https://developer.mozilla.org/en-US/docs/Glossary/GIF) showing how to draw the characters in the scripts.\
Next create a **Diacritics.jsx** component:

```js
import Link from "next/link";

export const Diacritics = ({ diacritics }) => {
  return (
    <div className="text-center">
      <p className="text-3xl m-5">Dakuten and Handakuten</p>
      <p className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12">
        Now that you know how to draw the characters, you should also know
        something about the
        <Link
          className="p-1 hover:text-gray-800"
          href="https://paulbaptist.com/introduction-to-japanese-writing-hiragana-group-11-dakuten-%E3%81%8C%E3%81%96%E3%81%A0%E3%81%B0-etc/"
          target="_blank"
        >
          Dakuten (゛)
        </Link>
        and
        <Link
          className="p-1 hover:text-gray-800"
          href="https://skdesu.com/en/dakuten/"
          target="_blank"
        >
          Handakuten (ﾟ)
        </Link>.
      </p>
      <p className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12">
        These dyacritics will change a bit some of the vowels we've just
        learned:
      </p>

      {diacritics.map((d) => {
        return d.dakuten ? (
          <p className="leading-8 pb-5" key={d.dakuten}>
            <span className="p-1 text-2xl">
              {d.kana} ({d.translation})
            </span>
            used with the dakuten (゛) will become
            <span className="p-1 text-2xl">
              {d.dakuten} ({d.dakutenTranslation})
            </span>
            {d.variant ? (
              <span className="block">
                *The character {d.kana} also has a variant namely{" "}
                {d.variant.value}
              </span>
            ) : (
              ""
            )}
            {d.handakuten ? (
              <span className="leading-8 block">
                <span className="p-1 text-2xl">
                  {d.kana} ({d.translation})
                </span>
                used with the handakuten (ﾟ) will become
                <span className="p-1 text-2xl">
                  {d.handakuten} ({d.handakutenTranslation})
                </span>
              </span>
            ) : (
              ""
            )}
          </p>
        ) : (
          ""
        );
      })}
    </div>
  );
};
```

This component will help us understand the [dakuten and handakuten](https://en.wikipedia.org/wiki/Dakuten_and_handakuten) diacritics.\
\
Next create a **Dyagraphs.jsx** component:

```js
import { HiraganaDyagraphsInfo } from "./hiragana/HiraganaDyagraphsInfo";
import { KatakanaDyagraphsInfo } from "./katakana/KatakanaDyagraphsInfo";
export const Dyagraphs = ({
  dyagraphs,
  hiragana = false,
  katakana = false,
}) => {
  return (
    <div className="text-center p-5">
      {hiragana && <HiraganaDyagraphsInfo />}
      {katakana && <KatakanaDyagraphsInfo />}

      {dyagraphs.map((d) => {
        return (
          <p
            className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12"
            key={d.dyagraph}
          >
            <span className="p-1 text-2xl">
              {d.dyagraph} ({d.translation})
            </span>
            {d.dakuten ? (
              <span className="block">
                used with the dakuten (゛) will become
                <span className="p-1 text-2xl">
                  {d.dakuten} ({d.dakutenTranslation})
                </span>
              </span>
            ) : (
              ""
            )}
            {d.handakuten ? (
              <span className="block">
                used with the handakuten (ﾟ) will become
                <span className="p-1 text-2xl">
                  {d.handakuten} ({d.handakutenTranslation})
                </span>
              </span>
            ) : (
              ""
            )}
          </p>
        );
      })}
    </div>
  );
};
```

Next let's add our **PracticeSection.jsx** component:

```js
import { Char } from "../client/Char";
import { CharType } from "../client/CharType";
export const PracticeSection = ({ words, alphabet, type }) => {
  return (
    <>
      <div className="mt-10 text-center p-5">
        <h1 className="text-2xl m-5">Practice time!</h1>
        <p>
          Practice makes perfect so for starters I will give you some words with
          the {type} characters.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 center">
          {words.map((w) => {
            return <Char w={w} />;
          })}
        </div>
      </div>

      <div className="mt-10 text-center p-5">
        <h1 className="text-2xl m-5">Writing time!</h1>
        <p>Let's see if you can recognize the characters correctly</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 center">
          {alphabet.map((w) => {
            return <CharType w={w} />;
          })}
        </div>
      </div>
    </>
  );
};
```

This component will render a section that allows the users to practice remembering the characters. As you can see we are using two new components inside of it. These will be [client side components](https://nextjs.org/docs/app/building-your-application/rendering/client-components). Inside the **/components/content** directory create a new one named **/client**. Inside of it create the **Char.jsx** component:

```js
"use client";
import { useState } from "react";
export const Char = ({ w }) => {
  const [show, setShow] = useState(false);
  return (
    <p
      key={w.word}
      className="border-solid border-2 border-sky-500 rounded-3xl"
    >
      <span className="text-2xl">{w.word} </span>
      <span style={{ opacity: Number(show) }}>({w.translation})</span>

      <button
        type="button"
        className="border rounded-full border-indigo-500 bg-orange-500 text-white  px-2 py-2 m-2 transition duration-500 ease select-none hover:bg-orange-600 focus:outline-none focus:shadow-outline"
        onClick={() => setShow(!show)}
      >
        Translation
      </button>
    </p>
  );
};
```

This component will let us display a character and hide its reading so users can practice remembering them. Next create the **CharType.jsx** component:

```js
"use client";
import { useState } from "react";
export const CharType = ({ w }) => {
  const [wrong, right] = ["Boo! X__x", "Bingo! ^__^"];
  const kana = w.split("-")[1].trim().toLowerCase();
  const translation = w.split("-")[0].trim().toLowerCase();
  const [value, setValue] = useState("");
  const [colorClass, setColorClass] = useState("");

  const changeHandler = (e) => {
    console.log(e.target.value, translation);
    const input = e.target.value.trim().toLowerCase();

    if (input === translation) {
      setValue(right);
      setColorClass("text-green-800 bg-white rounded-full");
    } else {
      setValue(wrong);
      setColorClass("text-red-800 bg-white rounded-full");
    }
  };

  return (
    <div className="flex items-center justify-center border-solid border-2 border-sky-500 rounded-3xl">
      <label className="text text-3xl mx-2">{kana}</label>
      <p style={{ width: "6rem" }} className={`text ${colorClass}`}>
        {value}
      </p>
      <input
        className="w-10 rounded-full m-5 text-black text-center"
        type="tex"
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};
```

This component will let user type in readings for a character and provide feedback whether the reading provided is right or wrong.\
\
Next create an **ImageComponent.tsx**:

```js
import Image from "next/image";
export const ImageComponent = ({ imageSrc, imageAlt, script }) => {
  return (
    <div>
      <p className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12">
        As a final practice material, I will also give you this cute little
        table with {script} characters:
      </p>

      <div className="mt-10 flex items-center justify-center p-5">
        <Image
          src={imageSrc}
          width={0}
          height={0}
          priority
          sizes="100vw"
          style={{ width: "600px", height: "auto" }}
          alt={imageAlt}
        />
      </div>
    </div>
  );
};
```

Next, inside the **/components/content** directory, create a **/hiragana** one and inside of it create the **HiraganaDyagraphsInfo.jsx** component:

```js
import Link from "next/link";

export const HiraganaDyagraphsInfo = () => {
  return (
    <>
      <p className="text-3xl m-5">Hiragana Dyagraphs</p>
      <p className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12">
        If you thought the fun part is over when it comes to this script, you
        are wrong, my friend! In hiragana we also have these
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="https://www.wattpad.com/1027156152-language-book-japan-edition-hiragana-digraphs"
          target="_blank"
        >
          Dyagraphs
        </Link>
        which are basically groups of the
        <span className="text-2xl">や (Ya), ゆ (Yu), よ (Yo)</span> vowels plus a
        consonant. Let's have a look at them:
      </p>
    </>
  );
};
```

Next, create the **HiraganaInfo.jsx** component:

```js
import Link from "next/link";
export const HiraganaInfo = () => {
  return (
    <p className="mt-6 leading-8">
      <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
        Hiragana
      </Link>
      is the basic Japanese alphabet. Contrary to the English alphabet however, each
      character represents one syllable sound. Below, you will find a quick reference
      for how to draw each of the symbols.
    </p>
  );
};
```

Still inside the **/components/content** directory, create a **/katakana** directory. Inside create the **KatakanaDyagraphsInfo.jsx** file:

```js
import Link from "next/link";

export const KatakanaDyagraphsInfo = () => {
  return (
    <>
      <p className="text-3xl m-5">Katakana Dyagraphs</p>
      <p className="text-white leading-8 mx-auto px-5 py-2 w-full sm:w-6/12">
        Just like
        <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
          Hiragana
        </Link>, <Link
          className="p-1 hover:text-gray-800 underline"
          href="/katakana"
        >
          Katakana
        </Link> has its own
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="https://www.japanesepod101.com/lesson/how-to-write-in-japanese-hiragana-and-katakana-19-the-katakana-y-column-and-more-digraphs"
          target="_blank"
        >
          dyagraphs
        </Link>
        . Let's have a look at them:
      </p>
    </>
  );
};
```

Next, create the **KatakanaInfo.jsx**:

```js
import Link from "next/link";
export const KatakanaInfo = () => {
  return (
    <p className="mt-6 leading-8">
      <Link className="p-1 hover:text-gray-800 underline" href="/katakana">
        Katakana
      </Link>
      is the exact equivalent of
      <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
        Hiragana
      </Link>
      when it comes to pronounciation. The main difference is how the characters
      look and when they are used. They look completely different from
      <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
        Hiragana
      </Link>
      and are more angular. Only a few characters look similar (like か -hiragana
      / カ -katakana). They are used for foregin or loan words.
    </p>
  );
};
```

Next, inside **/components/client** create also a **/kanji** directory. Inside of it create the **KanjiInfo.jsx** component:

```js
import Link from "next/link";
export const KanjiInfo = () => {
  return (
    <>
      <div>
        <p className="mt-6 leading-8">
          <Link className="p-1 hover:text-gray-800 underline" href="/kanji">
            Kanji
          </Link>
          is the mos widely used Japanese script. However it is not native to Japan,
          it was brought in and adapted from China.
        </p>
      </div>
    </>
  );
};
```

Finally after all of this, fill in the contents of the **page.js** file inside the **/(site)/hiragana** directory:

```js
import { StrokeOrder } from "../../components/content/StrokeOrder";
import { hiraganaAlphabet, hiraganaWords, diacritics, dyagraphs } from "./data";
import { Diacritics } from "../../components/content/Diacritics";
import { Dyagraphs } from "../../components/content/Dyagraphs";
import { PracticeSection } from "../../components/content/PracticeSection";
import { ImageComponent } from "../../components/content/ImageComponent";
import { HeaderComponent } from "../../components/content/Header";
export const metadata = {
  title: "Hiragana",
  description: "Page to learn Hiragana",
};
export default function Hiragana() {
  return (
    <>
      <HeaderComponent
        script="Hiragana"
        imgAlt="hiragana gomenasai girl"
        imgSrc="/hiragana_gomenasai.jpg"
        hiragana
      />

      <StrokeOrder
        script={hiraganaAlphabet}
        indexes={[35, 38, 43, 46, 47, 48]}
        scriptName="hiragana"
      />

      <Diacritics diacritics={diacritics} />

      <Dyagraphs dyagraphs={dyagraphs} hiragana />

      <PracticeSection
        words={hiraganaWords}
        alphabet={hiraganaAlphabet}
        type="hiragana"
      />

      <ImageComponent
        script="hiragana"
        imageSrc="/assets/hiragana/hiragana_characters.jpg"
        imageAlt="Gomenasai hiragana girl"
      />
    </>
  );
}
```

Now that the hiragana page is done, let's move on to the katakana one. In the **/(site)/katakana/page.js** file paste the below:

```js
import { StrokeOrder } from "../../components/content/StrokeOrder";
import { Diacritics } from "../../components/content/Diacritics";
import { Dyagraphs } from "../../components/content/Dyagraphs";
import { PracticeSection } from "../../components/content/PracticeSection";
import { HeaderComponent } from "../../components/content/Header";
import { ImageComponent } from "../../components/content/ImageComponent";
import { diacritics, dyagraphs } from "../../(site)/katakana/data";
import { katakanaWords, katakanaAlphabet } from "../../(site)/katakana/data";
export const metadata = {
  title: "Katakana",
  description: "Page to learn Katakana",
};
export default function Katakana() {
  return (
    <>
      <HeaderComponent
        script="Katakana"
        imgSrc="/assets/katakana/katakana_fu_bu.webp"
        imgAlt="Katakana fu bu"
        katakana
      />

      <StrokeOrder
        script={katakanaAlphabet}
        indexes={[35, 38, 43]}
        scriptName="katakana"
      />
      <Diacritics diacritics={diacritics} />
      <Dyagraphs dyagraphs={dyagraphs} katakana />
      <PracticeSection
        words={katakanaWords}
        alphabet={katakanaAlphabet}
        type="katakana"
      />

      <ImageComponent
        script="katakana"
        imageAlt="katakana fu bu girl"
        imageSrc="/assets/katakana/katakana_characters.jpg"
      />
    </>
  );
}
```

Since we reused the previous components this page was super easy to create. Let's move on to the kanji page. First in the **/components/content/client/kanji** directory add the **KanjiExtra.jsx** file:

```js
import Link from "next/link";
import Image from "next/image";
export const KanjiExtra = () => {
  return (
    <div className="mt-10 text-center p-5 w-120">
      <p>
        <Link className="p-1 hover:text-gray-800 underline" href="/kanji">
          Kanji characters
        </Link>
        are not sylables (unlike
        <Link className="p-1 hover:text-gray-800 underline" href="/hiragana">
          Hiragana
        </Link>
        or
        <Link className="p-1 hover:text-gray-800 underline" href="/katakana">
          Katakana
        </Link>
        ). The characters actually represent a concept or an idea.
      </p>
      <p>I will give you another quick example for starters:</p>
      <Image
        src="/assets/kanji/japan_kanji.webp"
        width={300}
        height={300}
        alt="Japan kanji"
        className="mx-auto my-5"
      />
      <p>
        As you notice from the picture, the
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="/hiragana"
          target="_blank"
        >
          Hiragana
        </Link>
        characters alongside the
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="/kanji"
          target="_blank"
        >
          Kanji
        </Link>
        are called
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="/https://storylearning.com/learn/japanese/japanese-tips/what-is-furigana"
          target="_blank"
        >
          furigana
        </Link>
        and their role is to help us understand the prononciation of the
        <Link
          className="p-1 hover:text-gray-800 underline"
          href="/kanji"
          target="_blank"
        >
          Kanji
        </Link>.
      </p>
      <div className="w-[100%] mx-auto md:w-[80%]">
        <p>
          The word <span className="text-2xl">日本</span> can also be written as
          <span className="text-2xl"> にほん</span> or
          <span className="text-2xl"> にっぽん</span>.
        </p>
        <p className="text-center text-2xl my-5">Kanji pronounciation</p>
        <p className="text-center">
          <Link
            className="p-1 hover:text-gray-800 underline"
            href="/kanji"
            target="_blank"
          >
            Kanji
          </Link>
          characters have multiple pronounciations, which makes it tricky to learn
          them, but getting started should not be that hard. I will give you a quick
          example.
        </p>
        <p className="text">
          The symbol: <span className="text-2xl">人</span> is the{" "}
          <Link
            className="p-1 hover:text-gray-800 underline"
            href="/kanji"
            target="_blank"
          >
            kanji
          </Link>
          for person. It is normally pronounced
          <span className="text-2xl">ひと</span>. Yet, if we combine it with
          another
          <Link
            className="p-1 hover:text-gray-800 underline"
            href="/kanji"
            target="_blank"
          >
            kanji
          </Link>
          such as <span className="text-2xl">日本人</span> we get the word{" "}
          <span className="text-2xl">にほんじん</span> (this being the word for
          Japanese person).
        </p>

        <p className="text-center text-2xl my-5">Onyomi and Kunyomi</p>
        <p className="text-center">
          These are the 2 main ways in which{" "}
          <Link
            className="p-1 hover:text-gray-800 underline"
            href="/kanji"
            target="_blank"
          >
            Kanji
          </Link>
          are read. Onyomi is the original Chinese pronounciation of the character
          (and it is used in compond words), while Kunyomi is the Japanese reading
          (and used in stand alone words).
        </p>
        <p className="text">
          Let's go back to the <span className="text-2xl">人</span>. The Kunyomi
          reading for this character is <span className="text-2xl">ひと</span>
          while the Onyomi reading is <span className="text-2xl">ジン</span>.
        </p>
      </div>
    </div>
  );
};
```

Next, in the same directory add the **StrokeOrderKanji.jsx** file:

```js
import Image from "next/image";
import { kanji } from "../../../(site)/kanji/data";

export const StrokeOrderKanji = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 center">
      {kanji.map((k) => {
        return (
          <div className="text-center" key={k.kanji}>
            <p className="text-xl">
              {k.kanji} ({k.meaning})
            </p>
            <Image
              className="mx-auto m-5 rounded-full"
              src={`/assets/kanji/kanji_${k.kanji}.gif`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "90px", height: "auto" }}
              alt={`${k.kanji} ${k.meaning}`}
            />
            <p className="text-2xl">Readings:</p>
            <p className="text-2xl">onyomi: {k.onyomi.map((i) => `${i}、`)}</p>
            <p className="text-2xl mb-5">
              kunyomi: {k.kunyomi.map((i) => `${i}、`)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
```

Finally, in the **/(site)/kanji/page.js** file paste the below:

```js
import { HeaderComponent } from "../../components/content/Header";
import { KanjiExtra } from "../../components/content/kanji/KanjiExtra";
import { StrokeOrderKanji } from "../../components/content/kanji/StrokeOrderKanji";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kanji",
  description: "Page to learn Kanji",
};
export default function Kanji() {
  return (
    <>
      <HeaderComponent
        script="Kanji"
        imgSrc="/assets/kanji/kanji_songoku.png"
        imgAlt="songoku kanji furigana"
        kanji
      />
      <KanjiExtra />

      <StrokeOrderKanji />

      <div className="w-[100%] mx-auto md:w-[80%] text-center">
        <p>Now that you know how to get started with </p>{" "}
        <Link className="p-1 hover:text-gray-800 underline" href="/kanji">
          Kanji
        </Link>
        , you just need to practice a bit more and get used to them litle by little.
      </div>
      <div className="mt-10 pb-10 flex items-center justify-center">
        <Image
          src="/assets/kanji/kanji_study.webp"
          width={500}
          height={500}
          priority
          alt="girl learns kanji"
        />
      </div>
    </>
  );
}
```

Our application is almost ready, let's now just finish up by adding the readings page. First we will need one more [client component](https://nextjs.org/docs/app/building-your-application/rendering/client-components) created inside **/components/content/client** namely **StorySentence.jsx**:

```js
"use client";
import { useState } from "react";
export const StorySentence = ({ text }) => {
  const [isShow, setShow] = useState(false);
  const toggle = () => {
    setShow(!isShow);
  };
  return (
    <div className="flex flex-col md:flex-col pt-10 justify-center text-2xl w-[80%] md:w-[60%] mx-auto">
      <p className="m-5">
        <span className="underline block m-2">Kanji:</span>
        {text.kanji}
      </p>
      <p className="m-5">
        <span className="underline block m-2">Hiragana:</span>
        {text.hiragana}
      </p>

      <p className="m-5">
        <span className="underline block m-2">Romaji:</span>
        <span style={{ opacity: Number(isShow) }}> {text.romaji}</span>
        <button
          onClick={toggle}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mx-5"
        >
          See reading
        </button>
      </p>
      <p className="m-5">
        <span className="underline block m-2">Translation:</span>
        {text.translation}
      </p>
    </div>
  );
};
```

This will be a component that will let the users toggle the [romaji reading](https://www.japanesepod101.com/japanese-romaji/) of the story sentences so they can practice reading better. Once you have the component, paste the below contents inside **/(site)/readings/page.js**:

```js
import Image from "next/image";
import { readings } from "./data";
import { StorySentence } from "../../components/client/StorySentence";
import Link from "next/link";

export const metadata = {
  title: "Readings",
  description: "Page to learn Readings",
};
export default function Katakana() {
  return (
    <>
      <h1 className="text-center m-auto text-3xl py-5">
        The story of Momotaro
      </h1>
      <div className="flex flex-col md:flex-col pt-10 justify-center text-2xl w-[80%] md:w-[60%] mx-auto">
        <p className="m-5">
          If you want to practice a bit your knowledge, feel free to read the
          story below:
        </p>
      </div>
      <div className="mt-10 pb-10 flex items-center justify-center">
        <Image
          src="/momotaro-densetsu.jpg"
          width={500}
          height={500}
          priority
          alt="girl learns kanji"
        />
      </div>
      {readings.map((r) => {
        return <StorySentence text={r} />;
      })}
      <div className="flex flex-col md:flex-col pt-10 justify-center text-2xl w-[80%] md:w-[60%] mx-auto">
        <p className="m-5">
          Now, if I did pique your interest, you can read the full story here:
          <Link
            className="p-5 hover:text-gray-800 underline"
            href="https://www.lingual-ninja.com/folktales/Momotaro#Momotaro%20Story"
            target="_blank"
          >
            Full Momotaro story
          </Link>
        </p>
      </div>
    </>
  );
}
```

With this, you have implemented your first application with [NextJS](https://nextjs.org/) and I really hope you've learned a thing or two about how to use the framework. Also, if you want to dig in some more, feel free to check [this article](https://code-pill.com/posts/next-js-bits-routing). If you want to compare your code against mine, I have the repo [here](https://github.com/StanciuDragosIoan/japanese_learning_app). Also you can see the app [live here](https://japanese-learning-app-beta.vercel.app/).

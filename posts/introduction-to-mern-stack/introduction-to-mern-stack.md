---
title: "Introduction to the MERN stack"
date: "2023-11-22"
image: mern.png
excerpt: This article will be an introduction to the MERN stack and we will build a full-stack calorie tracker app.
isFeatured: true
---

The [MERN](https://www.mongodb.com/mern-stack) stack is a powerfull tool for building complex applications. It is also fairly easy to get started with and it has several variants such as [MEAN](https://www.mongodb.com/mean-stack) or [MEVN](https://www.educative.io/answers/what-is-mevn-stack) so it is really worth learning it as the only difference between these stacks is the front-end layer (consisting of either [React](https://react.dev/), [Angular](https://angular.io/) or [VueJS](https://vuejs.org/)).

In this post we will be building a full-stack calorie tracking app using the [MERN](https://www.mongodb.com/mern-stack) stack. We will be using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for ease of setting it up and deploying.

Let's get started on the project. In a new directory, let's create a 'client' directory and a 'server' one. We'll be starting in the 'client' one and generating our react project.\
\
So while cd-ed into client run the below commands:

```js

npx create-react-app .

```

Once that finishes, let's install [TailwindCSS](https://tailwindcss.com/):

```js
npm install -D tailwindcss
```

After that let's initialize tailwind:

```js
npx tailwindcss init
```

This created a **_tailwind.config.js_** file in the 'client' directory. Replace its contents with this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Next, in the **_/src/index.css_** file replace its contents with these imports:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Next replace the contents in **_App.js_** with this:

```js
function App() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
```

You can also delete the **_App.css_** and **_App.test.js_** files from the src directory.\
\
Next let's set up [routing](https://medium.com/@aadilahmed0/a-basic-intro-to-client-side-routing-using-react-router-e9effe7cab4d). Let's start by installing [React Router](https://reactrouter.com/en/main):

```js
npm i react-router-dom
```

Once that finishes, replace the contents of **_App.js_** with:

```js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <>
        <nav>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meals">Meals</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;

function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>This is the homepage</p>
    </>
  );
}

function About() {
  return (
    <>
      <h2>About</h2>
      <p>This is the about page</p>
    </>
  );
}

function Meals() {
  return (
    <>
      <h2>Meals</h2>
      <p>This is the meals page</p>
    </>
  );
}

function Profile() {
  return (
    <>
      <h2>Profile</h2>
      <p>This is the profile page</p>
    </>
  );
}
```

Now we can navigate between the 3 pages. Let's enhance their looks a bit using [tailwind](https://tailwindcss.com/). Let's create a '/components' directory inside 'src' and inside of it, a **_Navigation.js_** file. Inside of it paste the below:

```js
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "meals" },
    { name: "About", href: "about" },
    { name: "Profile", href: "profile" },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-shrink-0 items-center text-white font-extrabold invisible md:visible">
                Meals
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
```

Next, you need to install 2 more dependencies for this component:

```js
npm i @heroicons/react
npm i @headlessui/react
```

Finally replace the contents of **_App.js_** as per below:

```js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;

function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>This is the homepage</p>
    </>
  );
}

function Meals() {
  return (
    <>
      <h2>Meals</h2>
      <p>This is the meals page</p>
    </>
  );
}

function Profile() {
  return (
    <>
      <h2>Profile</h2>
      <p>This is the profile page</p>
    </>
  );
}
```

Now you can navigate between pages using the new fancy navigation component. The inspiration for this navigation as well as for other components we'll be creating I took it from [here](https://tailwindui.com/components) and I encourage you to explore some more of them.\
\
Let's next start working on the homepage. In the 'src' directory create a 'pages' directory and inside of it create a **_Homepage.js_** file. Inside of it paste the below:

```js
export default function Homepage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Welcome to Meals! An app for properly tracking your meals and
              calories!
              <a href="/about" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              No more excuses, just results
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Use our application to easely and accurately track your meals,
              calories and overall progress on your diet.
            </p>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

Next, import the **_NotFound_** page in the **_App.js_** file and add a route to it with the path of \* (to match any other route than the ones already registered). Next, I want us to add a footer component. Create a **_Footer.js_** component inside the **_/components_** directory. Inside of it paste:

```js
export default function NotFoundPage() {
  return (
    <div className="bg-white" style={{ marginTop: "4rem" }}>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Unfortunately the page you are looking for does not exist.
            </h1>
          </div>

          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Please go back to homepage
              <a href="/" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                &nbsp; Homepage <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

Next, in the components directory, create a **_Footer.js_** file:

```js
export const Footer = () => {
  return (
    <footer
      style={{ marginTop: "20rem" }}
      class="bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023
          <a href="/" class="hover:underline">
            Meals
          </a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" class="hover:underline me-4 md:me-6">
              Home
            </a>
          </li>
          <li>
            <a href="/meals" class="hover:underline me-4 md:me-6">
              Meals
            </a>
          </li>
          <li>
            <a href="/about" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="/profile" class="hover:underline me-4 md:me-6">
              Profile
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
```

Next, import the Footer component in **_App.js_** and display it under the <Routes> component. Let's now do the about page. Create an About.js file inside pages and inside of it paste:

```js
export default function About() {
  const topics = [
    {
      description: "No more hate for food",
      extra: "Easy to track everything",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1673816936941-93621f755771",
    },
    {
      description: "Real progress",
      extra: "Measurable and concrete results",
      imageUrl: "https://images.unsplash.com/photo-1577563682708-4f022ec774fb",
    },
    {
      description: "Easy to use",
      extra: "Everything at your finger tips",
      imageUrl: "https://images.unsplash.com/photo-1584389839688-13ad9a3eac07",
    },
    {
      description: "Enjoy food again",
      extra: "Again a healthy relationship with food",
      imageUrl: "https://images.unsplash.com/photo-1532991057770-5ab2d3b7a6a4",
    },
  ];

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Welcome to Meals! An app for properly tracking your meals and
              calories!
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              No more excuses, just results
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Use our application to easely and accurately track your meals,
              calories and overall progress on your diet.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              #Meals!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              An app that will make your life so much easier and so much
              tastier!
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {topics.map((topic) => (
              <li key={topic.description}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-32 w-32 rounded-full"
                    src={topic.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {topic.description}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {topic.extra}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

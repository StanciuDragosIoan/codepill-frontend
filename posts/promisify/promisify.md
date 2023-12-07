---
title: "Promisify"
date: "2023-12-07"
image: nested.webp
excerpt: In this article we will have a quick look at an important topic, namely the difference between callbacks and promises in JavaScript.
isFeatured: true
---

Published **7th December 2023**.

## Callbacks vs Promises

\
[Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) are a very important concept and we need to understand a bit the difference between [them](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) and [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

\
In [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) functions are [first class citizens](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) which means we can also pass them around as arguments. A [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) is just a function passed as an argument to another function and executed inside that function.

\
So we can do something like:

```js
const callBack = () => {
  console.log("I have been called back at the end of some async task");
};

const failedCallBack = () => {
  throw new Error("Ooops, that didn't go well..");
};

const mainFunc = (time, cb) => {
  setTimeout(() => cb(), time);
};

mainFunc(1000, callBack);
mainFunc(2000, failedCallBack);
```

\
\*Note that the callback may also fail (just as you saw above). The problem with callbacks is that if you nest too many of them, you get to what's called a 'callback hell' (namely too many nested callbacks which have to be handled separately and the code gets messy):

```js
const cb1 = (cb) => {
  setTimeout(() => {
    console.log("cb1 has been called back at the end of some async task");
    cb();
  }, 1000);
};

const cb2 = (cb) => {
  setTimeout(() => {
    console.log("cb2 has been called back at the end of some async task");
    cb();
  }, 2000);
};

const cb3 = (cb) => {
  setTimeout(() => {
    console.log("cb3 has been called back at the end of some async task");
    cb();
  }, 3000);
};

const failedCallBack = () => {
  throw new Error("Ooops, that didn't go well..");
};

const mainFunc = (time) => {
  setTimeout(function () {
    cb1(function () {
      cb2(function () {
        cb3(failedCallBack);
      });
    });
  }, time);
};

mainFunc(1000);
```

I hope you can start to see the issue with the callback hell. Even if we re-write the **_mainFunc()_** using [arrowFunctions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), so like this:

```js
const mainFunc = (time) => {
  setTimeout(() => cb1(() => cb2(() => cb3(failedCallBack))), time);
};
```

We still have the issue of handling the nesting of function calls. So [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to the rescue!. [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) were introduced with [ES6](https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript) specifically to address this issue. With promises, our example becomes something like:

```js
const promise1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const promise2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise2 has been resolved at the end of some async task");
      resolve();
    }, 2000);
  });
};

const promise3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise3 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const failedCallBack = () => {
  throw new Error("Ooops, that didn't go well..");
};

const mainFunction = () => {
  promise1()
    .then(() => promise2())
    .then(() => promise3())
    .then(() => failedCallBack())
    .catch((err) => {
      console.error(`Error: ${err.message}`);
    });
};

mainFunction();
```

\
We now got rid of the callbacks nesting but we can still do better. We can use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

```js
const promise1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const promise2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise2 has been resolved at the end of some async task");
      resolve();
    }, 2000);
  });
};

const promise3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise3 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const failedCallBack = () => {
  setTimeout(() => {
    throw new Error("Ooops, that didn't go well..");
  }, 500);
};

const mainFunction = async () => {
  try {
    await promise1();
    await promise2();
    await promise3();
    await failedCallBack();
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

mainFunction();
```

\
\* Note how this is much more readable and easier to understand and maintain. Next, in order to better understand how all these 3 ways of handling asynchronous code work, I suggest we do a little exercise. Let's say we have a callback style function like this:

```
const callBack = (arg) => {
  console.log(arg);
};

const main = (time, cb) => {
  console.log("Starting main..");
  setTimeout(() => {
    cb();
  }, time);
}

main(1000, () => callBack("this was successfull"));
main(2000, () => callBack(new Error("some Err occurred...")));
```

\* Note that our callback can throw an error or it can successfully log the message. This is very smilar to how actual asynchronous tasks work (they sometimes fail and some other times they succeed). I want to call the main function as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (so to be able to use the [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) syntax and also to be able to [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) it). The [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) syntax allows chaining promises, which can still get pretty cumbersome at times so I highly recommend using [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) instead that.

\
If we are to look at some difference between chaining promises and using [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), it will be the fact that promise chains do not wait for the promise to finish before executing subsequent code (while [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) do it). So for instance the code below:

```js
const promiseItem1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const promiseHandler = () => {
  const val = promiseItem1().then((val) => console.log(val));
  console.log("function started..."); //note how this logs first
};

promiseHandler();
```

\
\*Note how the 'function started' log pops up first so the promise is triggered but the handler does not wait for it to finish before executing the subsequent line, whereas with [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) we get something like this:

```js
const promiseItem1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promise1 has been resolved at the end of some async task");
      resolve();
    }, 1000);
  });
};

const asyncHandler = async () => {
  const val = await promiseItem1();
  console.log("val here", val); //note how this logs first
  console.log("function started..."); //this logs last
};

asyncHandler();
```

\
\*Note how now the promise is resolved before the final console log (so the async function 'stops' and waits for the async operation to finish - in this case for the promise to resolve or reject). From this little 'experiment' we can only infer that we may want to simply chain promises instead of using [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) if the operations do not depend on one another and we do not care for their completion when triggering multiple of them. But for most part [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is the best practice and the recommended way to deal with async code (unless some other constraint forces us to use promises or even worse callbacks).

\
As for our exercise, let's try to write a function that wraps a 'callback style' function in a promise so we can get this better control over how code executes. Let's use the code below:

```js
const callBack = (arg) => {
  setTimeout(() => {
    const defaultArg = "default";

    if (arg) {
      console.log(arg);
      return arg;
    }

    return defaultArg;
  }, 1000);
};

const failedCallBack = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Ooops, that didn't go well.."));
    }, 2000);
  });
};

const main = (time, cb) => {
  console.log("Starting main..");
  setTimeout(() => {
    cb();
  }, time);
};

main(500, () => callBack("someArg"));
main(700, failedCallBack);
```

\*Note that our callback can also fail. And we want to write a generic promise-like wrapper for it:

```js
const promiseWrapper = (asyncFunction) => {
  return function (...args) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await asyncFunction(...args);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };
};
```

\* Note how we wrap everything in a function. This is called a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) and in this particular use case it allows us to store the scope and variables of the functions in order to re-use them later on (in our case after the promisification). I figured beginners find it hard to give an example of a closure use-case but this one is pretty standard and commonly used.
\
Now we can wrap the initial callback-style functions in this wrapper and use them like so:

```js
const callBack = (arg) => {
  setTimeout(() => {
    const defaultArg = "default";

    if (arg) {
      console.log(arg);
      return arg;
    }

    return defaultArg;
  }, 1000);
};

const failedCallBack = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Ooops, that didn't go well.."));
    }, 2000);
  });
};

const promiseWrapper = (asyncFunction) => {
  return function (...args) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await asyncFunction(...args);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };
};

const promise1 = promiseWrapper(callBack);
const promise2 = promiseWrapper(failedCallBack);

promise1("someArg").then((res) => console.log(res));
promise2()
  .then((res) => console.log(res))
  .catch((err) => console.log("some err occurred: ", err.message));
```

We can also put everything in an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) for a cleaner handling like so:

```js
const asyncHandler = async () => {
  try {
    const res1 = await promise1("someArg");
    console.log(res1);
    const res2 = await promise2();
    console.log(res2);
  } catch (err) {
    console.log(err.message);
  }
};
```

\
After everything so far you might still be wondering: why bother with this cumbersome re-writing for async operations? The answer is simple: we do this so that we can use legacy (callback style) libraries more uniformly and more predictably by wrapping them in promises (instead of using old-school and cumbersome callbacks) and in [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) functions. In the [NodeJS utils module](https://nodejs.org/api/util.html) there already is a 'promisify' function (one slightly more complex than ours, whose implementation you can see [here](https://github.com/nodejs/node/blob/main/lib/internal/util.js)).

---
title: "NodeJS Streams"
date: "2023-12-15"
image: streams.jpg
excerpt: This time around we will be having a look at the concept of streams in NodeJS in particular and we will build a little command line application.
isFeatured: true
---

Published **20th December 2023**.

## Streams

\
A [stream](<https://en.wikipedia.org/wiki/Stream_(computing)>) is a generic concept in programming (we have them in any programming language not just in [NodeJS](https://nodejs.org)). They are basically continuous flows of data that we can process sequentially (one part at a time). We can both read and write to them and we can work with them in chunks rather than consume all the data at once.

\
[They](<https://en.wikipedia.org/wiki/Stream_(computing)>) are very handy when we have to process large data sets that we cannot fit into memory all at once (due to various constraints). [Streams](<https://en.wikipedia.org/wiki/Stream_(computing)>) are memory efficient, fast and highly flexible. They are used to process large data sets, to work with real time data (like a chat application or a streaming service), network communication, file I/O, etc...

\
As I already mentioned, they are present in all programming languages although the implementation might be different, they serve the same purpose (namely working with large data sets in a more efficient way). So we can find them in [PHP](https://www.php.net/manual/en/book.stream.php), [Java](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html), [Golang](https://pkg.go.dev/github.com/reugn/go-streams), [C++](https://cplusplus.com/reference/iolibrary/) and so on. And of course we will be having a look at [NodeJS streams](https://nodejs.org/api/stream.html).

\
Let's start working on a little project involving streams and see how far we can get. Create an **nodeCli** file (no .js extension) and paste inside:

```js
#!/usr/bin/env node

console.log("Welcome to nodeCli");
```

- Note the first line, it is a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) also known as a [hashbang](https://senthilnayagan.medium.com/shebang-hashbang-10966b8f28a8) it tells the system which interpreter to use when executing the file (in our case it should use node). Let's try running the file, in a terminal (while at the nodeCli path) run:

```js
chmod +x nodeCli
```

This will give execution permission to your file so it can run on linux systems. Next run:

```js
./nodeCli
```

This will run the script and print our log for now. If you are on windows instead of **./nodeCli** just run **node nodeCli** (this will use node to run the program directly as opposed to executing it like a linux script). Remember that it is ultimately a nodeJS script and it can be run by the node command line.

Let's enhance our [command line program](https://en.wikipedia.org/wiki/Command-line_interface) a bit, replace its contents with it:

```js
#!/usr/bin/env node

const args = process.argv;

const commands = ["read", "write", "copy", "encrypt", "decrypt"];

let command = args[2];
const fileArg = args[3];

switch (commands.indexOf(command)) {
  case 0:
    console.log(`command is ${command}`);
    break;
  case 1:
    console.log(`command is ${command}`);
    break;
  case 2:
    console.log(`command is ${command}`);
    break;
  case 3:
    console.log(`command is ${command}`);
    break;
  case 4:
    console.log(`command is ${command}`);
    break;

  default:
    console.log(
      `You entered a wrong command: ${command}. See help text below for supported functions`
    );

    return;
}
```

Now if you run the program with **./nodeCli**, you will see a log like:

```js
You entered a wrong command: undefined. See help text below for supported functions
```

If you type in anything after **./nodeCli** so something line **./nodeCli test** you will see:

```js
You entered a wrong command: test. See help text below for supported functions
```

Finally if you type in **./nodeCli read** (same for write, copy, encrypt, decrypt) you will see a log with: **command is read/write,etc...**

In the current implementation we are reading the command line arguments (line **const args = process.argv** does this for us), then we define a series of commands, we grab the command itself from the arguments (remember the **./nodeCli test** case), we also define a **fileArg** (this will be a 3rd argument to our script representing the path to a file that we will work with) and finally we run a switch case checking all commands and logging a default case for commands outside of the ones we have specified. For now let's work on an initial prompt that we want to show to the user to 'teach' them how to use our command line application. Replace the contents of **_nodeCli_** with the below:

```js
#!/usr/bin/env node

const args = process.argv;

const commands = ["read", "write", "copy", "encrypt", "decrypt"];

const logError = (message) => {
  console.error(`Error: ${message}`);
};

const getInitialPrompt = () => {
  const initialPrompt = `
      nodeCli is a simple cli program to demonstrate how to manipulate files using NodeJS streams.
  
      usage:
          nodeCli <command> <path_to_file>
  
          <command> argument can be:
  
          read: Print a file's contents to the terminal
          write: Write a message from the terminal to a file
          encrypt: Encrypt a file
          decrypt: Decrypt a file
          copy: Create a copy of a file in the current directory
  
          <path_to_file> is the path to the file you want to work with.
      `;

  console.log(initialPrompt);
};

let command = args[2];
const fileArg = args[3];

if (args.length < 3 || args.length > 4 || !fileArg) {
  logError("Invalid arguments provided");
  getInitialPrompt();
  return;
}

switch (commands.indexOf(command)) {
  case 0:
    console.log(`command is ${command}`);
    break;
  case 1:
    console.log(`command is ${command}`);
    break;
  case 2:
    console.log(`command is ${command}`);
    break;
  case 3:
    console.log(`command is ${command}`);
    break;
  case 4:
    console.log(`command is ${command}`);
    break;

  default:
    console.log(
      `You entered a wrong command: ${command}. See help text below for supported functions`
    );
    getInitialPrompt();
    return;
}
```

For starters we have added a **logError** function and a **getInitialPrompt()** one that just shows the user how to use the command line script. We have also added an if statement checking whether or not they provided any arguments or if they provide too little or too many of them.

\
Let's now start working on the **_read_** command. We need a **readFile()** method for that and we will use [streams](https://nodejs.org/api/stream.html) for it. The method looks like this:

```js
const readFile = (path) => {
  const readableStream = fs.createReadStream(path, "utf-8");

  readableStream.on("error", function (error) {
    logError(`Reading file failed: ${error.message}`);
  });

  readableStream.on("data", (chunk) => {
    console.log(chunk);
  });
};
```

Add the method under **getInitialPrompt()** and then call it in the switch statement (while passing it the **fileArg** as argument) for the case where the index of the command is 0. Also add the below import up top in your file under the [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) line:

```js
const fs = require("fs");
```

In order to test it, you need to create a text file (it can be either alongside the **nodeCli** file or in some nested directories) and then run the program with the path to the file as the 3rd argument so something like:

```js
./nodeCli test.txt // in case the file is alongside the nodeCli file
./nodeCli dir1/dir2/test.txt // in case the file is in dir1/dir2
```

\*Note how we pass the encoding argument (the string "utf-8") to the [createReadStream](https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions) method. If we did not, the text would be displayed in the terminal like so:

```js
<Buffer 48 65 6c 6f>
```

This is the string in its hexadecimal representation of a [Buffer](https://nodejs.org/api/buffer.html) this means that it is basically our string as raw data. We need to pass the [encoding](https://en.wikipedia.org/wiki/Character_encoding) parameter of [utf-8](https://en.wikipedia.org/wiki/UTF-8) in order to transform it in readable text.
\
Now that you know this, let's work on the "write" command. We want a function that writes what we type into the terminal into a file. First add this import up top in the file under the 'fs' import:

```js
const readline = require("node:readline");
```

Next, let's add the writeToFile() method right under **readFile()** :

```js
const writeToFile = (path) => {
  const writableStream = fs.createWriteStream(path);

  writableStream.on("error", (error) => {
    logError(
      `An error occured while writing to the file. Error: ${error.message}`
    );
  });

  //create instance of readLine
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Enter a sentence: ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    switch (line.trim()) {
      case "exit":
        rl.close();
        break;
      default:
        writableStream.write(`${line}\n`);
        rl.prompt();
        break;
    }
  }).on("close", () => {
    writableStream.end();
    writableStream.on("finish", () => {
      console.log(`All your sentences have been written to ${path}`);
    });
  });
};
```

This function uses the [readline](https://nodejs.org/api/readline.html) interface to grab the user input from the terminal. Then it writes every single line into the file provided. Once the user writes the word "exit" it closes the stream and saves the file. Now call the function in the switch case for the index 1. Don't forget to pass it the **fileArg** (so the path to the file where it's supposed to write). Now in order to test you need to create the file where it will write (either alongside **nodeCli** or in some nested directory) and then run the cli script with the filePath argument. I will create a **written.txt** file and run it like so:

```
./nodeCli write written.txt
```

Now I can type in the terminal and it will write each and every line in the file. As soon as I m done I type the word "exit" and it will save the file. Test it and see how it works for yourself. Let's add the **copyFile()** method right under the **WriteToFile()** one:

```js
const copyFile = (path) => {
  const fileNameWithoutExtension = getFileNameWithoutExtension(path);
  const readStream = fs.createReadStream(path);

  const outputStream = fs.createWriteStream(
    `${fileNameWithoutExtension}-copy.txt`
  );

  readStream.pipe(outputStream);

  outputStream.on("finish", () => {
    console.log(
      `You have successfully created a ${fileNameWithoutExtension} copy. The new file name is ${fileNameWithoutExtension}-copy.txt.`
    );
  });
};
```

This method reads the file provided to it, creates a write stream by using the name of the initial file and the word copy appended by a dash and pipes the read file through the written one. Piping means to "pour" the data from the read stream into the written one. You can read more about that [here](https://www.geeksforgeeks.org/what-is-piping-in-node-js/).

Right above the **copyFile()** method add the **getFileNameWithoutExtension()** method:

```js
const getFileNameWithoutExtension = (path) => {
  const splitPath = path.split("/");
  const fileNameWithExtension = splitPath[splitPath.length - 1];
  return fileNameWithExtension.split(".")[0];
};
```

Finally call the method in the switch case for index 2 (while passing it the fileArg). Now you can test it by running:

```js
./nodeCli copy <fileToCopy>
```

Now you can copy files too. Let's start working on the [encryption](https://www.geeksforgeeks.org/what-is-data-encryption/) part. We will have 2 functions (**encryptFile()** and **decryptFile()**). First add these 2 imports under the readline one:

```js
const {
  scryptSync,
  randomFillSync,
  createCipheriv,
  createDecipheriv,
} = require("node:crypto");

const { pipeline } = require("node:stream");
```

Next, let's add the **encryptFile()** method:

```js
const encryptFile = async (path) => {
  const fileNameWithoutExtension = getFileNameWithoutExtension(path);

  const algorithm = "aes-192-cbc";
  const password = "Password used to generate key";

  try {
    // Generate the key using scrypt
    const key = await scryptSync(password, "salt", 24);

    // Generate a random initialization vector (IV)
    const iv = await randomFillSync(Buffer.alloc(16));
    const cipher = createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(path);
    const output = fs.createWriteStream(`${fileNameWithoutExtension}.enc`);

    // Write the IV to the output file
    output.write(iv);

    // Encrypt the file
    pipeline(input, cipher, output, (err) => {
      if (err) throw err;
      console.log("Encryption completed.");
    });
  } catch (err) {
    logError(`Encryption error: ${err}`);
  }
};
```

This function uses [symmetric encryption](https://www.cryptomathic.com/news-events/blog/symmetric-key-encryption-why-where-and-how-its-used-in-banking) which means it uses the same key for both [encryption](https://en.wikipedia.org/wiki/Encryption) and [decryption](https://developer.mozilla.org/en-US/docs/Glossary/Decryption). The function grabs the file name, defines the algorithm to use (aes stands for 'advanced encryption system'), it sets a password to be used (I just put a random string in there) then it generates a [key](https://www.precisely.com/glossary/encryption-keys), next it generates an [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector) which is like an additional random value added to the key to make sure that it is unique (kind of like a [salt](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/) added to a [hash](https://stytch.com/blog/what-is-password-hashing)). The function then generates a [cipher text](https://www.techtarget.com/whatis/definition/ciphertex) (so it basically encrypts the text of our file) and writes it to the output variable (which is another stream defined as a [.enc file](https://www.reviversoft.com/en/file-extensions/enc)). The function next writes the [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector) into the file (we will need it for decryption) and pipes the input into the cipher and into the output, if it catches some error, it throws it, else all is good.

\
Next, call the function (with the fileArg) in the switch case for the index 3. Next you can test the scrpy by running:

```
./nodeCli encrypt test.txt //assuming you have the test.txt created
```

Next, let's add te **decryptFile()** method:

```js
const decryptFile = async (path) => {
  const fileNameWithoutExtension = getFileNameWithoutExtension(path);

  const algorithm = "aes-192-cbc";
  const password = "Password used to generate key";

  try {
    // Generate the key using scrypt
    const key = scryptSync(password, "salt", 24);

    const input = fs.createReadStream(path);

    // Read the IV from the beginning of the encrypted file
    const ivBuffer = await new Promise((resolve) => {
      input.once("readable", () => {
        const chunk = input.read(16);
        resolve(chunk);
      });
    });

    const decipher = createDecipheriv(algorithm, key, ivBuffer);

    const output = fs.createWriteStream(
      `${fileNameWithoutExtension}-decrypted.txt`
    );

    // Use pipeline for reading the IV and decrypting the file
    pipeline(input, decipher, output, (err) => {
      if (err) throw err;
      console.log("Decryption completed.");
    });
  } catch (err) {
    logError(`Decryption error: ${err}`);
  }
};
```

This is very similar to the encrypt one, it just reads the [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector) from the encrypted file and then decrypts the file in a smilar fashion. Once added, call it in the last case of the switch statement and don't forget to pass it the file arg. Next test it like so:

```
./nodeCli decrypt test.enc // this assuming you had encrypted a test.txt file
```

If you want to compare your file against mine, you can do so by using [this link](https://github.com/StanciuDragosIoan/nodeCli/blob/main/nodeCli). I hope you now have a clear idea of what it means to work with streams in NodeJS.

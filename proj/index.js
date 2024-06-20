// Node.js program to demonstrate the
// fs.watch() method

// Importing the filesystem module
import fs from "fs";

const filePath = "./message.txt";

//example with watch
// fs.watch(filePath, (eventType, filename) => {
//   if (filename) {
//     console.log(`${filename} file Changed: ${eventType}`);
//   }
// });

//watchFile
fs.watchFile(filePath, (curr, prev) => {
  console.log(`File Changed at: ${new Date(curr.mtime)}`);
  console.log(`Previous Modified Time: ${new Date(prev.mtime)}`);
});

//reference convo https://chatgpt.com/share/a353989b-259c-4f18-b37f-a04edaaee8f4

const express = require("express");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 8080;

// if (!process.env.PORT) {
if (!port) {
  throw new Error("Please Specify a port number.");
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/video", (req, res) => {
  const path = "./videos/SampleVideo.mp4";
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error("An error Occured.");
      res.sendStatus(500);
      return;
    }

    res.writeHead(200, {
      "content-length": stats.size,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(path).pipe(res);
  });
});

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});

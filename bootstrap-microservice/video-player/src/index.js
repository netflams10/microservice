const express = require("express");
// const fs = require("fs");
const http = require("http");

const app = express();

const port = process.env.PORT || 8080;

// if (!process.env.PORT) {
if (!port) {
  throw new Error("Please Specify a port number.");
}

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/video", (req, res) => {
  const path = "./videos/SampleVideo.mp4";
  const forward_request = http.request(
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: "/video?path=https://asset.cloudinary.com/djkoxdlrp/b2f2490ca585576b924b462cfa3180de",
      method: "GET",
      headers: req.headers,
    },
    (forwardResponse) => {
      res.writeHeader(
        forwardResponse.statusCode,
        forwardResponse.headers,
        forwardResponse.pipe(res)
      );
    }
  );

  req.pipe(forward_request);
});

app.get("/local-video", (req, res) => {
  const path = "./videos/SampleVideo.mp4";
  const forward_request = http.request(
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: `/get-video?path=${path}`,
      method: "GET",
      headers: req.headers,
    },
    (forwardResponse) => {
      res.writeHeader(
        forwardResponse.statusCode,
        forwardResponse.headers,
        forwardResponse.pipe(res)
      );
    }
  );

  req.pipe(forward_request);
});

// app.get("/video", (req, res) => {
//   const path = "./videos/SampleVideo.mp4";
//   fs.stat(path, (err, stats) => {
//     if (err) {
//       console.error("An error Occured.");
//       res.sendStatus(500);
//       return;
//     }

//     res.writeHead(200, {
//       "content-length": stats.size,
//       "Content-Type": "video/mp4",
//     });

//     fs.createReadStream(path).pipe(res);
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});

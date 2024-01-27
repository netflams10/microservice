const express = require("express");
// const fs = require("fs");
const http = require("http");
const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 8080;
const db_url = process.env.DATABASE_URL;
const db_name = process.env.DATABASE_NAME;

// if (!process.env.PORT) {
if (!port) {
  throw new Error("Please Specify a port number.");
}

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

const client = new MongoClient(db_url);

async function main() {
  // Use connect method to connect to the server

  const db = client.db(db_name);
  // console.log("Console Success:", db);
  const videos_collection = db.collection("videos");

  // the following code examples can be pasted here...
  await client.connect();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/video", (req, res) => {
    // 65b51689e887168f59ba4f96
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

  app.get("/local-video", async (req, res) => {
    // const path = "./videos/SampleVideo.mp4"; 65b51a969f2c1dc05b9340d4
    const video_id = req.query.id;
    console.log("Req ID:", video_id);

    const video_path = await videos_collection.findOne({ _id: video_id });
    if (video_path) {
      console.log("Video Path Data:", video_path);
    }
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

  app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
  });
}

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/video", (req, res) => {
//   const path = "./videos/SampleVideo.mp4";
//   const forward_request = http.request(
//     {
//       host: VIDEO_STORAGE_HOST,
//       port: VIDEO_STORAGE_PORT,
//       path: "/video?path=https://asset.cloudinary.com/djkoxdlrp/b2f2490ca585576b924b462cfa3180de",
//       method: "GET",
//       headers: req.headers,
//     },
//     (forwardResponse) => {
//       res.writeHeader(
//         forwardResponse.statusCode,
//         forwardResponse.headers,
//         forwardResponse.pipe(res)
//       );
//     }
//   );

//   req.pipe(forward_request);
// });

// app.get("/local-video", (req, res) => {
//   const path = "./videos/SampleVideo.mp4";
//   const forward_request = http.request(
//     {
//       host: VIDEO_STORAGE_HOST,
//       port: VIDEO_STORAGE_PORT,
//       path: `/get-video?path=${path}`,
//       method: "GET",
//       headers: req.headers,
//     },
//     (forwardResponse) => {
//       res.writeHeader(
//         forwardResponse.statusCode,
//         forwardResponse.headers,
//         forwardResponse.pipe(res)
//       );
//     }
//   );

//   req.pipe(forward_request);
// });

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

main()
  .then((e) => console.log("Connected: ", e.message))
  .catch((e) => console.error("Error Message", e.message))
  .finally(() => client.close());

// app.listen(port, () => {
//   console.log(`Example app listening http://localhost:${port}`);
// });

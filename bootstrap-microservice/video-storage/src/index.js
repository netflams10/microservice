const express = require("express");
const fs = require("fs");
const https = require("https");
const create_blob_service = require("../storage/azure");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/get-video", (req, res) => {
  const video_path = req.query.path;

  fs.stat(video_path, (err, stats) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.writeHead(200, {
      "content-length": stats.size,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(video_path).pipe(res);
  });
});

app.get("/video", (req, res) => {
  const video_path = req.query.path;
  const blob_service = create_blob_service();
  const container_name = "videos";

  blob_service.getBlobProperties(
    container_name,
    video_path,
    (err, properties) => {
      if (err) {
        // .. error handler
        res.sendStatus(500);
        return;
      }

      res.writeHead(200, {
        "Content-Length": properties.contentLength,
        "Content-Type": "video/mp4",
      });

      blob_service.getBlobToStream(container_name, video_path, res, (err) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Microservice has booted up. http://localhost:${PORT}`);
});

const express = require("express");
const azure = require("azure-storage");

const app = express();

const PORT = process.env.PORT;

const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

const create_blob_service = () => {
  return azure.createBlobService(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
};

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


## docker build -t video-streaming --file Dockerfile .

## Azure DevOps
-------------------------------------------------------------------
## docker login <your-registry-url> --username <your-username> --password <your-password>

## docker tag video-streaming bmdk1.azurecr.io/video-streaming:latest
## docker tag <image_name> <url_registry>/<name_and_version_of_image>

## Push Image
## docker push bmdk1.azurecr.io/video-streaming:latest
## docker push <image_registry_url>/<image_name:version>
-------------------------------------------------------------------
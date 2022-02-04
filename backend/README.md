# Introduction

This is the backend of the video calling application

# Building the Dockerfile

```
docker build -t video-calling-backend .

docker run -it -p 8000:80 video-calling-backend
```

# Running the nodejs app locally

To run the nodejs app locally, you can simply run `node app.js`. MAke sure to change the environment variable for `PORT` in the.env file
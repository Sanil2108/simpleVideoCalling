# Introduction

## Check out the currently running version - http://sanilk.xyz.videocalling.s3-website.ap-south-1.amazonaws.com/

## The app on the live link seems to work fine, but in case it crashes, here is a video demo of me using this app - https://vimeo.com/674173085

This is a simple application that uses websockets to establish a persistent connection between host and participants. Host creates the meeting and can then share the meeting link with participants. Whenever the host or a participant joins, they provide their name.

The server side code also ensures that the request is coming from the host when performing actions and not from the participants.

# Features

## Mute all functionality
The host can mute all participants. This can be done by clicking the group button on the host screen next to the mute button.

## Host can set a timer
The host can set timers for 15, 30 and 45 seconds. IDs are used to set these timers so the client cannot set timers for any arbitrary value.

## Host can end meeting for all participants
When the host ends the meeting, all the participants are also disconnected. There is an enchancement(tracked below) that when a participant leaves the meeting, another screen can be added that says, "Left the meeting" instead of the current static screen.

# How it works

## Architecture
The frontend is deployed on S3 with static website hosting. The backend runs in a docker container on an EC2 instance running Amazon Linux 2, and container orchestration is handled by Elastic Beanstalk. My justification for using docker compose, elastic beanstalk for a single container is
1. Docker compose allows us to define runtime arguments in standardized YAML file. Without this, we have to rely on custom scripts, random code in CI/CD pipelines, and duplication of runtime arguments.
2. It will be helpful when we decide to run other containers.
3. EB has a nice CLI, which makes it super simple to work with, is very easy to set up and get started, and provides a lot of awesome features like monitoring, a single dashboard, etc.

## CI/CD
Github actions works as the CI/CD pipelines. It automatically builds the backend docker images, deploys the backend, and also deploys the frontend. There are also no plaintext AWS keys anywhere in the code, all of them being stored in github actions secrets.

## Comments
I have added comments everywhere I think they would have been helpful, as a developer, I understand the pain of reading other people's code :P.

## Stack
### Frontend
The tech stack used for frontend is
1. Typescript
2. React
3. MaterialUI

### Backend
1. NodeJS + Express
2. socket.io for websockets
3. Github actions for CI/CD
4. Docker compose for containerising the backend
4. AWS for hosting. Three AWS services are being used, ECR for hosting container images, Elastic Beanstalk for deploying the backend on EC2 instances and S3 for deploying the frontend

# Enhancements/Bugs
1. Unit tests for both frontend and backend
2. Improving frontend code quality
3. Adding a meeting ended screen. Right now, when a participant leaves the meeting, his/her screen becomes static. Another screen for "The meeting has ended" can be added here
4. Infrastructure as code can be added to version control the AWS infra
5. Better storage and use of AWS credentials. Right now, AWS credentials are stored as secrets in Github actions and are only utilised during the building and deploying stage. This is better than having them anywhere in the code in plaintext, however credentials of my personal account are being used. A better approach might be role based authentication and authorization so auditing tools(such as CloudTrail) can log who is performing what action.
6. Missed the functionality for the host to be able to remove any participant from the video call. However this can be easily added by the host sending a request to the server with the participantID and the server removing the participant.
7. Could set up Route53 or some other DNS service to have a much nicer URL, such as videocalling.sanilk.xyz.
8. Different deployment modes. Right now, all the URLs are hardcoded. In production environment, I'd want have different environments, one for local, dev and main.
9. Could add favicon

FROM node:14

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g nodemon

CMD nodemon app.js

EXPOSE 80
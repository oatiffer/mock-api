FROM node:20.17.0-alpine3.20

LABEL Author="Omar Tiffer"

ENV PORT=3000
ENV DB_DATABASE=mockapi
ENV DB_URI=mongodb://mongodb

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN  npm install

COPY . .

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]


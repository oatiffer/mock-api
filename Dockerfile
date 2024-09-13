FROM node:20.17.0-alpine3.20

LABEL Author="Omar Tiffer"

ENV PORT="3000"

WORKDIR /usr/src/app

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]


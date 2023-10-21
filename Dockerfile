FROM node:current-alpine3.18

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build 

EXPOSE 3333

CMD [ "npm", "run", "start:prod" ]
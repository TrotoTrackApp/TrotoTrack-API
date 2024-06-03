FROM node:21.7.3-alpine3.18

RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
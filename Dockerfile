FROM node:20

RUN npm install -g nodemon
RUN npm install -g ts-node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

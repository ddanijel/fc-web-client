FROM node:13.10.1-alpine3.10

WORKDIR '/app'
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
CMD ["yarn", "start"]
FROM node:12

#ENV MOJINGO_METADATA_KEY_SECRET meta_secret
#ENV MOJINGO_COOKIE_SECRET cookie_secret

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn run build:prod

EXPOSE 8888

CMD ["yarn", "run", "server"]





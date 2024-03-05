FROM node:lts-alpine as build

RUN mkdir /app

WORKDIR /app

COPY package.json .
COPY next.config.js .
COPY .env.local .

RUN yarn install

COPY .next ./.next
COPY public ./.public
COPY . .
RUN yarn build

# ---------------

FROM node:lts-alpine

ENV NODE_ENV production
ENV API_PORT 3000

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/next.config.js .
COPY --from=build /app/.env.local .
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD yarn start

FROM --platform=linux/amd64 node:16-alpine3.16 as build
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install 
COPY . .
RUN yarn build

FROM --platform=linux/amd64 node:16-slim as run
COPY --from=build /app /app
ENV PORT=80 
ENV HOST=0.0.0.0
EXPOSE 80
CMD ["node", "./app/dist/server/entry.mjs"]




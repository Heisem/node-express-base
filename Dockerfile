FROM mhart/alpine-node:16.4.2 AS build

WORKDIR /srv
ARG NPM_TOKEN
ADD package.json .
ADD package-lock.json .
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
  npm ci --only=production && \
  rm -rf .npmrc
ADD ./src ./src
ADD ./config ./config

# At this point, we move to a lighter machine
# that only has the minimum required to run our server
FROM mhart/alpine-node:slim-16.4.2
WORKDIR /srv
COPY --from=build /srv .
EXPOSE 3000
CMD ["node", "./src/index.js"]

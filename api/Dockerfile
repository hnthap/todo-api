# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.8.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
# --omit=dev

COPY . .

RUN npm run build

RUN npm prune --omit=dev --production

ENV NODE_ENV=production

USER node

EXPOSE 8000

CMD ["npm", "start"]

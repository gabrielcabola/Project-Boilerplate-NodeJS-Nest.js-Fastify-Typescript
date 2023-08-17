FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY --chown=node:node . .
COPY --chown=node:node package*.json yarn*.lock tsconfig*.json ./

RUN yarn install --frozen-lockfile

# ---

FROM node:16-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/env.docker ./.env

EXPOSE 3001

RUN yarn migration:run

CMD ["yarn", "run", "start:prod", "-H", "0.0.0.0"]

FROM node:lts as dependencies
WORKDIR /dstream
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /dstream
COPY . .
COPY --from=dependencies /dstream/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /dstream
ENV NODE_ENV production
COPY --from=builder /dstream/next.config.js ./
COPY --from=builder /dstream/public ./public
COPY --from=builder /dstream/.next ./.next
COPY --from=builder /dstream/node_modules ./node_modules
COPY --from=builder /dstream/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
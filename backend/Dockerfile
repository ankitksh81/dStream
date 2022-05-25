FROM node
ENV NPM_CONFIG_LOGLEVEL info
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]

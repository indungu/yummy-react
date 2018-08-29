FROM node:carbon

RUN mkdir /usr/src/app

# Add applcation source
COPY . /usr/src/app

# Install and cache dependendcies
WORKDIR /usr/src/app
RUN yarn install

# Serve the application
EXPOSE 3000

CMD [ "yarn", "run", "start" ]
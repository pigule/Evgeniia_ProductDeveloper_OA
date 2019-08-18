FROM node:lts-alpine as build-stage

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

RUN npm install -g http-server

COPY . .

# building code for development,
#for production:
RUN npm run build

EXPOSE 8080
#CMD [ "http-server", "-p 8080", "-a 0.0.0.0", "dist" ]
CMD ["npm", "run", "dev"]

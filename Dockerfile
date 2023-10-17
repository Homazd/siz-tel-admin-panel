# Use an official Node.js runtime as the base image
FROM node:lts-alpine as build-step

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Set the working directory in the container

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire project to the working directory
COPY . .
# Build the project
RUN npm install

RUN npm run build

# Build step #2: build an Caddy container
FROM caddy:alpine

# Expose the port your application will listen on
EXPOSE 5173

# Define the command to run your application
# CMD ["npm", "run", "start"]
COPY --from=build-step /app/dist /usr/share/caddy

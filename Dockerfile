# Use a specific Node.js base image with Debian Bullseye
# This image includes Node.js v22.11.0 and is based on the Debian Bullseye Linux distribution.
# It provides a stable and predictable environment for running JavaScript applications.
FROM node:22.11.0-bullseye

# Set the working directory inside the container
# This defines the root directory where all subsequent commands will operate.
# Files copied into the container will be placed in this directory.
WORKDIR /jcakes

# Copy `src` folder into the container
# The `src` folder typically contains the source code of your application.
# By copying it early, you can improve Docker layer caching efficiency if the source code rarely changes.
COPY src/ /jcakes/src

# Copy `package.json` and `package-lock.json` files
# These files define the dependencies and their exact versions for your project.
# Copying them before running `npm install` ensures only these files will trigger a rebuild of dependencies if they change.
COPY package.json /jcakes/
COPY package*.json ./

# Install project dependencies
# This installs all the dependencies listed in `package.json`.
# It's run as a separate layer so Docker can cache the installed dependencies if no changes are detected in `package.json` files.
RUN npm install

# Copy the rest of the application source code into the container
# This copies any remaining files, such as configuration files, assets, or other code.
# It must be done after `npm install` to ensure dependencies are installed before additional app code.
COPY . .

# Expose the Metro bundler's default port
# Metro is the JavaScript bundler used by React Native. It runs on port 8081 by default.
# This ensures the port is accessible outside the container for communication with the app.
EXPOSE 8081

# Set the default command to start the Metro bundler
# This command starts the React Native development server when the container runs.
# `npm start` is a shorthand for the script defined in `package.json` under the "start" key.
CMD ["npm", "start"]


FROM node:22.11.0-bullseye AS builder
ENV NODE_ENV production
WORKDIR /jcakes
COPY src/ /jcakes/src
COPY package.json /jcakes/
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm build


FROM nginx:1.21.0-
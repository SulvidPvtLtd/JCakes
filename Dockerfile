# Use Node.js base image
FROM node:22.11.0-bullseye

# Set working directory
WORKDIR /jcakes

# Copy package.json and package-lock.json
# COPY public/ /jcakes/public
COPY src/ /jcakes/src
COPY package.json /jcakes/
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Expose the Metro bundler port
EXPOSE 8081

# Default command to start Metro bundler
CMD ["npm", "start"]

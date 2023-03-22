# Use the official Node.js 14 image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Install dependencies
# RUN apt-get update && apt-get install -y git yarn
# RUN npm install -g yarn
# RUN yarn init -y
RUN yarn add webpack webpack-cli svelte webpack-dev-server express html-webpack-plugin clean-webpack-plugin
RUN yarn add svelte-loader css-loader style-loader

RUN yarn install

# Install the dependencies
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Set the command to run the node server
CMD ["node", "app.js"]

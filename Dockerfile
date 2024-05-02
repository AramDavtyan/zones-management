# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production


# Run the application when the container launches
CMD ["npm", "run", "start:prod"]